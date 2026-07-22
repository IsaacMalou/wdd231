document.addEventListener("DOMContentLoaded", () => {
    // 1. Set Hidden Form Timestamp
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toLocaleString();
    }

    // 2. Setup Modal Logic
    const modalButtons = document.querySelectorAll(".modal-btn");
    const closeButtons = document.querySelectorAll(".close-modal");
    const modals = document.querySelectorAll(".benefits-modal");

    // Open modals
    modalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    // Close modals via button
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest(".benefits-modal");
            if (modal) {
                modal.close();
            }
        });
    });

    // Close modals when clicking outside the dialog area
    modals.forEach(modal => {
        modal.addEventListener("click", (e) => {
            const dialogDimensions = modal.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                modal.close();
            }
        });
    });
});