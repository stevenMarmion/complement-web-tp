import routes from '../../script.js';
import Rendering from '../rendering.js';

class RenderingFav {

    static renderDisplayFav(personnages) {
        document.querySelectorAll('.isVisible').forEach(element => {
            Rendering.renderHidden(element);
        });

        let buttonAccueil = document.getElementById('go-to-home');
        let detailContainer = document.getElementById('personnages-description');
        
        Rendering.renderVisible(buttonAccueil);
        Rendering.renderEmpty(detailContainer);

        personnages.forEach(personnage => {
            let card = document.createElement('div');
            card.classList.add('card');
            Rendering.renderVisible(card);
        
            let divInfo = document.createElement('div');
            let divImage = document.createElement('div');
            divImage.classList.add('div-image-perso');
            
            let nom = document.createElement('h2');
            nom.textContent = personnage['nom_prenom'];
            divInfo.appendChild(nom);
            let race = document.createElement('p');
            race.textContent = 'Race: ' + personnage['race'];
            divInfo.appendChild(race);
            let agilite = document.createElement('p');
            agilite.textContent = 'Agilité: ' + personnage['agilite'];
            divInfo.appendChild(agilite);
            let force = document.createElement('p');
            force.textContent = 'Force: ' + personnage['force'];
            divInfo.appendChild(force);
        
            let detailLink = document.createElement('a');
            detailLink.setAttribute('href', `#/personnages/detail/${personnage["id"]}`);
            detailLink.classList.add('button-primary');
            detailLink.textContent = 'Détail';
            divInfo.appendChild(detailLink);
        
            personnagesContainer.appendChild(card);
        
            let image = document.createElement('img');
            image.setAttribute("src", personnage['image']);
            divImage.appendChild(image);
        
            let divIntermediaire = document.createElement('div');
            divIntermediaire.appendChild(divInfo);
            divIntermediaire.appendChild(divImage);
            divIntermediaire.classList.add('div-inter-perso');
            card.appendChild(divIntermediaire);
        }); 
    }
}

export default RenderingFav;