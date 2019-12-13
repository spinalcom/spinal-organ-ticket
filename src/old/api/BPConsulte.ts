// // tslint:disable:max-line-length
// import { axiosInstance } from '../utils/axiosInstance';

// /**
//  * Paramètres entrants :
// ```txt
// - chNumSession*			: Identifiant de la session en cours. Doit au préalable être récupéré via la méthode Authentification.
// - taNumBP				: Tableau de chaines contenant le numéro d'un bon préventif Mission. Si spécifié, les autres paramètres de tri seront ignorés.
// - chLastUpdate			: DateHeure au format AAAAMMJJHHMM de dernière modification des bons.
// - chAnneeSemaine		: Année et numéro de semaine prévues des bons à retourner au format AAAASS.
// *	Paramètres obligatoires
// **	Des restrictions sont appliquées sur cet élément.
// ```
//  *
//  * @interface IBPConsulte
//  */
// export interface IBPConsulte {
//   chNumSession: string;
//   taNumBP: string[];
//   chLastUpdate: string;
//   chAnneeSemaine: string;
// }
// /**
//  * Paramètres sortants :
// ```txt
// - BPs			: Structure retournée pour chaque BP répondant aux critères paramétrés.
//   - enNumBP				: Numéro Mission de du bon préventif.
//   - chFrequence			: Fréquence du bon préventif. Peut prendre les valeurs H (Hebdomaire), Q (Quinzaine), M (Mensuelle), S (Semestrielle), T (Trimestrielle), B (Bimestrielle), A (Annuelle), C (Conditionnelle).
//   - chIdMat				: ID du matériel lié au bon.
//   - chLibelleMateriel		: Libellé du matériel lié au bon.
//   - chGamme				: Nom de la gamme opératoire associée au bon.
//   - Actions				: Structure retournée pour chaque action à réaliser pour le bon.
//     - enBPAction			: ID unique de l'action du BP.
//     - enIDAction			: ID unique de l'action de la gamme.
//     - chLibAction			: Description de l'action à réaliser.
//     - chFrequence			: Fréquence de l'action du bon. Peut prendre les valeurs H (Hebdomaire), Q (Quinzaine), M (Mensuelle), S (Semestrielle), T (Trimestrielle), B (Bimestrielle), A (Annuelle), C (Conditionnelle).
//   - chPlanning			: Nom du planning associé au bon.
//   - Local					: Détails du local du bon.
//     - chLibelle				: Libellé de l'élément.
//     - enCleUnique			: Identifiant unique de l'élément.
//   - CentreTechnique		: Détails du centre technique du bon.
//     - chLibelle				: Libellé de l'élément.
//     - enCleUnique			: Identifiant unique de l'élément.
//   - CentreFinancier		: Détails du centre financier du bon.
//     - chLibelle				: Libellé de l'élément.
//     - enCleUnique			: Identifiant unique de l'élément.
//   - ArboLibre				: Détails de l'arborescence libre du bon.
//     - chLibelle				: Libellé de l'élément.
//     - enCleUnique			: Identifiant unique de l'élément.
//   - Domaine				: Détails du domaine du bon.
//     - chLibelle				: Libellé de l'élément.
//     - enCleUnique			: Identifiant unique de l'élément.
//   - chEtat				: État actuel du bon.
//   - chAnneeSemaine		: Année et numéro de semaine prévues des bons à retourner au format AAAASS.
//   - chDateHeureEdition	: Date et heure de l'édition du bon (au format JJ/MM/AAAA HH:MM).
//   - Intervenants			: Structure retournée pour chaque intervenant planifié sur le bon.
//     - chInterv				: Nom et prénom de l'intervenant planifié.
//     - enTempsMin			: Nombre de minutes prévues pour l'intervention.
//     - chDatePlanif			: Date de début de la planification (au format JJ/MM/AAAA).
//     - chHeurePlanif			: Heure de début de la planification (au format HH:MM).
//     - enIDPlanif			: Identifiant de la planification, à réutiliser pour modifier ou supprimer celle-ci.
// - chErreursUnitaires : Descriptif des erreurs unitaires, si par exemple certains des bons souhaitées sont en erreur.
// ```
//  *
//  * @interface IBPConsulteRes
//  */
// export interface IBPConsulteRes {
//   BPs: any[];
//   chErreursUnitaires: any;
// }

// /**
//  *
//  * BPConsulte : Consulte une liste de bons préventifs.
//  *
//  * Point d'entrée : https://www.api.alteva.eu:444/APIAlteva/BPConsulte
//  * Méthode : POST
//  *
//  * Paramètres entrants :
// ```txt
// - chNumSession*			: Identifiant de la session en cours. Doit au préalable être récupéré via la méthode Authentification.
// - taNumBP				: Tableau de chaines contenant le numéro d'un bon préventif Mission. Si spécifié, les autres paramètres de tri seront ignorés.
// - chLastUpdate			: DateHeure au format AAAAMMJJHHMM de dernière modification des bons.
// - chAnneeSemaine		: Année et numéro de semaine prévues des bons à retourner au format AAAASS.
// *	Paramètres obligatoires
// **	Des restrictions sont appliquées sur cet élément.
// ```
//  * Paramètres sortants :
// ```txt
// - BPs			: Structure retournée pour chaque BP répondant aux critères paramétrés.
//   - enNumBP				: Numéro Mission de du bon préventif.
//   - chFrequence			: Fréquence du bon préventif. Peut prendre les valeurs H (Hebdomaire), Q (Quinzaine), M (Mensuelle), S (Semestrielle), T (Trimestrielle), B (Bimestrielle), A (Annuelle), C (Conditionnelle).
//   - chIdMat				: ID du matériel lié au bon.
//   - chLibelleMateriel		: Libellé du matériel lié au bon.
//   - chGamme				: Nom de la gamme opératoire associée au bon.
//   - Actions				: Structure retournée pour chaque action à réaliser pour le bon.
//     - enBPAction			: ID unique de l'action du BP.
//     - enIDAction			: ID unique de l'action de la gamme.
//     - chLibAction			: Description de l'action à réaliser.
//     - chFrequence			: Fréquence de l'action du bon. Peut prendre les valeurs H (Hebdomaire), Q (Quinzaine), M (Mensuelle), S (Semestrielle), T (Trimestrielle), B (Bimestrielle), A (Annuelle), C (Conditionnelle).
//   - chPlanning			: Nom du planning associé au bon.
//   - Local					: Détails du local du bon.
//     - chLibelle				: Libellé de l'élément.
//     - enCleUnique			: Identifiant unique de l'élément.
//   - CentreTechnique		: Détails du centre technique du bon.
//     - chLibelle				: Libellé de l'élément.
//     - enCleUnique			: Identifiant unique de l'élément.
//   - CentreFinancier		: Détails du centre financier du bon.
//     - chLibelle				: Libellé de l'élément.
//     - enCleUnique			: Identifiant unique de l'élément.
//   - ArboLibre				: Détails de l'arborescence libre du bon.
//     - chLibelle				: Libellé de l'élément.
//     - enCleUnique			: Identifiant unique de l'élément.
//   - Domaine				: Détails du domaine du bon.
//     - chLibelle				: Libellé de l'élément.
//     - enCleUnique			: Identifiant unique de l'élément.
//   - chEtat				: État actuel du bon.
//   - chAnneeSemaine		: Année et numéro de semaine prévues des bons à retourner au format AAAASS.
//   - chDateHeureEdition	: Date et heure de l'édition du bon (au format JJ/MM/AAAA HH:MM).
//   - Intervenants			: Structure retournée pour chaque intervenant planifié sur le bon.
//     - chInterv				: Nom et prénom de l'intervenant planifié.
//     - enTempsMin			: Nombre de minutes prévues pour l'intervention.
//     - chDatePlanif			: Date de début de la planification (au format JJ/MM/AAAA).
//     - chHeurePlanif			: Heure de début de la planification (au format HH:MM).
//     - enIDPlanif			: Identifiant de la planification, à réutiliser pour modifier ou supprimer celle-ci.
// - chErreursUnitaires : Descriptif des erreurs unitaires, si par exemple certains des bons souhaitées sont en erreur.
// ```
//  *
//  * @param {IBPConsulte} obj
//  * @returns {IBPConsulteRes}
//  */
// export function BPConsulte(obj: IBPConsulte): Promise<IBPConsulteRes> {
//   return axiosInstance.post('APIAlteva/BPConsulte', obj)
//     .then(res => res.data);
// }
