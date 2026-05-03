// ========== GESTION DES DATES ==========
function formatDate(dateString) {
    if (!dateString) return '—';
    return dateString;
}

function getCurrentDate() {
    return new Date().toLocaleDateString('fr-FR');
}