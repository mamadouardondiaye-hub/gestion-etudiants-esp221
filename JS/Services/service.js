// ========== SERVICES CRUD ==========
// MODALS
function openAddModal() {
    const modal = document.getElementById('addModal');
    if (modal) modal.classList.add('active');
}

function closeAddModal() {
    const modal = document.getElementById('addModal');
    if (modal) modal.classList.remove('active');
}

function openEditModal() {
    const modal = document.getElementById('editModal');
    if (modal) modal.classList.add('active');
}

function closeEditModal() {
    const modal = document.getElementById('editModal');
    if (modal) modal.classList.remove('active');
}

// AJOUTER
function ajouterEtudiant() {
    const nom = document.getElementById('addNom').value.trim();
    const prenom = document.getElementById('addPrenom').value.trim();
    const email = document.getElementById('addEmail').value.trim();
    const telephone = document.getElementById('addTelephone').value.trim();
    const adresse = document.getElementById('addAdresse').value.trim();
    const dateInscription = document.getElementById('addDate').value.trim();
    const formation = document.getElementById('addFormation').value;
    
    hideEmailError('addEmailError');
    hideTelError('addTelError');
    
    if (!nom || !prenom) {
        showToast("Le nom et le prénom sont requis", "error");
        return;
    }
    
    if (!email) {
        showToast("L'email est requis", "error");
        return;
    }
    
    if (!isEmailUnique(email)) {
        showEmailError('addEmailError', 'Cet email existe déjà');
        return;
    }
    
    if (!telephone) {
        showToast("Le téléphone est requis", "error");
        return;
    }
    
    if (!isValidPhone(telephone)) {
        showTelError('addTelError', 'Téléphone invalide (Sénégal: 70/76/77/78 + 7 chiffres, Gambie: 5/6/7/9 + 6 chiffres)');
        return;
    }
    
    if (!isTelephoneUnique(telephone)) {
        showTelError('addTelError', 'Ce numéro de téléphone existe déjà');
        return;
    }
    
    const newEtudiant = {
        id: nextId++,
        nom: nom,
        prenom: prenom,
        email: email,
        telephone: cleanPhone(telephone),
        adresse: adresse || '',
        dateInscription: dateInscription || getCurrentDate(),
        formation: formation
    };
    
    etudiants.push(newEtudiant);
    saveToLocalStorage();
    closeAddModal();
    
    document.getElementById('addNom').value = '';
    document.getElementById('addPrenom').value = '';
    document.getElementById('addEmail').value = '';
    document.getElementById('addTelephone').value = '';
    document.getElementById('addAdresse').value = '';
    document.getElementById('addDate').value = '';
    
    const filtered = getFilteredStudents();
    currentPage = getTotalPages(filtered);
    renderAll();
    
    showToast(`${prenom} ${nom} a été ajouté avec succès !`, "success");
}

// MODIFIER
function openEditWithId(id) {
    const etud = etudiants.find(e => e.id === id);
    if (!etud) return;
    
    document.getElementById('editId').value = etud.id;
    document.getElementById('editNom').value = etud.nom;
    document.getElementById('editPrenom').value = etud.prenom;
    document.getElementById('editEmail').value = etud.email;
    document.getElementById('editTelephone').value = etud.telephone;
    document.getElementById('editAdresse').value = etud.adresse || '';
    document.getElementById('editDate').value = etud.dateInscription || '';
    document.getElementById('editFormation').value = etud.formation;
    
    hideEmailError('editEmailError');
    hideTelError('editTelError');
    
    openEditModal();
}

function modifierEtudiant() {
    const id = parseInt(document.getElementById('editId').value);
    const index = etudiants.findIndex(e => e.id === id);
    if (index === -1) return;
    
    const nom = document.getElementById('editNom').value.trim();
    const prenom = document.getElementById('editPrenom').value.trim();
    const email = document.getElementById('editEmail').value.trim();
    const telephone = document.getElementById('editTelephone').value.trim();
    const adresse = document.getElementById('editAdresse').value.trim();
    const dateInscription = document.getElementById('editDate').value.trim();
    const formation = document.getElementById('editFormation').value;
    
    hideEmailError('editEmailError');
    hideTelError('editTelError');
    
    let valid = true;
    
    if (!email) {
        showToast("L'email est requis", "error");
        return;
    }
    
    if (!isEmailUnique(email, id)) {
        showEmailError('editEmailError', 'Cet email existe déjà');
        valid = false;
    }
    
    if (!isValidPhone(telephone)) {
        showTelError('editTelError', 'Téléphone invalide');
        valid = false;
    } else if (!isTelephoneUnique(telephone, id)) {
        showTelError('editTelError', 'Ce numéro de téléphone existe déjà');
        valid = false;
    }
    
    if (!valid) return;
    
    etudiants[index] = {
        ...etudiants[index],
        nom: nom,
        prenom: prenom,
        email: email,
        telephone: cleanPhone(telephone),
        adresse: adresse,
        dateInscription: dateInscription || etudiants[index].dateInscription,
        formation: formation
    };
    
    saveToLocalStorage();
    closeEditModal();
    renderAll();
    showToast(`${prenom} ${nom} a été modifié avec succès`, "success");
}

// ARCHIVAGE
function openArchiveConfirm(id, name) {
    pendingArchiveId = id;
    const msgEl = document.getElementById('confirmArchiveMsg');
    if (msgEl) msgEl.innerHTML = `Archiver <strong>${name}</strong> ? L'étudiant sera déplacé dans les archives.`;
    const modal = document.getElementById('confirmArchiveModal');
    if (modal) modal.classList.remove('hidden');
}

function closeArchiveConfirm() {
    const modal = document.getElementById('confirmArchiveModal');
    if (modal) modal.classList.add('hidden');
    pendingArchiveId = null;
}

function confirmArchive() {
    if (pendingArchiveId) {
        const etud = etudiants.find(e => e.id === pendingArchiveId);
        if (etud) {
            archives.push({ ...etud, archivedDate: getCurrentDate() });
            etudiants = etudiants.filter(e => e.id !== pendingArchiveId);
            selectedIds.delete(pendingArchiveId);
            saveToLocalStorage();
            
            const filtered = getFilteredStudents();
            const totalPages = getTotalPages(filtered);
            if (currentPage > totalPages) currentPage = totalPages;
            
            renderAll();
            showToast(`${etud.prenom} ${etud.nom} a été archivé`, "warning");
        }
        pendingArchiveId = null;
    }
    closeArchiveConfirm();
}

function openMultiArchiveConfirm() {
    if (selectedIds.size < 3) return;
    const msgEl = document.getElementById('confirmMultiArchiveMsg');
    if (msgEl) msgEl.innerHTML = `Archiver <strong>${selectedIds.size}</strong> étudiant${selectedIds.size > 1 ? 's' : ''} ? Ils seront déplacés dans les archives.`;
    const modal = document.getElementById('confirmMultiArchiveModal');
    if (modal) modal.classList.remove('hidden');
}

function closeMultiArchiveConfirm() {
    const modal = document.getElementById('confirmMultiArchiveModal');
    if (modal) modal.classList.add('hidden');
}

function confirmMultiArchive() {
    const count = selectedIds.size;
    const idsToArchive = Array.from(selectedIds);
    
    idsToArchive.forEach(id => {
        const etud = etudiants.find(e => e.id === id);
        if (etud) {
            archives.push({ ...etud, archivedDate: getCurrentDate() });
        }
    });
    
    etudiants = etudiants.filter(e => !selectedIds.has(e.id));
    selectedIds.clear();
    saveToLocalStorage();
    
    const filtered = getFilteredStudents();
    const totalPages = getTotalPages(filtered);
    if (currentPage > totalPages) currentPage = totalPages;
    
    renderAll();
    showToast(`${count} étudiant${count > 1 ? 's' : ''} archivé${count > 1 ? 's' : ''} avec succès`, "warning");
    closeMultiArchiveConfirm();
}

// RESTAURATION
function restoreFromArchive(id) {
    const index = archives.findIndex(a => a.id === id);
    if (index !== -1) {
        const restored = archives[index];
        const { archivedDate, ...student } = restored;
        etudiants.push(student);
        archives.splice(index, 1);
        saveToLocalStorage();
        
        renderAll();
        renderArchiveList();
        showToast(`${student.prenom} ${student.nom} a été restauré`, "success");
    }
}

function restoreSelectedArchives() {
    if (selectedArchiveIds.size === 0) return;
    
    const idsToRestore = Array.from(selectedArchiveIds);
    idsToRestore.forEach(id => {
        const index = archives.findIndex(a => a.id === id);
        if (index !== -1) {
            const restored = archives[index];
            const { archivedDate, ...student } = restored;
            etudiants.push(student);
            archives.splice(index, 1);
        }
    });
    
    selectedArchiveIds.clear();
    saveToLocalStorage();
    renderAll();
    renderArchiveList();
    showToast(`${idsToRestore.length} étudiant${idsToRestore.length > 1 ? 's' : ''} restauré${idsToRestore.length > 1 ? 's' : ''}`, "success");
}
