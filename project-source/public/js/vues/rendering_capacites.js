import Rendering from './rendering.js';

class RenderingCapacites {

    static renderHideCapacites() {
        let content = document.getElementById('content');
        Rendering.renderEmpty(content);
        Rendering.renderVisible(document.getElementById('voir-capacites'));
        Rendering.renderHidden(document.getElementById('cacher-capacites'));
    }

    static renderDisplayCapacites(capacites) {
        Rendering.renderHidden(document.getElementById('filters'));
        let content = document.getElementById('content');
        Rendering.renderEmpty(content);

        capacites.forEach(capacite => {
            let card = document.createElement('div');
            card.classList.add('card');

            let nom = document.createElement('h2');
            nom.textContent = capacite['nom'];
            card.appendChild(nom);
            let descr = document.createElement('p');
            descr.textContent = 'Description: ' + capacite['description'];
            card.appendChild(descr);
            content.appendChild(card);
        });

        Rendering.renderHidden(document.getElementById('voir-capacites'));
        Rendering.renderVisible(document.getElementById('cacher-capacites'));
        Rendering.renderVisible(document.getElementById('voir-personnages'));
        Rendering.renderVisible(document.getElementById('voir-equipements'));
        Rendering.renderVisible(document.getElementById('manage-fav-button'));
        Rendering.renderHidden(document.getElementById('cacher-personnages'));
        Rendering.renderHidden(document.getElementById('cacher-equipements'));
    }
}

export default RenderingCapacites;