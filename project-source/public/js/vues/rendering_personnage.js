import LazyLoading from '../utils/lazy_loading.js';
import Rendering from './rendering.js';

class RenderingPersonnage {

    static renderHidePersonnages() {
        let content = document.getElementById('content');
        Rendering.renderEmpty(content);
        Rendering.renderVisible(document.getElementById('voir-personnages'));
        Rendering.renderHidden(document.getElementById('cacher-personnages'));
        Rendering.renderHidden(document.getElementById('filters'));
    }

    static renderDisplayPersonnages(personnages) {
        let buttonAccueil = document.getElementById('go-to-home');
        let manageFav = document.getElementById('manage-fav-button');
        let content = document.getElementById('content');
        Rendering.renderEmpty(content);

        Rendering.renderHidden(buttonAccueil);
        Rendering.renderVisible(manageFav);
        Rendering.renderVisible(document.getElementById('voir-capacites'));
        Rendering.renderVisible(document.getElementById('voir-equipements'));
        Rendering.renderVisible(document.getElementById('manage-fav-button'));
        Rendering.renderHidden(document.getElementById('cacher-capacites'));
        Rendering.renderHidden(document.getElementById('cacher-equipements'));
        Rendering.renderVisible(document.getElementById('filters'));

        for (let personnage of personnages) {
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
            detailLink.setAttribute('href', `#/personnages/detail/${personnage["id"]}`);
            detailLink.classList.add('button-primary');
            detailLink.textContent = 'Détail';
            divInfo.appendChild(detailLink);
        
            content.appendChild(card);
        
            let image = document.createElement('img');
            image.setAttribute("data-src", personnage['image']);
            image.classList.add('lazy');
            divImage.appendChild(image);
        
            let divIntermediaire = document.createElement('div');
            divIntermediaire.appendChild(divInfo);
            divIntermediaire.appendChild(divImage);
            divIntermediaire.classList.add('div-inter-perso');
            card.appendChild(divIntermediaire);
        };        

        Rendering.renderHidden(document.getElementById('voir-personnages'));
        Rendering.renderVisible(document.getElementById('cacher-personnages'));

        LazyLoading.lazyLoadImages();
    }

    static RenderDisplayDetailPersonnage(personnage) {
        let content = document.getElementById('content');
        Rendering.renderEmpty(content);
        Rendering.renderHidden(document.getElementById('filters'));
        Rendering.renderHidden(document.getElementById('button-container'));
        
        let buttonAccueil = document.getElementById('go-to-home');
        buttonAccueil.addEventListener('click', function() { window.location.hash = '/' });
        Rendering.renderVisible(buttonAccueil);

        content.classList.add('card');
        let favButton = document.createElement('button');
        let favImage = document.createElement('img');
        let key = localStorage.getItem(`fav/personnages/${personnage['id']}`);
        if (key == undefined || key == null || key == 0) {
            favImage.src = '../../../assets/not-fav.png';
        } else {
            favImage.src = '../../../assets/fav.png';
        }
        favImage.alt = 'Fav Icon';
        favImage.classList.add('fav-icon');
        favButton.appendChild(favImage);
        
        favButton.addEventListener('click', function() {
            console.log('~ Click on fav button... ~ Change fav status... ~');
            if (localStorage.getItem(`fav/personnages/${personnage['id']}`) == undefined || localStorage.getItem(`fav/personnages/${personnage['id']}`) == null || localStorage.getItem(`fav/personnages/${personnage['id']}`) == 0) {
                localStorage.setItem(`fav/personnages/${personnage['id']}`, 1);
                favImage.src = '../../../assets/fav.png';
            } else {
                localStorage.setItem(`fav/personnages/${personnage['id']}`, 0);
                favImage.src = '../../../assets/not-fav.png';
            }
        });
        
        content.appendChild(favButton);
        
        let nom = document.createElement('h2');
        nom.textContent = 'Nom: ' + personnage['nom_prenom'];
        content.appendChild(nom);
        let race = document.createElement('p');
        race.textContent = 'Race: ' + personnage['race'];
        content.appendChild(race);
        let agilite = document.createElement('p');
        agilite.textContent = 'Agilité: ' + personnage['agilite'];
        content.appendChild(agilite);
        let force = document.createElement('p');
        force.textContent = 'Force: ' + personnage['force'];
        content.appendChild(force);
        let intelligence = document.createElement('p');
        intelligence.textContent = 'Intelligence: ' + personnage['intelligence'];
        content.appendChild(intelligence);
        
        if (personnage['capacite'].length > 0) {
            let capacite = document.createElement('p');
            capacite.textContent = 'Capacités:';
            content.appendChild(capacite);
    
            let capaciteList = document.createElement('ul');
            personnage['capacite'].forEach(async cap => {
                let capaciteItem = document.createElement('li');
                const repJson = await fetch(`capacites/${cap}`);
                const json = await repJson.json();
                capaciteItem.textContent = json['nom'];
                capaciteList.appendChild(capaciteItem);
            });
            content.appendChild(capaciteList);
        }
    
        if (personnage['equipements'].length > 0) {
            let equipements = document.createElement('p');
            equipements.textContent = 'Équipements:';
            content.appendChild(equipements);
    
            let equipementsList = document.createElement('ul');
            personnage['equipements'].forEach(async equip => {
                let equipItem = document.createElement('li');
                const repJson = await fetch(`equipements/${equip}`);
                const json = await repJson.json();
                equipItem.textContent = json['nom'];
                equipementsList.appendChild(equipItem);
            });
            content.appendChild(equipementsList);
        }
        let evaluationContainer = document.createElement('div');
        evaluationContainer.classList.add('evaluation-container');
        for (let i = 1; i <= 5; i++) {
            let starButton = document.createElement('button');
            starButton.id = i;
            starButton.addEventListener('click', async function() {
                console.log('~ Click on evaluate button... ~ Change notation status... ~');
                personnage['note'] == i ? personnage['note'] = i - 1 : personnage['note'] = i;
                await fetch(`/personnages/${personnage['id']}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(personnage)
                });
                RenderingPersonnage.updateStarImages(personnage['note']);
            });
            let starImage = document.createElement('img');
            i <= personnage['note'] ? starImage.src = '../../../assets/star-yellow.png' : starImage.src = '../../../assets/star.png';
            starImage.alt = 'Star Icon';
            starImage.classList.add('star-icon');
            starButton.appendChild(starImage);
            evaluationContainer.appendChild(starButton);
        }
        content.appendChild(evaluationContainer);
    }

    static updateStarImages(note) {
        let starButtons = document.querySelectorAll('.evaluation-container button');
        starButtons.forEach((button, index) => {
            let starImage = button.querySelector('img');
            if (index < note) {
                starImage.src = '../../../assets/star-yellow.png';
            } else {
                starImage.src = '../../../assets/star.png';
            }
        });
    }
}

export default RenderingPersonnage;