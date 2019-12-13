// // tslint:disable:max-line-length
// import { axiosInstance } from '../utils/axiosInstance';

// /**
//  * Paramètres entrants :
//  * ```txt
// - chLogin*		: Identifiant utilisé pour la connexion. Information fournie par la société Alteva.
// - chPassword*	: Mot de passe associé à l'indentifiant. Information fournie par la société Alteva.
// ```
//   \* Paramètres obligatoires
//  * @interface IAuthentification
//  */
// export interface IAuthentification {
//   chLogin: string;
//   chPassword: string;
// }

// /**
//  * ```txt
// - chNumSession : Token à durée de vie limitée qui devra être renvoyé à l'appel de chaque autre fonction.
// ```
//  * @interface IAuthentificationRes
//  */
// export interface IAuthentificationRes {
//   chNumSession: string;
//   chValidite: string;
// }

// /**
//  * Authentification : Ouverture d'une session pour l'utilisation des webservices.
//  *
//  * Point d'entrée : https://www.api.alteva.eu:444/APIAlteva/Authentification
//  * Méthode : POST
//  *
//  * Paramètres entrants :
//  * ```txt
// - chLogin*		: Identifiant utilisé pour la connexion. Information fournie par la société Alteva.
// - chPassword*	: Mot de passe associé à l'indentifiant. Information fournie par la société Alteva.
// ```
//   \* Paramètres obligatoires
//  *
//  * Paramètres sortants :
//  * ```txt
// - chNumSession : Token à durée de vie limitée qui devra être renvoyé à l'appel de chaque autre fonction.
// ```
// */
// export function Authentification(obj: IAuthentification):
//   Promise<IAuthentificationRes> {
//   return axiosInstance.post('APIAlteva/Authentification', obj)
//     .then((res) => { return res.data; });
// }
