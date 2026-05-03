// ========== RENDU DES ÉTUDIANTS ==========
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function renderListe(students) {
    const tbody = document.getElementById('studentsTableBody');
    if (!tbody) return;
    
    if (students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="text-center py-8 text-gray-500">Aucun étudiant trouvé</td></tr>';
        return;
    }
    
    tbody.innerHTML = '';
    students.forEach(etud => {
        const isSelected = selectedIds.has(etud.id);
        const row = document.createElement('tr');
        row.className = `hover:bg-gray-50 transition ${isSelected ? 'bg-orange-50' : ''}`;
        row.innerHTML = `
            <td class="px-6 py-4 text-sm">
                <input type="checkbox" class="student-select" data-id="${etud.id}" ${isSelected ? 'checked' : ''}>
            </td>
            <td class="px-6 py-4 text-sm text-gray-800">#${etud.id}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${escapeHtml(etud.nom)}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${escapeHtml(etud.prenom)}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${escapeHtml(etud.email)}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${escapeHtml(etud.telephone)}</td>
            <td class="px-6 py-4 text-sm text-gray-800">${escapeHtml(etud.adresse || '—')}</td>
            <td class="px-6 py-4 text-sm"><span class="bg-orange-100 text-[#FF8C42] px-2 py-1 rounded-full text-xs">${escapeHtml(etud.formation)}</span></td>
            <td class="px-6 py-4">
                <div class="flex gap-3">
                    <button onclick="openEditWithId(${etud.id})" class="text-blue-600 hover:text-blue-800">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button onclick="openArchiveConfirm(${etud.id}, '${escapeHtml(etud.prenom)} ${escapeHtml(etud.nom)}')" class="text-red-600 hover:text-red-800">
                        <i class="fa-solid fa-box-archive"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    document.querySelectorAll('.student-select').forEach(cb => {
        cb.addEventListener('change', (e) => {
            const id = parseInt(e.target.dataset.id);
            if (e.target.checked) {
                selectedIds.add(id);
            } else {
                selectedIds.delete(id);
            }
            updateSelectionUI();
            renderAll();
        });
    });
}

function renderCartes(students) {
    const container = document.getElementById('cardsViewContainer');
    if (!container) return;
    
    if (students.length === 0) {
        container.innerHTML = '<div class="col-span-full text-center py-12 text-gray-500"><i class="fa-solid fa-credit-card text-4xl mb-2"></i>Aucune carte</div>';
        return;
    }
    
    container.innerHTML = '';
    students.forEach(etud => {
        const isSelected = selectedIds.has(etud.id);
        const card = document.createElement('div');
        card.className = `student-card bg-white rounded-xl shadow-md overflow-hidden border ${isSelected ? 'border-[#FF8C42] bg-orange-50' : 'border-gray-100'}`;
        card.innerHTML = `
            <div class="p-5">
                <input type="checkbox" class="card-checkbox student-select" data-id="${etud.id}" ${isSelected ? 'checked' : ''}>
                <div class="flex justify-between items-start">
                    <div class="bg-[#FF8C42] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        ${escapeHtml(etud.prenom.charAt(0))}${escapeHtml(etud.nom.charAt(0))}
                    </div>
                </div>
                <div class="mt-4">
                    <h3 class="font-bold text-lg text-gray-800">${escapeHtml(etud.prenom)} ${escapeHtml(etud.nom)}</h3>
                    <p class="text-sm text-gray-500 mt-1"><i class="fa-regular fa-envelope mr-1"></i> ${escapeHtml(etud.email)}</p>
                    <p class="text-sm text-gray-500"><i class="fa-solid fa-phone mr-1"></i> ${escapeHtml(etud.telephone)}</p>
                    <p class="text-sm text-gray-500"><i class="fa-solid fa-location-dot mr-1"></i> ${escapeHtml(etud.adresse || '—')}</p>
                    <div class="mt-3 flex justify-between items-center">
                        <span class="inline-block bg-orange-100 text-[#FF8C42] text-xs px-2 py-1 rounded-full"><i class="fa-solid fa-graduation-cap mr-1"></i> ${escapeHtml(etud.formation)}</span>
                        <div class="flex gap-2">
                            <button onclick="openEditWithId(${etud.id})" class="text-blue-600 hover:bg-blue-50 p-2 rounded-full">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button onclick="openArchiveConfirm(${etud.id}, '${escapeHtml(etud.prenom)} ${escapeHtml(etud.nom)}')" class="text-red-600 hover:bg-red-50 p-2 rounded-full">
                                <i class="fa-solid fa-box-archive"></i>
                            </button>
                        </div>
                    </div>
                    <p class="text-xs text-gray-400 mt-3"><i class="fa-regular fa-calendar mr-1"></i> Inscription: ${escapeHtml(etud.dateInscription || '—')}</p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    
    document.querySelectorAll('.student-select').forEach(cb => {
        cb.addEventListener('change', (e) => {
            const id = parseInt(e.target.dataset.id);
            if (e.target.checked) {
                selectedIds.add(id);
            } else {
                selectedIds.delete(id);
            }
            updateSelectionUI();
            renderAll();
        });
    });
}

function renderAll() {
    const filtered = getFilteredStudents();
    const totalPages = getTotalPages(filtered);
    
    if (currentPage > totalPages) currentPage = totalPages;
    
    const pageStudents = getPageSlice(filtered);
    const totalCount = etudiants.length;
    const listCountEl = document.getElementById('listCount');
    if (listCountEl) listCountEl.textContent = `${totalCount} étudiant${totalCount > 1 ? 's' : ''}`;
    
    const noResultMsg = document.getElementById('noResultMessage');
    if (filtered.length === 0) {
        if (noResultMsg) noResultMsg.classList.remove('hidden');
    } else {
        if (noResultMsg) noResultMsg.classList.add('hidden');
    }
    
    if (currentView === 'list') {
        const tableView = document.getElementById('tableViewContainer');
        const cardsView = document.getElementById('cardsViewContainer');
        if (tableView) tableView.style.display = 'block';
        if (cardsView) cardsView.classList.remove('active');
        renderListe(pageStudents);
    } else {
        const tableView = document.getElementById('tableViewContainer');
        const cardsView = document.getElementById('cardsViewContainer');
        if (tableView) tableView.style.display = 'none';
        if (cardsView) cardsView.classList.add('active');
        renderCartes(pageStudents);
    }
    
    renderPagination(filtered);
    updateSelectionUI();
}