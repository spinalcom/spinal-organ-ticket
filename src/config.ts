const SPINALHUB_IP = process.env.SPINALHUB_IP || 'localhost';
const SPINALHUB_PORT = process.env.SPINALHUB_PORT || '7777';
const SPINAL_USER_ID = process.env.SPINAL_USER_ID || '168';
const SPINAL_PASSWORD = process.env.SPINAL_PASSWORD || 'JHGgcz45JKilmzknzelf65ddDadggftIO98P';
const DIGITAL_TWIN_PATH = process.env.DIGITAL_TWIN_PATH || '/__users__/admin/Digital twin_TEST';
const ALTEVA_DEFAULT_APELANT = process.env.ALTEVA_DEFAULT_APELANT || 'SPINALCOMTEST';

// used to filter the gmao
const BUILDING_NAME = process.env.BUILDING_NAME || 'SEML/PHOTONIQUE/GIENAH';

const config = {
  organ: {
    DEFAULT_APELANT: ALTEVA_DEFAULT_APELANT,
    DigitalTwinPath: DIGITAL_TWIN_PATH,
  },
  spinalConnect: {
    host: SPINALHUB_IP,
    port: SPINALHUB_PORT, // optional
    userID: SPINAL_USER_ID,
    userPassword: SPINAL_PASSWORD,
  },
  ticketConfig: {
    buildingFilterName: BUILDING_NAME,
    Domaine: {
      'BATIMENT_SECOND ŒUVRE': ['AUTRE BATIMENT', 'FENETRES',
        'MUR_CLOISONS', 'PLAFOND', 'PORTES', 'SOL', 'STORES'],
      CHAUFFAGE_VENTILATION_CLIM: ['AUTRE CLIMATISATION_CHAUFFAGE',
        'BOITIERS DOMOTIQUE', 'TEMPERATURE', 'VENTILATION'],
      ELECTRICITE: ['AUTRE ECLAIRAGE_ELECTRICITE', 'CABLES ELECTRIQUES_GOULOTTES',
        'ECLAIRAGE PLAFOND', 'INTERRUPTEURS', 'PRISES DE COURANT'],
      'ESPACES VERTS': ['ESPACES VERTS'],
      HYGIENE_PROPRETE: ['HYGIENE_PROPRETE'],
      'MOYEN DE SECOURS': ['MOYEN DE SECOURS'],
      PLOMBERIE_SANITAIRES: ['AUTRE PLOMBERIE_SANITAIRES', 'DOUCHES', 'EAU',
        'LAVABOS_EVIERS', 'URINOIRS_WC'],
      SURETE: ['AUTRE ACCES SECURISES', 'BARRIERES PARKING', 'INTERPHONES',
        'LECTEURS DE BADGE', 'PORTES AUTOMATIQUES', "PROTILLONS D'ACCCES"],
    },
    ticketPrio: {
      1: '1-Urgent',
      2: '2-Normal',
      3: '3-A l\'occasion',
    },
    states: [{
      color: '#ff00ff', api: 'ALE - Attente de lect.avant Exécution',
      label: 'En attente de Validation',
    },
    { color: '#ff00ff', api: '', label: 'En attente de Confirmation' },
    { color: '#e1dd04', api: 'ARE - Attente de réalisation', label: 'En attente de réalisation' },
    // 'ENC - En cours de réalisation'
    { color: '#04aef2', api: 'REP - Réalisation partielle', label: 'En réalisation partielle' },
    { color: '#ff0000', api: 'REF - Refusée', label: 'Refusées' },
    { color: '#5cc037', api: 'CLO - Clôturée', label: 'Terminées' },
    ],
  },
};

export { config };
export default config;

export const ticketEndStateLst = ['Refusées', 'Terminées'];
