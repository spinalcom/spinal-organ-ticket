import { SpinalContext, SpinalGraphService } from 'spinal-env-viewer-graph-service';
import { config } from '../config';
import { SpinalServiceTicket } from 'spinal-service-ticket';
import { OrganRequestTicket } from '../Model/OrganRequestTicket';

export class ContextInitializer {
  context: SpinalContext<OrganRequestTicket>;

  constructor(context: SpinalContext<OrganRequestTicket>) {
    this.context = context;
    SpinalServiceTicket;
  }

  async initialize() {
    const contextID = this.context.getId();
    const contextChildren = await SpinalGraphService.getChildrenInContext(contextID.get(), contextID.get());
    if (contextChildren.length === 0) {
      const domaines = config.ticketConfig.Domaine;
      for (const name in domaines) {
        if (domaines.hasOwnProperty(name)) {
          await this.addDomaine(name, domaines[name]);
        }
      }
    }
  }

  async addDomaine(domainName: string, objects: string[]) {
    const steps = config.ticketConfig.states;
    const processId: string = await SpinalServiceTicket.createProcess({ name: domainName });
    for (const step of steps) {
      await this.addStep(processId, step.label, step.color);
    }
    for (const sentence of objects) {
      await SpinalServiceTicket.addCategory(processId, sentence);
    }
  }

  async addStep(processId: string, stepName: string, stepColor: string) {
    // createStep(name: string, color: string): string
    const stepId = SpinalServiceTicket.createStep(stepName, stepColor);
    // addStep(stepId: string, processId: string)
    await SpinalServiceTicket.addStep(stepId, processId);
  }
}
