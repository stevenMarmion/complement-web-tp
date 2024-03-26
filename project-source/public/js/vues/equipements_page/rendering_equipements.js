import routes from '../../script.js';
import Rendering from '../rendering.js';

class RenderingEquipements {

    static renderHideEquipements() {
        let equipementsContainer = document.getElementById('equipements-description');
        Rendering.renderEmpty(equipementsContainer);
        Rendering.renderVisible(document.getElementById('voir-equipements'));
        Rendering.renderHidden(document.getElementById('cacher-equipements'));
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

    static renderDisplayEquipements(equipements) {
        let personnagesContainer = document.getElementById('personnages-description');
        let capacitesContainer = document.getElementById('capacites-description');
        let equipementsContainer = document.getElementById('equipements-description');
        Rendering.renderEmpty(personnagesContainer);
        Rendering.renderEmpty(capacitesContainer);
        Rendering.renderEmpty(equipementsContainer);

        equipements.forEach(equipement => {
            let card = document.createElement('div');
            card.classList.add('card');
            
            Rendering.renderVisible(card);

            let nom = document.createElement('h2');
            nom.textContent = equipement['nom'];
            card.appendChild(nom);
            let descr = document.createElement('p');
            descr.textContent = 'Description: ' + equipement['description'];
            card.appendChild(descr);
            let detailButton = document.createElement('button');
            detailButton.textContent = 'Détail';
            detailButton.classList.add('button-primary')
            detailButton.addEventListener('click', async function() {
                console.log('~ Click on detail button... ~ Preparing datas... ~');
                let url = '/equipements/';
                await routes(url, `${equipement["id"]}`);
            });
            card.appendChild(detailButton);
            equipementsContainer.appendChild(card);
        });

        Rendering.renderHidden(document.getElementById('voir-equipements'));
        Rendering.renderVisible(document.getElementById('cacher-equipements'));
        Rendering.renderVisible(document.getElementById('voir-capacites'));
        Rendering.renderVisible(document.getElementById('title-filters'));
        Rendering.renderVisible(document.getElementById('search-button'));
        Rendering.renderVisible(document.getElementById('title-sort'));

        document.querySelectorAll('#all-filters input[type="text"]').forEach(element => { 
            Rendering.renderVisible(element);
        });
        document.querySelectorAll('select').forEach(element => { 
            Rendering.renderVisible(element);
        });
    }

    static renderDisplayDetailEquipements(equipement) {
        document.querySelectorAll('.isVisible').forEach(element => {
            Rendering.renderHidden(element);
        });
        
        let buttonAccueil = document.getElementById('go-to-home');
        let detailContainer = document.getElementById('detail-equipement');

        buttonAccueil.addEventListener('click', async function() {
            console.log('~ Click on Home button... ~ Go to home... ~');
            let url = '/personnages';
            await routes(url, null);
        });

        Rendering.renderVisible(buttonAccueil);
        Rendering.renderEmpty(detailContainer);
        Rendering.renderVisible(detailContainer);

        detailContainer.classList.add('card');
        let nom = document.createElement('h2');
        nom.textContent = 'Nom: ' + equipement['nom'];
        detailContainer.appendChild(nom);
        let rarete = document.createElement('p');
        rarete.textContent = 'Rareté: ' + equipement['rarete'];
        detailContainer.appendChild(rarete);
        let description = document.createElement('p');
        description.textContent = 'Description: ' + equipement['description'];
        detailContainer.appendChild(description);
        let prerequis_force = document.createElement('p');
        prerequis_force.textContent = 'Prérequis force: ' + equipement['prerequis_force'];
        detailContainer.appendChild(prerequis_force);
        let prerequis_intelligence = document.createElement('p');
        prerequis_intelligence.textContent = 'Prérequis intelligence: ' + equipement['prerequis_intelligence'];
        detailContainer.appendChild(prerequis_intelligence);
        let prerequis_agilite = document.createElement('p');
        prerequis_agilite.textContent = 'Prérequis agilité: ' + equipement['prerequis_agilite'];
        detailContainer.appendChild(prerequis_agilite);

        Rendering.renderVisible(detailContainer);
    }

}

export default RenderingEquipements;