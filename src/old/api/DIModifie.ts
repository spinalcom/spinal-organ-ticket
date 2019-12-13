// // DIModifie : Permet d'enregistrer un commentaire ou des pièces jointes
// // supplémentaires sur une demande existante.
// // Il est également possible de joindre des pièces jointes et des signatures
// //
// // Point d'entrée : https://www.api.alteva.eu:444/APIAlteva/{{NumeroDI}/DIModifie
// // Le paramètre {NumeroDI}*-** peut être l'identifiant Mission
// // ou la référence interne d'une demande existante.
// //
// // Méthode : PUT
// //
// // Paramètres entrants :
// // 	- chNumSession*		: Identifiant de la session en cours.
// //                      Doit au préalable être récupéré via la méthode Authentification.
// // 	- chCommentaire		: Commentaire à ajouter à la suite du détail de la demande.
// // 	- chLoginIT**			: Login Mission de l'intervenant modifiant la demande. Si non spécifié,
// //                      l'intervenant lié au login appelant le webservice est utilisé.
// // 	- PiecesJointes		: Structure à dupliquer autant de fois qu'il y a de pièces jointes.
// // 			- chNomPJ*		  : Nom et extension de la PJ.
// // 			- chDataPJ*		  : Données du fichier joint.
// //                        Peuvent être encodées en binaire, ASCII, BASE64 ou UUEncode.
// // 			- chCommentaire : Commentaire associé à la PJ.
// //
// // *	Paramètres obligatoires
// // **	Des restrictions sont appliquées sur cet élément.
// //
// // Paramètres sortants :
// // 	- chErreursNonBloquantes : Descriptif des erreurs non bloquantes s'il en est survenu.
// //                             Ces erreurs n'empêchent pas la création du CR mais peuvent
// //                             par exemple indiquer qu'une PJ n'a pas pu être intégrée.

// import { IPiecesJointes } from '../utils/PiecesJointes';
// import { axiosInstance } from '../utils/axiosInstance';

// /**
//  * Paramètres entrants :
//  * ```txt
// - chNumSession*		: Identifiant de la session en cours.
//                     Doit au préalable être récupéré via la méthode Authentification.
// - chCommentaire		: Commentaire à ajouter à la suite du détail de la demande.
// - chLoginIT**			: Login Mission de l'intervenant modifiant la demande. Si non spécifié,
//                     l'intervenant lié au login appelant le webservice est utilisé.
// - PiecesJointes		: Structure à dupliquer autant de fois qu'il y a de pièces jointes.
//     - chNomPJ*		  : Nom et extension de la PJ.
//     - chDataPJ*		  : Données du fichier joint.
//                       Peuvent être encodées en binaire, ASCII, BASE64 ou UUEncode.
//     - chCommentaire : Commentaire associé à la PJ.

// *	Paramètres obligatoires
// **	Des restrictions sont appliquées sur cet élément.
// ```
//  * @export
//  * @interface IObjDIModifie
//  */
// export interface IObjDIModifie {
//   chNumSession: string;
//   chCommentaire?: string;
//   chLoginIT?: string;
//   PiecesJointes?: IPiecesJointes[];
// }

// /**
// * Paramètres sortants :
// * ```txt
// - chErreursNonBloquantes : Descriptif des erreurs non bloquantes s'il en est survenu.
//                            Ces erreurs n'empêchent pas la création du CR mais peuvent
//                            par exemple indiquer qu'une PJ n'a pas pu être intégrée.
// ```
//  *
//  * @export
//  * @interface IObjDIModifieRes
//  */
// export interface IObjDIModifieRes {
//   chErreursNonBloquantes: string[];
// }
// /**
//  * DIModifie : Permet d'enregistrer un commentaire
//  * ou des pièces jointes supplémentaires sur une demande existante.
//  * Il est également possible de joindre des pièces jointes et des signatures
//  *
//  * @export
//  * @param {string} numeroDI
//  * @param {IObjDIModifie} obj
//  * @returns
//  */
// export default function DIModifie(numeroDI: string, obj: IObjDIModifie)
//   : Promise<IObjDIModifieRes> {
//   return axiosInstance.post(`APIAlteva/${numeroDI}/DIModifie`, obj)
//     .then(res => res.data);
// }

// export { DIModifie };
