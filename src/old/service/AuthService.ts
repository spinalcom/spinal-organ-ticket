// /*
//  * Copyright 2018 SpinalCom - www.spinalcom.com
//  *
//  * This file is part of SpinalCore.
//  *
//  * Please read all of the following terms and conditions
//  * of the Free Software license Agreement ("Agreement")
//  * carefully.
//  *
//  * This Agreement is a legally binding contract between
//  * the Licensee (as defined below) and SpinalCom that
//  * sets forth the terms and conditions that govern your
//  * use of the Program. By installing and/or using the
//  * Program, you agree to abide by all the terms and
//  * conditions stated or referenced herein.
//  *
//  * If you do not agree to abide by these terms and
//  * conditions, do not demonstrate your acceptance and do
//  * not install or use the Program.
//  * You should have received a copy of the license along
//  * with this file. If not, see
//  * <http://resources.spinalcom.com/licenses.pdf>.
//  */
// const moment = require('moment');

// import {
//   IAuthentification,
//   IAuthentificationRes,
//   Authentification,
// } from '../api/Authentification';

// export default class AuthService {
//   login: string;
//   password: string;
//   lastAuth: IAuthentificationRes;
//   timeout: any;
//   authPromise: any;

//   constructor(login: string, password: string) {
//     this.setCredential(login, password);
//     this.lastAuth = null;
//     this.authPromise = null;
//     this.timeout = null;
//   }

//   setCredential(login: string, password: string) {
//     this.login = login;
//     this.password = password;
//   }

//   private isAuthTimedout() {
//     const now = moment();
//     if (this.timeout && now.isSameOrAfter(this.timeout)) {
//       return true;
//     }
//     return false;
//   }

//   auth(): Promise<string> {
//     if (this.authPromise === null || this.isAuthTimedout() === true) {
//       const sendObj: IAuthentification = { chLogin: this.login, chPassword: this.password };
//       this.authPromise = Authentification(sendObj).then((res: IAuthentificationRes) => {
//         this.timeout = moment(`${res.chValidite} +02:00`, 'DD/MM/YYYY HH:mm ZZ');
//         this.timeout.subtract(5, 'minute');
//         this.lastAuth = res;
//         return res.chNumSession;
//       }).catch(() => {
//         this.authPromise = null;
//         this.timeout = null;
//         this.lastAuth = null;
//         throw new Error('Authentification failed');
//       });
//     }
//     return this.authPromise;
//   }
// }
// export { AuthService };
