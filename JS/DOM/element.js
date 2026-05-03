// ========== MANIPULATION DOM ==========
function getElement(id) {
    return document.getElementById(id);
}

function setInnerHTML(elementId, html) {
    const el = getElement(elementId);
    if (el) el.innerHTML = html;
}

function showElement(elementId) {
    const el = getElement(elementId);
    if (el) el.classList.remove('hidden');
}

function hideElement(elementId) {
    const el = getElement(elementId);
    if (el) el.classList.add('hidden');
}

function toggleElement(elementId) {
    const el = getElement(elementId);
    if (el) el.classList.toggle('hidden');
}