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
            let divInfo = document.createElement('div');
            let divImage = document.createElement('div');
            card.classList.add('card');
            
            Rendering.renderVisible(card);
        
            let nom = document.createElement('h2');
            nom.textContent = equipement['nom'];
            divInfo.appendChild(nom);
            let descr = document.createElement('p');
            descr.textContent = 'Description: ' + equipement['description'];
            divInfo.appendChild(descr);
        
            let detailLink = document.createElement('a');
            detailLink.setAttribute('href', `#/equipements/detail/${equipement["id"]}`);
            detailLink.classList.add('button-primary');
            detailLink.textContent = 'Détail';
            divInfo.appendChild(detailLink);
        
            equipementsContainer.appendChild(card);
        
            let image = document.createElement('img');
            let divInter = document.createElement('div');
            divInter.classList.add("div-inter-equip");
            image.setAttribute("src",equipement["image"]);
            divImage.classList.add("div-image-equip")
            divImage.appendChild(image);
            divInter.appendChild(divInfo);
            divInter.appendChild(divImage);
            card.appendChild(divInter);
        });        

        Rendering.renderHidden(document.getElementById('voir-equipements'));
        Rendering.renderVisible(document.getElementById('cacher-equipements'));
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