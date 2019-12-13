import { SpinalServiceTicket } from 'spinal-service-ticket';
import { SpinalGraphService, SPINAL_RELATION_PTR_LST_TYPE } from 'spinal-env-viewer-graph-service';
import config from '../config';
import { FileSystem } from 'spinal-core-connectorjs_type';
export const SPINAL_TICKET_SERVICE_TICKET_RELATION_NAME = 'SpinalSystemServiceTicketHasTicket';
export const SPINAL_TICKET_SERVICE_TICKET_RELATION_TYPE = SPINAL_RELATION_PTR_LST_TYPE;

interface ITicket {
  domaineNodeId: string;
  stepNodeId: any;
  ticketNodeId: string;
}

class TicketProcess {
  promInit: any = null;
  contextId: string;
  constructor() {
  }
  init() {
    if (this.promInit !== null) this.promInit;
    this.promInit = SpinalServiceTicket.getAllProcessAsync().then((res) => {
      this.contextId = SpinalServiceTicket.contextId;
      return res;
    });
    return this.promInit;
  }

  async getDomaine(domaineName: string) {
    await this.init();
    return SpinalServiceTicket.getProcessByName(domaineName);
  }
  getSteps(domaineId: string): Promise<any> {
    return SpinalGraphService.getChildrenInContext(domaineId, this.contextId);
  }
  getConfigStepFromName(key: string, name: string) {
    for (const state of config.ticketConfig.states) {
      if (state[key] === name) return state;
    }
  }

  searchStep(steps: any[], stateName: string): string {
    const configStep = this.getConfigStepFromName('api', stateName);

    for (const step of steps) {
      const configStep2 = this.getConfigStepFromName('label', step.name.get());
      if (configStep2.label === configStep.label) return step.id.get();
    }
  }
  getTickets(stepId: string): Promise<any> {
    return SpinalGraphService.getChildrenInContext(stepId, this.contextId);
    // const tickets = await node.getChildren(SPINAL_TICKET_SERVICE_TICKET_RELATION_TYPE,
    //                                        [SPINAL_TICKET_SERVICE_TICKET_RELATION_NAME]);
    //  return tickets.map((ticket) => {
    // (<any>SpinalGraphService)._addNode(ticket);
    // return SpinalGraphService.getInfo(ticket.getId());
    // });
  }

  async searchTicketInStep(ticketId: string, stepId: string): Promise<string> {
    const tickets = await this.getTickets(stepId);

    for (const ticket of tickets) {
      if (ticket && typeof ticket.GMAOTicketId !== 'undefined' &&
        ticket.GMAOTicketId.get() === ticketId) {
        return ticket.id.get();
      }
    }
    return undefined;
  }

  async searchTicketInDomaine(ticketId: string, domaineId: string): Promise<ITicket> {
    const steps = await this.getSteps(domaineId);

    for (const step of steps) {
      const ticketNodeId = await this.searchTicketInStep(ticketId, step.id.get());
      if (!!ticketNodeId) {
        return {
          ticketNodeId,
          domaineNodeId: domaineId,
          stepNodeId: step.id.get(),
        };
      }
    }
    return undefined;
  }

  async searchTicket(ticketId: string): Promise<ITicket> {
    const domaines = await this.init();

    for (const domaine of domaines) {
      const ticket = await this.searchTicketInDomaine(ticketId, domaine);
      if (!!ticket) {
        return ticket;
      }
    }
    return undefined;
  }

  async moveTicket(ticket: ITicket, domaineName: string, stepName: string) {
    const domaineId = await this.getDomaine(domaineName);
    const steps = await this.getSteps(domaineId);
    const stepToId = this.searchStep(steps, stepName);
    if (ticket.stepNodeId !== stepToId) {
      console.log('MOVE TICKET !');
      return SpinalServiceTicket.moveTicket(ticket.ticketNodeId, ticket.stepNodeId, stepToId);
    }
    console.log('NOT MOVED TICKET !');
  }
  async updateTicketDetails(ticket: ITicket, data: any) {
    const ticketNode = SpinalGraphService.getInfo(ticket.ticketNodeId);
    if (typeof ticketNode.element !== 'undefined') {
      const element = await ticketNode.element.load();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (element.hasOwnProperty(key)) {
            element[key].set(data[key]);
          } else {
            element[key].add_attr(key, data[key]);
          }
        }
      }
    }
  }

  async updateTicket(ticketId: string, domaineName: string, stepName: string, data: any) {
    const ticket = await this.searchTicket(ticketId);
    if (!!ticket) {
      console.log('FOUND TICKET');

      await this.moveTicket(ticket, domaineName, stepName);
      // update / set ticket
      this.updateTicketDetails(ticket, data);
    } else {
      console.log('NEW TICKET');
      const domaineId = await this.getDomaine(domaineName);
      const steps = await this.getSteps(domaineId);
      const stepToId = this.searchStep(steps, stepName);
      const ticketNodeId =
        SpinalServiceTicket.createTicket(data, { GMAOTicketId: data.GMAOTicketId });
      SpinalServiceTicket.addTicket(ticketNodeId, stepToId);
    }
  }
}

const ticketProcess = new TicketProcess;
export default ticketProcess;
export { TicketProcess };
export { ticketProcess };
