// ========== TOAST NOTIFICATIONS ==========
function showToast(message, type = "success") {
    let container = document.getElementById("toastContainer");
    if (!container) {
        container = document.createElement("div");
        container.id = "toastContainer";
        container.className = "toast-container";
        document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    let icon = type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : "fa-info-circle";
    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span style="flex:1">${message}</span>
        <i class="fa-solid fa-xmark toast-close" style="cursor:pointer"></i>
    `;
    container.appendChild(toast);
    const closeBtn = toast.querySelector(".toast-close");
    closeBtn.addEventListener("click", () => toast.remove());
    setTimeout(() => toast.remove(), 4000);
}