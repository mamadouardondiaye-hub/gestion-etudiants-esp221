// ========== INITIALISATION ==========
document.addEventListener('DOMContentLoaded', function() {
    renderAll();
    
    const btnList = document.getElementById('btnListView');
    const btnCards = document.getElementById('btnCardsView');
    const searchInput = document.getElementById('searchInput');
    const formationFilter = document.getElementById('formationFilter');
    const resetSearchBtn = document.getElementById('resetSearchBtn');
    const selectAllChk = document.getElementById('selectAllChk');
    const deleteSelBtn = document.getElementById('deleteSelBtn');
    const openArchiveBtn = document.getElementById('openArchiveBtn');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const restoreSelectedBtn = document.getElementById('restoreSelectedBtn');
    
    if (btnList) btnList.addEventListener('click', () => setActiveView('list'));
    if (btnCards) btnCards.addEventListener('click', () => setActiveView('cards'));
    if (searchInput) searchInput.addEventListener('input', () => {
        currentPage = 1;
        renderAll();
    });
    if (formationFilter) formationFilter.addEventListener('change', () => {
        currentPage = 1;
        renderAll();
    });
    if (resetSearchBtn) resetSearchBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (formationFilter) formationFilter.value = 'all';
        currentPage = 1;
        renderAll();
    });
    
    if (selectAllChk) {
        selectAllChk.addEventListener('change', (e) => {
            const filtered = getFilteredStudents();
            const currentIds = getPageSlice(filtered).map(s => s.id);
            if (e.target.checked) {
                currentIds.forEach(id => selectedIds.add(id));
            } else {
                currentIds.forEach(id => selectedIds.delete(id));
            }
            renderAll();
        });
    }
    
    if (deleteSelBtn) {
        deleteSelBtn.addEventListener('click', () => {
            if (selectedIds.size >= 3) openMultiArchiveConfirm();
        });
    }
    
    if (openArchiveBtn) openArchiveBtn.addEventListener('click', openArchiveDrawer);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeArchiveDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeArchiveDrawer);
    if (restoreSelectedBtn) restoreSelectedBtn.addEventListener('click', restoreSelectedArchives);
    
    const addModal = document.getElementById('addModal');
    const editModal = document.getElementById('editModal');
    
    if (addModal) {
        addModal.addEventListener('click', function(e) {
            if (e.target === this) closeAddModal();
        });
    }
    if (editModal) {
        editModal.addEventListener('click', function(e) {
            if (e.target === this) closeEditModal();
        });
    }
});