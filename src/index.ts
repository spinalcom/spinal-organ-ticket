import config from './config';
import SpinalIO from './process/SpinalIO';
import OrganRequestTicket from './Model/OrganRequestTicket';
// import ProcessRegularPull from './process/ProcessRegularPull';
// import AltevaApiService from './alteva/service/AltevaApiService';
import ProcessRequestOnDemand from './process/ProcessRequestOnDemand';

import { SpinalGraphService, SpinalNodePointer } from 'spinal-env-viewer-graph-service';
import { SpinalServiceTicket } from 'spinal-service-ticket';
import { SERVICE_NAME as CONTEXT_TICKET_NAME } from 'spinal-service-ticket/dist/Constants';
import { ContextInitializer } from './process/ContextInitializer';
import { Model } from 'spinal-core-connectorjs_type';

class Main {
  spinalIO: SpinalIO;
  // altevaApiService: AltevaApiService;

  constructor() {
    this.spinalIO = new SpinalIO(config.spinalConnect);
    // this.altevaApiService = new AltevaApiService(config.organ.APILogin, config.organ.APIPassword);
  }

  async loadOrCreateOrganCfg(digitaltwinGraph): Promise<OrganRequestTicket> {
    console.log('Get config context Model');
    try {
      if (digitaltwinGraph.constructor.name === 'ForgeFileItem') {
        await SpinalGraphService.setGraphFromForgeFile(digitaltwinGraph);
      } else {
        await SpinalGraphService.setGraph(digitaltwinGraph);
      }
      await SpinalServiceTicket.init();
      const context = SpinalGraphService.getContext(CONTEXT_TICKET_NAME);
      const initializer = new ContextInitializer(context);
      await initializer.initialize();
      let organCfgModel: OrganRequestTicket = await context.getElement();
      if (!context._attribute_names.includes('element')) {
        // add element
        organCfgModel = <any>new Model();
        if (typeof organCfgModel.element !== 'undefined') delete organCfgModel.element;
        context.add_attr('element', new SpinalNodePointer(organCfgModel));
      }
      if (organCfgModel instanceof OrganRequestTicket === false) {
        console.log('Create new model context element config');
        const defaultInterval = 5 * 60 * 1000;
        const now = new Date();
        const lastWeek = now.setDate(now.getDate() - 7);
        organCfgModel = new OrganRequestTicket(lastWeek, defaultInterval,
                                               lastWeek, defaultInterval);
        context.element.setElement(organCfgModel);
      }
      return organCfgModel;
    } catch (e) {
      throw new Error('Error: can\'t get the context Config');
    }
  }

  async loadDigitalTwin(): Promise<any> {
    return this.spinalIO.load(config.organ.DigitalTwinPath);
  }

  async run() {
    try {
      const digitaltwinGraph = await this.loadDigitalTwin();
      const organCfgModel = await this.loadOrCreateOrganCfg(digitaltwinGraph);
      // console.log(organCfgModel.get());

      // const processRequestOnDemand =
      new ProcessRequestOnDemand(organCfgModel, digitaltwinGraph);
      // const regularPull =
      //   new ProcessRegularPull(organCfgModel, processRequestOnDemand, this.altevaApiService);
      // regularPull.run();
    } catch (e) {
      throw new Error('Error SpinalCore can\'t load or connect to spinalHub');
    }
  }
}

const main = new Main();
main.run();
