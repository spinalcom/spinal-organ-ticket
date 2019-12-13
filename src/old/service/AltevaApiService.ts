// /*
//  * Copyright 2018 SpinalCom - www.spinalcom.com
//  *
//  * This file is part of SpinalCore.
//  *
//  * Please read all of the following terms and conditions
//  * of the Free Software license Agreement ("Agreement")
//  * carefully.
//  *
//  * This Agreement is a legally binding contract between
//  * the Licensee (as defined below) and SpinalCom that
//  * sets forth the terms and conditions that govern your
//  * use of the Program. By installing and/or using the
//  * Program, you agree to abide by all the terms and
//  * conditions stated or referenced herein.
//  *
//  * If you do not agree to abide by these terms and
//  * conditions, do not demonstrate your acceptance and do
//  * not install or use the Program.
//  * You should have received a copy of the license along
//  * with this file. If not, see
//  * <http://resources.spinalcom.com/licenses.pdf>.
//  */
// import AuthService from './AuthService';
// import { DIConsulte, IObjDIConsulte, SourceDIFilter } from '../api/DIConsulte';
// import { DICree, IDICree } from '../api/DICree';
// import axiosInstance from '../utils/axiosInstance';

// import { config } from '../../config';
// import { dateToString } from '../utils/DateString';

// export default class AltevaApiService {
//   authInstance: AuthService;

//   constructor(login: string, password: string) {
//     this.authInstance = new AuthService(login, password);
//   }

//   getAuthInstance(): AuthService { return this.authInstance; }
//   static async postMethod(route: string, objToSend: any, authInstance?: AuthService) {
//     if (authInstance) {
//       const chNumSession = await authInstance.auth();
//       objToSend.chNumSession = chNumSession;
//     }
//     return axiosInstance.post(route, { data: objToSend });
//   }
//   async consultDI(diNum?: any[], chLastUpdate?: string, souce?: SourceDIFilter) {
//     const chNumSession = await this.authInstance.auth();
//     const obj: IObjDIConsulte = {
//       chNumSession,
//     };
//     if (diNum) obj.taNumDI = diNum;
//     if (chLastUpdate) obj.chLastUpdate = chLastUpdate;
//     if (souce) obj.enSourceDI = souce;
//     return DIConsulte(obj);
//   }

//   async createDI(
//     chDomaine: string,
//     chObjet: string,
//     chLocal: string,
//     chDateDemande: number,
//     chDetail: string,
//     enPriorite: number,
//     equipment?: string,
//     chLoginAppelant: string = config.organ.DEFAULT_APELANT,
//   ) {
//     // chNomAppelant
//     //   {
//     //     "domaine": "CHAUFFAGE_VENTILATION_CLIM",
//     //     "object": "BOITIERS DOMOTIQUE",
//     //     "local": "SpinalNode-f233141a-1313-b1cf-797f-8823513a97f3-16b9e904a48",
//     //     "timeStart": 1562074954984
//     //     "comment": "test send api",
//     //     "priority": 3,
//     //     "equipment": "",
//     //   }

//     const chNumSession = await this.authInstance.auth();
//     const obj: IDICree = {
//       chNumSession,
//       chDomaine,
//       chObjet,
//       chLocal,
//       chDetail,
//       enPriorite,
//       chLoginAppelant,
//       chDateDemande: dateToString(chDateDemande, 'YYYYMMDD'),
//     };
//     if (equipment !== undefined) {
//       obj.chIdMat = equipment;
//     }

//     return DICree(obj);
//   }

//   async consultBP(diNumArray?: any[], chLastUpdate?: string, souce?: SourceDIFilter) {
//     return { consultBP: 'consultBP test' };
//     // const chNumSession = await this.authInstance.auth();
//     // const obj: IObjDIConsulte = {
//     //   chNumSession,
//     // };
//     // if (diNumArray) obj.taNumDI = diNumArray;
//     // if (chLastUpdate) obj.chLastUpdate = chLastUpdate;
//     // if (souce) obj.enSourceDI = souce;
//     // return DIConsulte(obj);
//   }

// }
// export { AltevaApiService };
