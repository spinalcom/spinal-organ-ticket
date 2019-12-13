// // tslint:disable:max-line-length
// // DIConsulte : Consulte une liste de demande d'interventions.

// // Point d'entrée : https://www.api.alteva.eu:444/APIAlteva/DIConsulte
// // Méthode : POST

// import { axiosInstance } from '../utils/axiosInstance';

// /**
//  * ```txt
// - Demandes			: Structure retournée pour chaque DI répondant aux critères paramétrés.
// 	- enNumDI				: Numéro Mission de la demande d'intervention.
// 	- chRefInt				: Référence interne de la demande d'intervention.
// 	- chRefInt2				: Seconde référence interne de la demande d'intervention.
// 	- chObjet				: Objet de la demande d'intervention.
// 	- chAppelant			: Nom et prénom de l'appelant lié à la demande d'intervention.
// 	- chTelAppelant			: Numéro de téléphone de l'appelant.
// 	- chGSMAppelant			: Numéro de téléphone mobile de l'appelant.
// 	- chMailAppelant		: Adresse e-mail de l'appelant.
// 	- chDetailDI			: Détails de la demande d'intervention.
// 	- chSourceDI			: Source de la demande d'intervention.
// 	- chIdMat				: ID du matériel lié à la demande d'intervention.
// 	- chLibelleMateriel		: Libellé du matériel lié à la demande d'intervention.
// 	- Local					: Détails du local de la demande d'intervention.
// 		- chLibelle				: Libellé de l'élément.
// 		- enCleUnique			: Identifiant unique de l'élément.
// 	- CentreTechnique		: Détails du centre technique de la demande d'intervention.
// 		- chLibelle				: Libellé de l'élément.
// 		- enCleUnique			: Identifiant unique de l'élément.
// 	- CentreFinancier		: Détails du centre financier de la demande d'intervention.
// 		- chLibelle				: Libellé de l'élément.
// 		- enCleUnique			: Identifiant unique de l'élément.
// 	- ArboLibre				: Détails de l'arborescence libre de la demande d'intervention.
// 		- chLibelle				: Libellé de l'élément.
// 		- enCleUnique			: Identifiant unique de l'élément.
// 	- Domaine				: Détails du domaine de la demande d'intervention.
// 		- chLibelle				: Libellé de l'élément.
// 		- enCleUnique			: Identifiant unique de l'élément.
// 	- chCategorie			: Code de la catégorie liée à la demande.
// 	- chGroupeDemande		: Nom du groupe de demandes lié à la demande.
// 	- chEtat				: État actuel de la demande.
// 	- chDateHeureDemande	: Date et heure de la demande (au format JJ/MM/AAAA HH:MM).
// 	- chDateHeureEnr		: Date et heure d'enregistrement de la demande (au format JJ/MM/AAAA HH:MM).
// 	- chDateHeurePrevue		: Date et heure prévue de la demande (au format JJ/MM/AAAA HH:MM).
// 	- chDateHeureREP		: Date et heure de remise en service provisoire de la demande (au format JJ/MM/AAAA HH:MM).
// 	- chDateHeureRED		: Date et heure de remise en service définitive de la demande (au format JJ/MM/AAAA HH:MM).
// 	- Historiques			: Structure retournée pour chaque ligne d'historique.
// 		- chEtat				: État de la demande.
// 		- chDateEtat			: Date et heure de l'état spécifié dans chEtat (au format JJ/MM/AAAA HH:MM).
// 		- chAction				: Action ayant été réalisée sur cette ligne.
// 		- chDateAction			: Date et heure de l'action spécifiée dans chAction (au format JJ/MM/AAAA HH:MM).
// 		- chRemarqueAction		: Commentaire associé à l'action spécifiée dans chAction.
// 	- Intervenants			: Structure retournée pour chaque intervenant planifié sur la demande.
// 		- chInterv				: Nom et prénom de l'intervenant planifié.
// 		- enTempsMin			: Nombre de minutes prévues pour l'intervention.
// 		- chDatePlanif			: Date de début de la planification (au format JJ/MM/AAAA).
// 		- chHeurePlanif			: Heure de début de la planification (au format HH:MM).
// 		- enIDPlanif			: Identifiant de la planification, à réutiliser pour modifier ou supprimer celle-ci.
// 	- chVolumeHeures		: Nombre d'heures de travail réalisées sur tous les comptes-rendus par les intervenants (au format HH:MM).
// 	- enPriorite			: Priorité de la demande. Prend les valeurs 1 (Urgent), 2 (Normal), ou 3 (Occasionnel).
// - chErreursUnitaires : Descriptif des erreurs unitaires, si par exemple certaines des demandes souhaitées sont en erreur.
// ```
//  * @export
//  * @interface IDemandeInterventions
//  */
// export interface IDemandeInterventions {
//   Demandes: IDemandesItem[];
//   chErreursUnitaires: string;
// }
// interface IDemandesItem {
//   enNumDI: number;
//   chRefInt: string;
//   chRefInt2: string;
//   chObjet: string;
//   chAppelant: string;
//   chTelAppelant: string;
//   chGSMAppelant: string;
//   chMailAppelant: string;
//   chDetailDI: string;
//   chSourceDI: string;
//   chIdMat: string;
//   chLibelleMateriel: string;
//   Local: ILocal;
//   CentreTechnique: ICentreTechnique;
//   CentreFinancier: ICentreFinancier;
//   ArboLibre: IArboLibre;
//   Domaine: IDomaine;
//   chCategorie: string;
//   chGroupeDemande: string;
//   chEtat: string;
//   chDateHeureDemande: string;
//   chDateHeureEnr: string;
//   chDateHeurePrevue: string;
//   chDateHeureREP: string;
//   chDateHeureRED: string;
//   Historiques: IHistoriquesItem[];
//   Intervenants: IIntervenantsItem[];
//   chVolumeHeures: string;
//   enPriorite: number;
// }
// interface ILocal {
//   chLibelle: string;
//   enCleUnique: number;
// }
// interface ICentreTechnique {
//   chLibelle: string;
//   enCleUnique: number;
// }
// interface ICentreFinancier {
//   chLibelle: string;
//   enCleUnique: number;
// }
// interface IArboLibre {
//   chLibelle: string;
//   enCleUnique: number;
// }
// interface IDomaine {
//   chLibelle: string;
//   enCleUnique: number;
// }
// interface IHistoriquesItem {
//   chEtat: string;
//   chDateEtat: string;
//   chAction: string;
//   chDateAction: string;
//   chRemarqueAction: string;
// }
// interface IIntervenantsItem {
//   chInterv: string;
//   chDatePlanif: string;
//   chHeurePlanif: string;
//   enTempsMin: number;
//   enIDPlanif: number;
// }

// /**
//  * ```txt
// - chNumSession*			: Identifiant de la session en cours. Doit au préalable être récupéré via la méthode Authentification.
// - taNumDI				: Tableau de chaines contenant le numéro ou la référence interne d'une demande Mission. Si spécifié, les autres paramètres de tri seront ignorés.
// - chLastUpdate			: DateHeure au format AAAAMMJJHHMM de dernière modification des demandes.
// - enSourceDI			: Permet de cibler seulement les demandes saisie depuis une certaine source. 0 : Toutes les sources, 2 : Saisie via Mission, 3 Reçue par e-mail, 4 : Reçue via Internet, 5 : Reçue par téléphone, 6 : Reçue par PocketPC, 7 : Reçue par Webservice, 8 : Import logiciel tiers, 10 : Reçue via Mission One
// ```
//  * @export
//  * @interface IObjDIConsulte
//  */
// export interface IObjDIConsulte {
//   chNumSession: string;
//   taNumDI?: any[];
//   chLastUpdate?: string;
//   enSourceDI?: number;
// }
// export enum SourceDIFilter {
//   'Toutes les sources',
//   'Saisie via Mission',
//   'Reçue par e-mail',
//   'Reçue via Internet',
//   'Reçue par téléphone',
//   'Reçue par PocketPC',
//   'Reçue par Webservice',
//   'Import logiciel tiers',
//   'Reçue via Mission One',
// }

// /**
//  * DIConsulte : Consulte une liste de demande d'interventions.
//  * Point d'entrée : https://www.api.alteva.eu:444/APIAlteva/DIConsulte
//  * Méthode : POST
//  * @export
//  * @param {IObjDIConsulte} obj
//  * @returns {Promise<IObjDIConsulteRes>}
//  */
// export default function DIConsulte(obj: IObjDIConsulte)
//   : Promise<IDemandeInterventions> {
//     console.log('DIConsulte', obj);
//     // return Promise.resolve(<any>{});
//   return axiosInstance.post('APIAlteva/DIConsulte', obj)
//     .then(res => res.data);
// }

// export { DIConsulte };
