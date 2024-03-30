import Rendering from "./rendering.js";

export default class Home {
    static render() {
        const contentContainer = document.getElementById('content');
        Rendering.renderVisible(document.getElementById('button-container'));
        Rendering.renderHidden(document.getElementById('filters'));
        Rendering.renderVisible(document.getElementById('voir-capacites'));
        Rendering.renderVisible(document.getElementById('voir-equipements'));
        Rendering.renderVisible(document.getElementById('voir-personnages'));
        Rendering.renderVisible(document.getElementById('manage-fav-button'));
        Rendering.renderHidden(document.getElementById('cacher-capacites'));
        Rendering.renderHidden(document.getElementById('cacher-equipements'));
        Rendering.renderHidden(document.getElementById('cacher-personnages'));
        const divContainer = document.createElement('div');
        divContainer.classList.add('home-content');
        const heading = document.createElement('h1');
        const paragraph2 = document.createElement('p');
        heading.textContent = "Bienvenue sur notre site !";
        paragraph2.textContent = "Explorez l'univers fascinant des personnages médiévaux, avec leurs aventures épiques, leurs mystères et leurs légendes. Plongez dans des récits captivants et découvrez des histoires riches en héros, en batailles et en intrigues.";
        Rendering.renderEmpty(contentContainer);
        divContainer.appendChild(heading);
        divContainer.appendChild(paragraph2);
        contentContainer.appendChild(divContainer);
        for (let i = 0 ; i < 50 ; i++) {
            let card = document.createElement('div');
            card.classList.add('card');
            let image = document.createElement('img');
            image.setAttribute("data-src", '../../assets/default.jpg');
            card.appendChild(image);
            contentContainer.appendChild(card);
        }
    }
}
