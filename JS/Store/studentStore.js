// ========== STORE ==========
// Données
let etudiants = [
    { id: 1, nom: "Diop", prenom: "Amadou", email: "amadou.diop@email.com", telephone: "771234567", adresse: "Dakar, Sénégal", dateInscription: "15/09/2025", formation: "Licence Informatique" },
    { id: 2, nom: "Sall", prenom: "Fatou", email: "fatou.sall@email.com", telephone: "785678901", adresse: "Banjul, Gambie", dateInscription: "22/10/2025", formation: "Master Data Science" },
    { id: 3, nom: "Ndiaye", prenom: "Moussa", email: "moussa.ndiaye@email.com", telephone: "761234567", adresse: "Thiès, Sénégal", dateInscription: "05/11/2025", formation: "BTS Réseaux" },
    { id: 4, nom: "Fall", prenom: "Aissatou", email: "aissatou.fall@email.com", telephone: "708765432", adresse: "Saint-Louis, Sénégal", dateInscription: "12/12/2025", formation: "Licence Marketing" },
    { id: 5, nom: "Diop", prenom: "Ibrahima", email: "ibrahima.diop@email.com", telephone: "771234568", adresse: "Dakar, Sénégal", dateInscription: "18/01/2026", formation: "Licence Développement web" }
];
let archives = [];
let nextId = 6;

// État
let currentPage = 1;
let currentView = "list";
let selectedIds = new Set();
let pendingArchiveId = null;
let selectedArchiveIds = new Set();

const PER_PAGE = 6;