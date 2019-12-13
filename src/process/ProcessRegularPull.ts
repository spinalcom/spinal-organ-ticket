// import {
//   OrganRequestAlteva,
// } from '../Model/OrganRequestTicket';
// import AltevaApiService from '../alteva/service/AltevaApiService';
// import { dateToString } from '../alteva/utils/DateString';
// import { ProcessRequestOnDemand } from './ProcessRequestOnDemand';

// export class ProcessRegularPull {
//   cfgModel: OrganRequestAlteva;
//   altevaApiService: AltevaApiService;
//   processRequestOnDemand: ProcessRequestOnDemand;
//   constructor(cfgModel: OrganRequestAlteva,
//               processRequestOnDemand: ProcessRequestOnDemand,
//               altevaApiService: AltevaApiService) {
//     this.cfgModel = cfgModel;
//     this.altevaApiService = altevaApiService;
//     this.processRequestOnDemand = processRequestOnDemand;
//   }

//   private waitFct(nb: number): Promise<void> {
//     return new Promise((resolve) => {
//       setTimeout(
//         () => {
//           resolve();
//         },
//         nb);
//     });
//   }

//   private async updateDI() {
//     while (true) {
//       const before = Date.now();
//       const lastDI = dateToString(this.cfgModel.lastUpdateDI.get());
//       const DI = await this.altevaApiService.consultDI(undefined, lastDI);
//       await this.processRequestOnDemand.updateDI(DI);
//       const delta = Date.now() - before;
//       const timeout = this.cfgModel.intervalDI.get() - delta;
//       await this.waitFct(timeout >= 0 ? timeout : 0);
//     }
//   }
//   private async updateBP() {
//     while (true) {
//       const before = Date.now();
//       const lastBP = dateToString(this.cfgModel.lastUpdateBP.get());
//       const BP = await this.altevaApiService.consultBP(undefined, lastBP);
//       await this.processRequestOnDemand.updateBP(BP);
//       const delta = Date.now() - before;
//       const timeout = this.cfgModel.intervalBP.get() - delta;
//       await this.waitFct(timeout >= 0 ? timeout : 0);
//     }
//   }

//   run() {
//     this.updateDI();
//     this.updateBP();
//   }
// }

// export default ProcessRegularPull;
