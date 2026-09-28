const timestamp = document.querySelector("#timestamp");
timestamp.value = new Date().toISOString();

document.querySelectorAll("[data-dialog]").forEach((button) => {
    const dialog = document.getElementById(button.dataset.dialog);

    button.addEventListener("click", () => {
        dialog.showModal();
    });

    dialog.querySelector(".dialog-close").addEventListener("click", () => {
        dialog.close();
    });
});