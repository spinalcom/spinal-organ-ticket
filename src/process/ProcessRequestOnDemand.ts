/*
 * Copyright 2018 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */
import { SpinalGraph, SpinalGraphService, SpinalContext } from 'spinal-env-viewer-graph-service';
// import { spatialContext } from './SpatialContext';
import {
  OrganRequestTicket,
  OrganRequestTicketRequest,
  requestCodeToString,
  requestCode,
} from '../Model/OrganRequestTicket';
// import AltevaApiService from '../alteva/service/AltevaApiService';
// import { dateToString } from '../alteva/utils/DateString';
import { ticketProcess } from './TicketProcess';
import config from '../config';

function hasProps(obj: any, propName: string) {
  return obj.hasOwnProperty(propName);
}

type requestFct = (...any: any) => Promise<void>;

export class ProcessRequestOnDemand {
  requestMap: Map<OrganRequestTicketRequest, Promise<any>>;
  organCfgModel: OrganRequestTicket;
  digitaltwinGraph: SpinalGraph<any>;
  // altevaApiService: AltevaApiService;
  mapRequestHandle: Map<requestCode, requestFct>;

  constructor(organCfgModel: OrganRequestTicket,
              digitaltwinGraph: SpinalGraph<any>,
    // altevaApiService: AltevaApiService
  ) {
    this.organCfgModel = organCfgModel;
    this.digitaltwinGraph = digitaltwinGraph;
    // this.altevaApiService = altevaApiService;
    this.mapRequestHandle = new Map();
    this.mapRequestHandle.set(requestCode['consultDI'], this.consultDI);
    this.mapRequestHandle.set(requestCode['createDI'], this.createDI);
    this.mapRequestHandle.set(requestCode['modifyDI'], this.modifyDI);
    this.mapRequestHandle.set(requestCode['consultBP'], this.consultBP);
    this.mapRequestHandle.set(requestCode['createBP'], this.createBP);
    this.mapRequestHandle.set(requestCode['modifyBP'], this.modifyBP);
    this.requestMap = new Map;
    // spatialContext.init().then(() => {
    organCfgModel.queueRequest.bind(() => {
      if (organCfgModel.queueRequest.has_been_directly_modified() === true) {
        this.onQueueChange();
      }
    });
    // });
  }
  onQueueChange() {
    const queueRequest = this.organCfgModel.queueRequest;
    for (let idx = 0; idx < queueRequest.length; idx = idx + 1) {
      const element = queueRequest[idx];
      if (this.requestMap.has(element) === false) {
        const promise = this.processRequest(element);
        this.requestMap.set(element, promise);
        promise.then(() => {
          this.requestMap.delete(element);
          queueRequest.remove_ref(element);
        });
      }
    }
  }

  async processRequest(element: OrganRequestTicketRequest): Promise<void> {
    const rc = element.requestCode.get();
    console.log(`processRequest start [${rc}] => ${requestCodeToString(rc)}`);
    const fct = this.mapRequestHandle.get(rc);
    try {
      await fct.call(this, element.argRequest);
      element.response.set('OK');
      console.log('processRequest OK');

    } catch (e) {
      console.error();
      element.response.set('KO');
      console.log('processRequest KO');
    } finally {
      console.log(`processRequest end [${rc}] => ${requestCodeToString(rc)}`);
    }
  }

  async consultDI(args: any) {
    console.log('start consultDI');
    //   let dimArray: any[];
    //   let chLastUpdate: string;
    //   if (!hasProps(args, 'diNum') || args.diNum.length === 0) dimArray = undefined;
    //   else dimArray = args.diNum.get();
    //   if (!args.chLastUpdate || args.chLastUpdate.length === 0) chLastUpdate = undefined;
    //   else chLastUpdate = args.chLastUpdate.get();
    //   if (!hasProps(args, 'diNum') && !hasProps(args, 'chLastUpdate')) {
    //     chLastUpdate = dateToString(this.organCfgModel.lastUpdateDI.get());
    //   }
    //   const argArry: any[] = [
    //     dimArray,
    //     chLastUpdate,
    //   ];
    //   if (hasProps(args, 'souce')) {
    //     argArry.push(args.source.get());
    //   }
    //   // const DI = await this.altevaApiService.consultDI.apply(this.altevaApiService, argArry);
    //   // return await this.updateDI(DI);
  }

  async createDI(args: any) {
    console.log('start createDI');
    const arg = args.get();
    console.log('arg', arg);

    const ticketData = {
      GMAOTicketId: arg.timeStart,
      name: arg.object, // obj
      equipement: arg.equipment, // search material
      appelant: arg.chLoginAppelant || config.organ.DEFAULT_APELANT,
      note: arg.comment, // chDetailDI
      historiques: [],
      local: arg.local,
      priority: arg.priority,
      info: { request: JSON.stringify(arg) },
    };
    await ticketProcess.updateTicket(
      ticketData.GMAOTicketId.toString(), arg.domaine,
      'ALE - Attente de lect.avant Exécution', ticketData);
  }
  async modifyDI(args: any) {
    console.log('start modifyDI');
  }
  async consultBP(args: any) {
    console.log('start consultBP');
  }
  async createBP(args: any) {
    console.log('start createBP');
  }
  async modifyBP(args: any) {
    console.log('start modifyBP');
  }

  // isSelectedBuilding(path: string) {
  //   return path.startsWith(config.ticketConfig.buildingFilterName);
  // }
  // async updateDemande(demande) {
  //   // const pathNodeId = await spatialContext.getPathIdFromPath(demande.Local.chLibelle);
  //   const ticketData = {
  //     GMAOTicketId: demande.enNumDI, // enNumDI
  //     name: demande.chObjet, // obj
  //     equipement: demande.chIdMat, // search material
  //     appelant: demande.chAppelant,
  //     note: demande.chDetailDI, // chDetailDI
  //     historiques: demande.Historiques,
  //     local: demande.local,
  //     info: { request: JSON.stringify(demande) },
  //   };
  //   const domaine = demande.Domaine.chLibelle;
  //   // const domaine = 'BATIMENT_SECOND ŒUVRE';
  //   return ticketProcess.updateTicket(
  //     demande.enNumDI, domaine,
  //     demande.chEtat, ticketData);
  // }

  // async updateDI(obj) {
  //   // update date in organCfgModel
  //   for (const demande of obj.Demandes) {
  //     if (this.isSelectedBuilding(demande.Local.chLibelle)) {
  //       console.log(demande);
  //       await this.updateDemande(demande);
  //     }
  //   }

  //   this.organCfgModel.lastUpdateDI.set(Date.now());
  //   // update date ticket

  // }
  async updateBP(obj) {
    console.log('updateBP', obj);
    // update date in organCfgModel
    this.organCfgModel.lastUpdateBP.set(Date.now());
    // update date ticket
  }
}

export default ProcessRequestOnDemand;
