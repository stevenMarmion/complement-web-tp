import Rendering from "./rendering.js";

export default class Erreur_404 {
    static render() {
        const contentContainer = document.getElementById('content');
        Rendering.renderHidden(document.getElementById('filters'));
        Rendering.renderHidden(document.getElementById('button-container'));
        const errorContainer = document.createElement('div');
        errorContainer.classList.add('error-container');
        const errorHeading = document.createElement('h1');
        errorHeading.textContent = "ERREUR 404, vous n'êtes pas en lieu sûr";
        const errorMessage = document.createElement('p');
        const homeLink = document.createElement('a');
        errorMessage.textContent = "Revenez en lieu sûr.";
        homeLink.textContent = "Retour à la page d'accueil";
        homeLink.href = "#/home";
        homeLink.addEventListener('click', () => {
            console.log("Clic sur le lien de retour à la page d'accueil.");
        });

        Rendering.renderEmpty(contentContainer);
        errorContainer.appendChild(errorHeading);
        errorContainer.appendChild(errorMessage);
        errorContainer.appendChild(homeLink);
        contentContainer.appendChild(errorContainer);
    }
}
