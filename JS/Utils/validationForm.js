// ========== VALIDATION ==========
function isValidPhone(telephone) {
    let cleaned = telephone.replace(/[\s\+\(\)\-]/g, '');
    const senegalRegex = /^(70|71|75|76|77|78)\d{7}$/;
    const gambieRegex = /^(5|6|7|9)\d{6}$/;
    return senegalRegex.test(cleaned) || gambieRegex.test(cleaned);
}

function cleanPhone(telephone) {
    return telephone.replace(/[\s\+\(\)\-]/g, '');
}

function isEmailUnique(email, excludeId = null) {
    return !etudiants.some(e => e.email.toLowerCase() === email.toLowerCase() && e.id !== excludeId);
}

function isTelephoneUnique(telephone, excludeId = null) {
    let cleaned = cleanPhone(telephone);
    return !etudiants.some(e => {
        let existCleaned = cleanPhone(e.telephone);
        return existCleaned === cleaned && e.id !== excludeId;
    });
}