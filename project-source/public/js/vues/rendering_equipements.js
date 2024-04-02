import LazyLoading from '../utils/lazy_loading.js';
import Rendering from './rendering.js';

class RenderingEquipements {

    static renderHideEquipements() {
        let content = document.getElementById('content');
        Rendering.renderEmpty(content);
        Rendering.renderVisible(document.getElementById('voir-equipements'));
        Rendering.renderHidden(document.getElementById('cacher-equipements'));
    }

    static renderDisplayEquipements(equipements) {
        let content = document.getElementById('content');
        Rendering.renderEmpty(content);
        Rendering.renderHidden(document.getElementById('filters'));

        equipements.forEach(equipement => {
            let card = document.createElement('div');
            let divInfo = document.createElement('div');
            let divImage = document.createElement('div');
            card.classList.add('card');
        
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
        
            content.appendChild(card);
        
            let image = document.createElement('img');
            let divInter = document.createElement('div');
            divInter.classList.add("div-inter-equip");
            image.setAttribute("data-src", equipement["image"]);
            image.classList.add('lazy');
            divImage.classList.add("div-image-equip")
            divImage.appendChild(image);
            divInter.appendChild(divInfo);
            divInter.appendChild(divImage);
            card.appendChild(divInter);
        });        

        Rendering.renderHidden(document.getElementById('voir-equipements'));
        Rendering.renderVisible(document.getElementById('cacher-equipements'));
        Rendering.renderVisible(document.getElementById('voir-capacites'));
        Rendering.renderVisible(document.getElementById('voir-personnages'));
        Rendering.renderVisible(document.getElementById('manage-fav-button'));
        Rendering.renderHidden(document.getElementById('cacher-capacites'));
        Rendering.renderHidden(document.getElementById('cacher-personnages'));

        LazyLoading.lazyLoadImages();
    }

    static renderDisplayDetailEquipements(equipement) {
        Rendering.renderHidden(document.getElementById('filters'));
        Rendering.renderHidden(document.getElementById('button-container'));
        let content = document.getElementById('content');
        Rendering.renderEmpty(content);
        
        let buttonAccueil = document.getElementById('go-to-home');
        Rendering.renderVisible(buttonAccueil);

        content.classList.add('card');
        let nom = document.createElement('h2');
        nom.textContent = 'Nom: ' + equipement['nom'];
        content.appendChild(nom);
        let rarete = document.createElement('p');
        rarete.textContent = 'Rareté: ' + equipement['rarete'];
        content.appendChild(rarete);
        let description = document.createElement('p');
        description.textContent = 'Description: ' + equipement['description'];
        content.appendChild(description);
        let prerequis_force = document.createElement('p');
        prerequis_force.textContent = 'Prérequis force: ' + equipement['prerequis_force'];
        content.appendChild(prerequis_force);
        let prerequis_intelligence = document.createElement('p');
        prerequis_intelligence.textContent = 'Prérequis intelligence: ' + equipement['prerequis_intelligence'];
        content.appendChild(prerequis_intelligence);
        let prerequis_agilite = document.createElement('p');
        prerequis_agilite.textContent = 'Prérequis agilité: ' + equipement['prerequis_agilite'];
        content.appendChild(prerequis_agilite);
    }
}

export default RenderingEquipements;