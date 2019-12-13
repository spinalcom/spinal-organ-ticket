// import {
//   SpinalGraph, SpinalContext,
//   SpinalGraphService, SpinalNode,
// } from 'spinal-env-viewer-graph-service';
// // import { geo } from '../geo';
// const BUILDING_REFERENCE_CONTEXT = '.BuildingContext';
// const FLOOR_REFERENCE_CONTEXT = '.FloorContext';
// const ROOM_REFERENCE_CONTEXT = '.RoomContext';

// // const CONTEXT_SPATIAL_NAME = 'Spatial';
// const CONTEXT_TYPE = 'geographicContext';
// const SITE_TYPE = 'geographicSite';
// const BUILDING_TYPE = 'geographicBuilding';
// const FLOOR_TYPE = 'geographicFloor';
// const ZONE_TYPE = 'geographicZone';
// export const ROOM_TYPE = 'geographicRoom';

// const SITE_RELATION = 'hasGeographicSite';
// const BUILDING_RELATION = 'hasGeographicBuilding';
// const FLOOR_RELATION = 'hasGeographicFloor';
// const ZONE_RELATION = 'hasGeographicZone';
// const ROOM_RELATION = 'hasGeographicRoom';

// const EQUIPMENT_TYPE = 'BIMObject';
// const EQUIPMENT_RELATION = 'hasBimObject';

// import { serviceDocumentation } from '../services/serviceDocumentation';
// const GEO_RELATIONS_NAMES = [
//   SITE_RELATION,
//   BUILDING_RELATION,
//   FLOOR_RELATION,
//   ZONE_RELATION,
//   ROOM_RELATION,
// ];
// const GEO_NODE_TYPE = [
//   CONTEXT_TYPE,
//   SITE_TYPE,
//   BUILDING_TYPE,
//   FLOOR_TYPE,
//   ZONE_TYPE,
//   ROOM_TYPE,
// ];
// export class SpatialContext {
//   spinalRoomContext: SpinalContext<any>;
//   spinalFloorContext: SpinalContext<any>;
//   graph: SpinalGraph<any>;
//   rooms: any[];
//   promiseInit: Promise<void>;
//   constructor() {
//     this.promiseInit = null;
//   }

//   init() {
//     if (this.promiseInit !== null) return this.promiseInit;
//     this.promiseInit = new Promise((resolve) => {
//       this.graph = SpinalGraphService.getGraph();
//       this.spinalRoomContext = SpinalGraphService.getContext(ROOM_REFERENCE_CONTEXT);
//       this.spinalFloorContext = SpinalGraphService.getContext(FLOOR_REFERENCE_CONTEXT);
//       // console.log(this.spinalContext);
//       if (this.spinalRoomContext === undefined) {
//         throw (new Error('context reference Room not found !!!'));
//       }
//       const contextRoomId = this.spinalRoomContext.getId().get();
//       return SpinalGraphService.getChildren(contextRoomId, []).then((rooms) => {
//         const contextRoomId = this.spinalRoomContext.getId().get();
//         this.rooms = rooms;
//         return SpinalGraphService.getChildren(contextRoomId, []).then((rooms) => {
//           this.rooms = rooms;

//           resolve();
//         });
//       });
//     });
//     return this.promiseInit;
//   }

//   getRoomById(roomId: string): SpinalNode<any> {
//     for (const room of this.rooms) {
//       if (room.id.get() === roomId) return room;
//     }
//     return undefined;
//   }

//   async getNodeParent(nodeId: string): Promise<any> {
//     const node = SpinalGraphService.getRealNode(nodeId);
//     let parents = await this.spinalNodeGetParent(node, GEO_RELATIONS_NAMES);
//     parents = parents.filter((elm) => {
//       return GEO_NODE_TYPE.includes(elm.info.type.get());
//     });
//     if (parents.length === 1) {
//       const parent = parents[0];
//       (<any>SpinalGraphService)._addNode(parent);
//       // const contextChildren = await
//       // return contextChildren
//       return parent;
//       //  SpinalGraphService.getChildren(parent.id, GEO_RELATIONS_NAMES);
//     }
//   }

//   static spinalNodeGetParentRelation(node: SpinalNode<any>, relationNames: string[]) {
//     const res = [];
//     for (const relTargetName of relationNames) {
//       if (node.parents.hasOwnProperty(relTargetName)) {
//         const relLst = node.parents[relTargetName];
//         for (const idx = 0; idx < relLst.length; idx + 1) {
//           const relNode = relLst[idx];
//           res.push(relNode.load());
//         }
//       }
//     }
//     return Promise.all(res);

//   }

//   async spinalNodeGetParent(node: SpinalNode<any>, relationNames: string[]) {
//     const relations = await SpatialContext.spinalNodeGetParentRelation(node, relationNames);
//     const res = relations.map((relation) => {
//       return relation.parent.load();
//     });

//     return Promise.all(res);
//   }

//   // extractName(node, obj, key) {
//   //   return serviceDocumentation.getAllAttributes(node).
//   //     then((attrs) => {
//   //       let name = '';
//   //       for (const attr of attrs) {
//   //         if (attr.label.get() === 'id') name = `${attr.value.get()}-${name}`;
//   //         if (attr.label.get() === 'name') name += attr.value.get();
//   //       }
//   //       obj[key] = name;
//   //     });
//   // }

//   extractPath(path: any[]) {
//     const res = {
//       company: 'SEML',
//       site: 'PHOTONIQUE',
//       batiment: 'GIENAH',
//       etage: '',
//       local: '',
//     };
//     // const promises = [];
//     for (const node of path) {
//       const type = node.getType().get();
//       switch (type) {
//         case SITE_TYPE:
//           res.site = node.getName().get();
//           break;
//         case BUILDING_TYPE:
//           res.batiment = node.getName().get();
//           break;
//         case FLOOR_TYPE:
//           res.etage = node.getName().get();
//           // promises.push(this.extractName(node, res, 'etage'));
//           break;
//         case ROOM_TYPE:
//           res.local = node.getName().get();
//           // promises.push(this.extractName(node, res, 'local'));
//           break;
//         default:
//           break;
//       }
//     }
//     // return Promise.all(promises).then(() => res);
//     return Promise.resolve(res);
//   }

//   async pathToGeo(path: any[]) {
//     const {
//       company,
//       site,
//       batiment,
//       etage,
//       local } = await this.extractPath(path);

//     return [
//       company,
//       site,
//       batiment,
//       etage,
//       local];
//   }

//   async getRoomPath(local: string) {
//     const room = this.getRoomById(local);
//     if (room !== undefined) {
//       let parent;
//       const n = SpinalGraphService.getRealNode(local);
//       let currentId = local;
//       const path = [n];
//       do {
//         parent = await this.getNodeParent(currentId);
//         currentId = parent.info.id.get();
//         if (parent instanceof SpinalContext) {
//           break;
//         }
//         path.unshift(parent);
//       } while (parent && !(parent instanceof SpinalContext));
//       return this.pathToGeo(path);
//     }
//   }

//   formatNumberLength(num: number | string, length: number) {
//     return `000${num}`.slice(-length);
//   }

//   async getEquipmentId(local: string, equipmentId: string): Promise<string> {
//     const room = this.getRoomById(local);
//     if (room !== undefined) {
//       const n = SpinalGraphService.getRealNode(local);
//       const bimRelationNames = [...GEO_RELATIONS_NAMES, EQUIPMENT_RELATION];
//       const resFind = await n.find(bimRelationNames, (obj) => {
//         if (obj.getType().get() === EQUIPMENT_TYPE && obj.getId().get() === equipmentId) {
//           return true;
//         }
//         return false;
//       });
//       for (const obj of resFind) {
//         (<any>SpinalGraphService)._addNode(obj);
//         const attrs = await serviceDocumentation.getAllAttributes(obj);
//         for (const attr of attrs) {
//           if (attr.label.get() === 'ID MATERIEL' || attr.label.get() === 'ID_MATERIEL') {
//             return this.formatNumberLength(<string>(attr.value.get()), 6);
//           }
//         }
//       }
//     }
//     return (undefined);
//   }

//   // async checkAttribute(nodeId: string, valueToCheck: string) {
//   //   const realNode = SpinalGraphService.getRealNode(nodeId);
//   //   const allAttr = await serviceDocumentation.getAllAttributes(realNode);
//   //   const key = 'name';
//   //   for (const { label, value } of allAttr) {
//   //     if (label.get() === key && value.get() === valueToCheck) return true;
//   //   }
//   //   return false;
//   // }

//   async checkAttributeRoom(nodeId: string, valueToCheck: string) {
//     const realNode = SpinalGraphService.getRealNode(nodeId);
//     return realNode.info.name.get() === valueToCheck;
//     // const allAttr = await serviceDocumentation.getAllAttributes(realNode);
//     // let id = '';
//     // let name = '';
//     // for (const { label, value } of allAttr) {
//     //   if (label.get() === 'id') {
//     //     id = value.get();
//     //   } else if (label.get() === 'name') {
//     //     name = value.get();
//     //   }
//     //   if (id && name && `${id}-${name}` === valueToCheck) return true;
//     // }
//     // return false;
//   }

//   async getBatiment(bat: string): Promise<string> {
//     const context = SpinalGraphService.getContext(BUILDING_REFERENCE_CONTEXT);
//     if (!context) return '';
//     const nodeId = context.getId().get();

//     const children = await SpinalGraphService.getChildren(nodeId, []);
//     for (const child of children) {
//       if (child.name.get() === bat) return child.id.get();
//       // const check = await this.checkAttribute(child.id.get(), bat);
//       // if (check) return child.id.get();
//     }
//     return '';
//   }
//   async getFloor(bat: string, floor: string): Promise<string> {
//     let nodeId = await this.getBatiment(bat);
//     if (!nodeId) {
//       const context = SpinalGraphService.getContext(FLOOR_REFERENCE_CONTEXT);
//       if (!context) return '';
//       nodeId = context.getId().get();
//     }

//     const children = await SpinalGraphService.getChildren(nodeId, []);
//     for (const child of children) {
//       if (child.name.get() === floor) return child.id.get();
//       // const check = await this.checkAttribute(child.id.get(), floor);
//       // if (check) {
//       //   return child.id.get();
//       // }
//     }
//     return '';
//   }
//   async getLocal(bat: string, floor: string, local: string): Promise<string> {
//     const floorId = await this.getFloor(bat, floor);
//     if (!floorId) return '';
//     const children = await SpinalGraphService.getChildren(floorId, []);
//     for (const child of children) {
//       if (child.name.get() === local) return child.id.get();
//       // const check = await this.checkAttributeRoom(child.id.get(), local);
//       // if (check) {
//       //   return child.id.get();
//       // }
//     }
//     return '';
//   }
//   async getPathIdFromPath(path: string): Promise<string> {
//     if (this.spinalFloorContext === undefined) {
//       throw (new Error('Context Spatial Floor Ref not found in graph !!!'));
//     }
//     const [, ,
//       batiment,
//       floor,
//       local,
//     ] = path.split('/');
//     if (!floor) {
//       return this.getBatiment(batiment);
//     }
//     if (!local) {
//       return this.getFloor(batiment, floor);
//     }
//     return this.getLocal(batiment, floor, local);

//   }
// }

// const spatialContext = new SpatialContext;

// export { spatialContext };
// export default spatialContext;
