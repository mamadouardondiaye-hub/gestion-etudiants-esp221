// ========== RECHERCHE ET FILTRES ==========
function getFilteredStudents() {
    const searchInput = document.getElementById('searchInput');
    const formationFilter = document.getElementById('formationFilter');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const formationValue = formationFilter ? formationFilter.value : 'all';
    
    return etudiants.filter(etud => {
        const matchSearch = etud.nom.toLowerCase().includes(searchTerm) || 
                            etud.prenom.toLowerCase().includes(searchTerm) || 
                            etud.email.toLowerCase().includes(searchTerm);
        const matchFormation = (formationValue === "all") || (etud.formation === formationValue);
        return matchSearch && matchFormation;
    });
}

function getTotalPages(filtered) {
    return Math.max(1, Math.ceil(filtered.length / PER_PAGE));
}

function getPageSlice(filtered) {
    const start = (currentPage - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
}

function updateSelectionUI() {
    const selCount = selectedIds.size;
    const selCountEl = document.getElementById('selCount');
    const deleteSelBtn = document.getElementById('deleteSelBtn');
    const selectAllChk = document.getElementById('selectAllChk');
    
    if (selCountEl) selCountEl.textContent = selCount;
    if (deleteSelBtn) deleteSelBtn.disabled = selCount < 3;
    
    const filtered = getFilteredStudents();
    const currentIds = getPageSlice(filtered).map(s => s.id);
    const allSelected = currentIds.length > 0 && currentIds.every(id => selectedIds.has(id));
    if (selectAllChk) selectAllChk.checked = allSelected;
}

function setActiveView(view) {
    currentView = view;
    currentPage = 1;
    const btnList = document.getElementById('btnListView');
    const btnCards = document.getElementById('btnCardsView');
    
    if (view === 'list') {
        if (btnList) {
            btnList.classList.remove('inactive-view-btn');
            btnList.classList.add('active-view-btn');
        }
        if (btnCards) {
            btnCards.classList.remove('active-view-btn');
            btnCards.classList.add('inactive-view-btn');
        }
    } else {
        if (btnCards) {
            btnCards.classList.remove('inactive-view-btn');
            btnCards.classList.add('active-view-btn');
        }
        if (btnList) {
            btnList.classList.remove('active-view-btn');
            btnList.classList.add('inactive-view-btn');
        }
    }
    renderAll();
}