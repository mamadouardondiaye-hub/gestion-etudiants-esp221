// ========== GESTION DES ERREURS UI ==========
function showEmailError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
        errorEl.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${message}`;
        errorEl.classList.remove('hidden');
    }
}

function hideEmailError(elementId) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) errorEl.classList.add('hidden');
}

function showTelError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
        errorEl.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${message}`;
        errorEl.classList.remove('hidden');
    }
}

function hideTelError(elementId) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) errorEl.classList.add('hidden');
}