import routes from '../../script.js';
import Rendering from '../rendering.js';

class RenderingPersonnage {

    static renderHidePersonnages() {
        let personnagesContainer = document.getElementById('personnages-description');
        Rendering.renderEmpty(personnagesContainer);
        Rendering.renderVisible(document.getElementById('voir-personnages'));
        Rendering.renderHidden(document.getElementById('cacher-personnages'));
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

    static renderDisplayPersonnages(personnages) {
        let buttonAccueil = document.getElementById('go-to-home');
        let detailPerso = document.getElementById('detail-personnage');
        let manageFav = document.getElementById('manage-fav-button');
        let capacitesContainer = document.getElementById('capacites-description');
        let equipementsContainer = document.getElementById('equipements-description');
        let personnagesContainer = document.getElementById('personnages-description');

        Rendering.renderHidden(buttonAccueil);
        Rendering.renderHidden(detailPerso);
        Rendering.renderVisible(manageFav);
        Rendering.renderEmpty(capacitesContainer);
        Rendering.renderVisible(document.getElementById('voir-capacites'));
        Rendering.renderVisible(document.getElementById('voir-equipements'));
        Rendering.renderEmpty(equipementsContainer);
        Rendering.renderEmpty(personnagesContainer);

        personnages.forEach(personnage => {
            let card = document.createElement('div');
            card.classList.add('card');

            Rendering.renderVisible(card);
            
            let nom = document.createElement('h2');
            nom.textContent = personnage['nom_prenom'];
            card.appendChild(nom);
            let race = document.createElement('p');
            race.textContent = 'Race: ' + personnage['race'];
            card.appendChild(race);
            let agilite = document.createElement('p');
            agilite.textContent = 'Agilité: ' + personnage['agilite'];
            card.appendChild(agilite);
            let force = document.createElement('p');
            force.textContent = 'Force: ' + personnage['force'];
            card.appendChild(force);
            let detailButton = document.createElement('button');
            detailButton.textContent = 'Détail';
            detailButton.classList.add('button-primary')
            detailButton.addEventListener('click', async function() {
                console.log('~ Click on detail button... ~ Preparing datas... ~');
                let url = '/personnages/';
                await routes(url, `${personnage["id"]}`);
            });
            card.appendChild(detailButton);
            personnagesContainer.appendChild(card);
        });

        Rendering.renderHidden(document.getElementById('voir-personnages'));
        Rendering.renderVisible(document.getElementById('cacher-personnages'));
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

    static RenderDisplayDetailPersonnage(personnage) {
        document.querySelectorAll('.isVisible').forEach(element => {
            Rendering.renderHidden(element);
        });
        
        let buttonAccueil = document.getElementById('go-to-home');
        let detailContainer = document.getElementById('detail-personnage');

        buttonAccueil.addEventListener('click', async function() {
            console.log('~ Click on Home button... ~ Go to home... ~');
            let url = '/personnages';
            await routes(url, null);
        });
        Rendering.renderVisible(buttonAccueil);
        Rendering.renderEmpty(detailContainer);
        Rendering.renderVisible(detailContainer);

        detailContainer.classList.add('card');
        let favButton = document.createElement('button');
        let favImage = document.createElement('img');
        if (personnage['estFav'] === 0) {
            favImage.src = '../../../assets/not-fav.png';
        } else {
            favImage.src = '../../../assets/fav.png';
        }
        favImage.alt = 'Fav Icon';
        favImage.classList.add('fav-icon');
        favButton.appendChild(favImage);
        
        favButton.addEventListener('click', async function() {
            console.log('~ Click on fav button... ~ Change fav status... ~');
            if (personnage['estFav'] === 0) {
                personnage['estFav'] = 1;
                favImage.src = '../../../assets/fav.png';
            } else {
                personnage['estFav'] = 0;
                favImage.src = '../../../assets/not-fav.png';
            }
            console.log('~ Click on fav button... ~ Preparing modify button and datas... ~');
            await fetch(`/personnages/${personnage['id']}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(personnage)
            });
        });
        
        detailContainer.appendChild(favButton);
        
        let nom = document.createElement('h2');
        nom.textContent = 'Nom: ' + personnage['nom_prenom'];
        detailContainer.appendChild(nom);
        let race = document.createElement('p');
        race.textContent = 'Race: ' + personnage['race'];
        detailContainer.appendChild(race);
        let agilite = document.createElement('p');
        agilite.textContent = 'Agilité: ' + personnage['agilite'];
        detailContainer.appendChild(agilite);
        let force = document.createElement('p');
        force.textContent = 'Force: ' + personnage['force'];
        detailContainer.appendChild(force);
        let intelligence = document.createElement('p');
        intelligence.textContent = 'Intelligence: ' + personnage['intelligence'];
        detailContainer.appendChild(intelligence);
        
        if (personnage['capacite'].length > 0) {
            let capacite = document.createElement('p');
            capacite.textContent = 'Capacités:';
            detailContainer.appendChild(capacite);
    
            let capaciteList = document.createElement('ul');
            personnage['capacite'].forEach(cap => {
                let capaciteItem = document.createElement('li');
                capaciteItem.textContent = cap;
                capaciteList.appendChild(capaciteItem);
            });
            detailContainer.appendChild(capaciteList);
        }
    
        if (personnage['equipements'].length > 0) {
            let equipements = document.createElement('p');
            equipements.textContent = 'Équipements:';
            detailContainer.appendChild(equipements);
    
            let equipementsList = document.createElement('ul');
            personnage['equipements'].forEach(equip => {
                let equipItem = document.createElement('li');
                equipItem.textContent = equip;
                equipementsList.appendChild(equipItem);
            });
            detailContainer.appendChild(equipementsList);
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
        detailContainer.appendChild(evaluationContainer);
        Rendering.renderVisible(detailContainer);
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