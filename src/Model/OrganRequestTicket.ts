import { spinalCore, Model } from 'spinal-core-connectorjs_type';
import { ticketEndStateLst } from '../config';
export enum requestCode {
  'consultDI',
  'createDI',
  'modifyDI',
  'consultBP',
  'createBP',
  'modifyBP',
}
const rcArr = [
  'consultDI',
  'createDI',
  'modifyDI',
  'consultBP',
  'createBP',
  'modifyBP',
];

export function requestCodeToString(rc: requestCode): string {
  return rcArr[rc];
}

export function makeRequestAndWaitResponse(model: OrganRequestTicket,
                                           requestCode: number,
                                           argRequest: any[])
  : Promise<spinal.Str> {
  const newRequest = new OrganRequestTicketRequest(requestCode, argRequest);
  model.queueRequest.push(newRequest);
  return new Promise((resolve) => {
    const modelBinded = newRequest.bind(() => {
      if (typeof newRequest.response !== 'undefined' && newRequest.response.get() !== '') {
        newRequest.unbind(modelBinded);
        resolve(newRequest.response);
      }
    },                                  false);
  });
}

export class OrganRequestTicketRequest extends Model {
  requestCode: spinal.Val;
  argRequest: spinal.Lst<any>;
  response: spinal.Str;

  constructor(requestCode?: number, argRequest?: any[]) {
    super();
    if (typeof requestCode === 'undefined') return;
    this.add_attr('requestCode', requestCode);
    this.add_attr('argRequest', argRequest);
    this.add_attr('response', '');
  }
}

export class OrganRequestTicket extends Model {
  lastUpdateDI: spinal.Val;
  intervalDI: spinal.Val;
  lastUpdateBP: spinal.Val;
  intervalBP: spinal.Val;
  statusEnd: spinal.Lst<spinal.Str>;

  queueRequest: spinal.Lst<OrganRequestTicketRequest>;
  constructor(lastUpdateDI?: number, intervalDI?: number,
              lastUpdateBP?: number, intervalBP?: number) {
    super();
    if (typeof lastUpdateDI === 'undefined') return;
    this.add_attr('lastUpdateDI', lastUpdateDI);
    this.add_attr('intervalDI', intervalDI);
    this.add_attr('lastUpdateBP', lastUpdateBP);
    this.add_attr('intervalBP', intervalBP);
    this.add_attr('queueRequest', []);
    this.add_attr('statusEnd', ticketEndStateLst);
  }
}
// 'ARE - Attente de réalisation',
// 'ENC - En cours de réalisation',
// ALE - Attente de lect.avant Exécution
// CLO - Clôturée
// ACC - Acceptée
// DEB - Débutée
// REP - Réalisation partielle

// En attente de Validation
// En attente de Confirmation
// En attente de réalisation
// En réalisation partielle
// Refusées
// Terminées

spinalCore.register_models(OrganRequestTicketRequest);
spinalCore.register_models(OrganRequestTicket);

export default OrganRequestTicket;
