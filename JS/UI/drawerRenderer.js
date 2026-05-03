// ========== RENDU DRAWER ARCHIVES ==========
function renderArchiveList() {
    const container = document.getElementById('archiveListContainer');
    if (!container) return;
    
    if (archives.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:40px;color:#999;"><i class="fa-solid fa-inbox fa-3x mb-3"></i><p>Aucun étudiant archivé</p></div>';
        document.getElementById('restoreSelectedBtn').disabled = true;
        return;
    }
    
    container.innerHTML = '';
    selectedArchiveIds.clear();
    
    archives.forEach(archive => {
        const div = document.createElement('div');
        div.className = 'archive-item';
        div.innerHTML = `
            <div class="archive-item-header">
                <input type="checkbox" class="archive-checkbox" data-id="${archive.id}">
                <div class="archive-info">
                    <h4>${escapeHtml(archive.prenom)} ${escapeHtml(archive.nom)}</h4>
                    <p>${escapeHtml(archive.email)} | ${escapeHtml(archive.formation)}</p>
                    <p style="font-size:10px;color:#999;">Archivé le: ${archive.archivedDate}</p>
                </div>
            </div>
            <button class="btn-restore" data-id="${archive.id}">
                <i class="fa-solid fa-trash-restore"></i> Désarchiver
            </button>
        `;
        container.appendChild(div);
    });
    
    document.querySelectorAll('.archive-checkbox').forEach(cb => {
        cb.addEventListener('change', (e) => {
            const id = parseInt(e.target.dataset.id);
            if (e.target.checked) {
                selectedArchiveIds.add(id);
            } else {
                selectedArchiveIds.delete(id);
            }
            const restoreBtn = document.getElementById('restoreSelectedBtn');
            if (restoreBtn) restoreBtn.disabled = selectedArchiveIds.size === 0;
        });
    });
    
    document.querySelectorAll('.btn-restore').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.dataset.id);
            restoreFromArchive(id);
        });
    });
    
    const restoreBtn = document.getElementById('restoreSelectedBtn');
    if (restoreBtn) restoreBtn.disabled = true;
}

function openArchiveDrawer() {
    const drawer = document.getElementById('archiveDrawer');
    const overlay = document.getElementById('drawerOverlay');
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    renderArchiveList();
}

function closeArchiveDrawer() {
    const drawer = document.getElementById('archiveDrawer');
    const overlay = document.getElementById('drawerOverlay');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
}