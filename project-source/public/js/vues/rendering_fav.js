import Rendering from './rendering.js';

class RenderingFav {

    static renderDisplayFav() {
        Rendering.renderHidden(document.getElementById('button-container'));
        Rendering.renderHidden(document.getElementById('filters'));
        let content = document.getElementById('content');
        Rendering.renderEmpty(content);
    
        let buttonAccueil = document.getElementById('go-to-home');
        Rendering.renderVisible(buttonAccueil);
    
        let favKeys = Object.keys(localStorage).filter(key => key.startsWith('fav/')  && localStorage.getItem(key) === '1');

        favKeys.forEach(async key => {
            let personnageId = key.split('/').pop();
            let personnage = await fetch(`/personnages/${personnageId}`);
            personnage = await personnage.json();
    
            let card = document.createElement('div');
            card.classList.add('card');
    
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
            detailLink.setAttribute('href', `#/personnages/detail/${personnageId}`);
            detailLink.classList.add('button-primary');
            detailLink.textContent = 'Détail';
            divInfo.appendChild(detailLink);
    
            content.appendChild(card);
    
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