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

import {
  ROOM_CONTEXT_NAME,
  ROOM_CONTEXT_RELATIONS,
  ROOM_BIMOBJECT_RELATION,
  DOC_ATTR_CATEGORY,
  DOC_CATEGORY_RELATION,
  DOC_ATTR_GMAO_BIM_OBJECT_LABEL,
} from '../constant';
import { SpinalGraphService } from 'spinal-env-viewer-graph-service';

class ProcessBimObj {
  graph;
  contextRoom;
  mapBimObj;
  initProm;

  constructor() {
  }
  init(graph) {
    this.graph = graph;
    this.contextRoom = SpinalGraphService.getContext(ROOM_CONTEXT_NAME);
  }

  private searchBimObj(id: string): Promise<any> {
    return SpinalGraphService.findNode(id, true);
  }

  private getAttributes(bimObjNodeRef: any, category: string): Promise<any> {
    return SpinalGraphService
      .getChildren(bimObjNodeRef.id.get(), [DOC_CATEGORY_RELATION])
      .then((attributesCategory) => {
        for (let idx = 0; idx < attributesCategory.length; idx++) {
          if (attributesCategory[idx].getName.get() === category) {
            return attributesCategory[idx].getElement();
          }
        }
      });
  }

  async getGMAOAttributes(id: string) {
    const bimObjNodeRef = await this.searchBimObj(id);
    return this.getAttributes(bimObjNodeRef, DOC_ATTR_CATEGORY);
  }

}
