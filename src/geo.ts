
// class GeoObj {
//   name: string;
//   children: GeoObj[] = [];
//   constructor(name: string, parent?: GeoObj) {
//     this.name = name;
//     if (parent) {
//       parent.addChild(this);
//     }
//   }
//   addChild(child: GeoObj) {
//     this.children.push(child);
//   }

//   getChild(name) {
//     for (const child of this.children) {
//       if (child.name === name) return child;
//     }
//   }
//   getAproxChildren(name) {
//     const reg = new RegExp(name, 'i');
//     for (const child of this.children) {
//       if (child.name === name) return child;
//     }
//   }
// }

// const roomsN0 = [
//   '01-HALL',
//   '02-ATELIER NORD',
//   '03-MENAGE',
//   '04-SANITAIRES H',
//   '05-VDI',
//   '06-LT ELEC',
//   '07-TGBT',
//   '08-SANITAIRES F',
//   '09-ATELIER SUD',
//   '10-STOCKAGE',
//   '11-DOUCHE',
//   '12-DOUCHE',
//   '30-ESCALIERS ouest',
//   '31-ESCALIERS est',
//   '40-ASCENSEUR',
// ];
// const roomsN1 = [
//   '01-COULOIR',
//   '02-SANITAIRES F',
//   '03-BUREAU 17',
//   '04-REUNION 3',
//   '05-BUREAU 19',
//   '06-BUREAU 20',
//   '07-REUNION 4',
//   '08-BUREAU 21',
//   '09-OPEN SPACE 18',
//   '10-LOCAL SERVEUR',
//   '11-LOCAL TECHNIQUE',
//   '12-DOUCHE',
//   '13-DOUCHE',
//   '14-LOCAL TECHNIQUE',
//   '15-BUREAU 23',
//   '16-BUREAU 22',
//   '17-OPEN SPACE 24',
//   '18-OPEN SPACE 25',
//   '19-REUNION 5',
//   '20-BUREAU 26',
//   '21-OPEN SPACE 27',
//   '22-BUREAU 28',
//   '23-REUNION 6',
//   '24-TISANERIE',
//   '25-OPEN SPACE 29',
//   '26-BUREAU 30',
//   '27-BUREAU 31',
//   '28-PATIO',
//   '29-SANITAIRES H',
//   '30-ESCALIERS ouest',
//   '31-ESCALIERS est',
//   '32-LOCAL TECHNIQUE',
//   '33-MENAGE',
//   '34-LOCAL TECHNIQUE',
//   '35-REUNION 1',
//   '36-OPEN SPACE 1',
//   '37-TISANERIE',
//   '38-BUREAU 2',
//   '39-BUREAU 3',
//   '40-ASCENSEUR',
//   '41-LOGGIA',
//   '42-LOGGIA',
//   '43-BUREAU 4',
//   '44-BUREAU 5',
//   '45-BUREAU 6',
//   '46-BUREAU 7',
//   '47-BUREAU 8',
//   '48-BUREAU 9',
//   '49-BUREAU 10',
//   '50-BUREAU 11',
//   '51-BUREAU 12',
//   '52-BUREAU 13',
//   '53-BUREAU 14',
//   '54-REUNION 2',
//   '55-PATIO',
//   '56-OPEN SPACE 13',
//   '57-OPEN SPACE',
// ];
// const roomsN2 = ['01-COULOIR',
//   '02-SANITAIRES F',
//   '03-TERRASSE',
//   '04-REUNION 3',
//   '05-REUNION 4',
//   '06-REUNION 5',
//   '07-REUNION 6',
//   '08-OPEN SPACE 4',
//   '09-REPRO',
//   '10-SERVEUR',
//   '11-ENTREE 3 + COULOIRS',
//   '12-BUREAU 5',
//   '13-BUREAU 6',
//   '14-BUREAU 7',
//   '15-LOCAL TECHNIQUE',
//   '16-DOUCHE',
//   '17-DOUCHE',
//   '18-LOCAL TECHNIQUE',
//   '19-BUREAU 8',
//   '20-BUREAU 9',
//   '21-BUREAU 10',
//   '22-BUREAU 11',
//   '23-PLACARD',
//   '24-BUREAU 12',
//   '25-BUREAU 13',
//   '26-BUREAU 14',
//   '27-BUREAU 15',
//   '28-BUREAU 16',
//   '29-BUREAU 17',
//   '30-ESCALIERS ouest',
//   '31-ESCALIERS est',
//   '32-REUNION 7',
//   '33-STOCK',
//   '34-OPEN SPACE 18',
//   '35-TERRASSE',
//   '36-BUREAU 19',
//   '37-BUREAU 20',
//   '38-BUREAU 23',
//   '39-BUREAU 21',
//   '40-ASCENSEUR',
//   '41-BUREAU 22',
//   '42-BUREAU 24',
//   '43-REUNION 8',
//   '44-BUREAU 25',
//   '45-BUREAU 26',
//   '46-BUREAU 27',
//   '47-BUREAU 28',
//   '48-BUREAU 29',
//   '49-BUREAU 30',
//   '50-BUREAU 31',
//   '51-BUREAU 32',
//   '52-TISANERIE',
//   '53-LOGGIA',
//   '54-SANITAIRES H',
//   '55-LOCAL TECHNIQUE',
//   '56-MENAGE',
//   '57-LOCAL TECHNIQUE',
//   '58-REUNION 1',
//   '59-OPEN SPACE 1',
//   '60-TISANERIE',
//   '61-LOGGIA',
//   '62-BUREAU 2',
//   '63-REUNION 2',
//   '64-LOCAL SERVEUR',
// ];
// const geo = new GeoObj('SEML');
// const site = new GeoObj('PHOTONIQUE', geo);
// const bat = new GeoObj('GIENAH', site);
// const N0 = new GeoObj('N0', bat);
// roomsN0.forEach(local => {
//   new GeoObj(local, N0);
// });

// const N1 = new GeoObj('N1', bat);
// roomsN1.forEach(local => {
//   new GeoObj(local, N1);
// });

// const N2 = new GeoObj('N2', bat);
// roomsN2.forEach(local => {
//   new GeoObj(local, N2);
// });

// const roomsTT = ['01-LOCAUX TECHNIQUES',
//   '02-ESCALIERS',
//   '03-TOIT TERRASSE',
// ];

// const TT = new GeoObj('TT', bat);
// roomsTT.forEach(local => {
//   new GeoObj(local, TT);
// });
// export { geo };
// export default geo;
