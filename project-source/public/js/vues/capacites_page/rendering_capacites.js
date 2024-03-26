import routes from '../../script.js';
import Rendering from '../rendering.js';

class RenderingCapacites {

    static renderHideCapacites() {
        let capacitesContainer = document.getElementById('capacites-description');
        Rendering.renderEmpty(capacitesContainer);
        Rendering.renderVisible(document.getElementById('voir-capacites'));
        Rendering.renderHidden(document.getElementById('cacher-capacites'));
        Rendering.renderHidden(document.getElementById('title-filters'));
        Rendering.renderHidden(document.getElementById('search-button'));
        Rendering.renderHidden(document.getElementById('title-sort'));

        document.querySelectorAll('#all-filters input[type="text"]').forEach(element => { 
            Rendering.renderHidden(element);
        });
        document.querySelectorAll('select').forEach(element => { 
            Rendering.renderHidden(element);
        });
    }

    static renderDisplayCapacites(capacites) {
        let personnagesContainer = document.getElementById('personnages-description');
        let capacitesContainer = document.getElementById('capacites-description');

        Rendering.renderEmpty(personnagesContainer);
        Rendering.renderEmpty(capacitesContainer);

        capacites.forEach(capacite => {
            let card = document.createElement('div');
            card.classList.add('card');

            Rendering.renderVisible(card);

            let nom = document.createElement('h2');
            nom.textContent = capacite['nom'];
            card.appendChild(nom);
            let descr = document.createElement('p');
            descr.textContent = 'Description: ' + capacite['description'];
            card.appendChild(descr);
            capacitesContainer.appendChild(card);
        });

        Rendering.renderHidden(document.getElementById('voir-capacites'));
        Rendering.renderVisible(document.getElementById('cacher-capacites'));
    }
}

export default RenderingCapacites;