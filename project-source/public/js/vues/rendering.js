import { routes, inputMapCreating } from "../script.js";

class Rendering {

    static renderHidePersonnages() {
        let personnagesContainer = document.getElementById('personnages-description');
        personnagesContainer.innerHTML = "";
        document.getElementById('voir-personnages').classList.remove('isHidden');
        document.getElementById('voir-personnages').classList.add('isVisible');
        document.getElementById('cacher-personnages').classList.remove('isVisible');
        document.getElementById('cacher-personnages').classList.add('isHidden');
        document.getElementById('title-filters').classList.remove('isVisible');
        document.getElementById('title-filters').classList.add('isHidden');
        document.getElementById('search-button').classList.remove('isVisible');
        document.getElementById('search-button').classList.add('isHidden');
        document.getElementById('title-sort').classList.remove('isVisible');
        document.getElementById('title-sort').classList.add('isHidden');
        document.getElementById('sort-button').classList.remove('isVisible');
        document.getElementById('sort-button').classList.add('isHidden');
        document.querySelectorAll('#all-filters input[type="text"]').forEach(element => { 
            element.classList.remove('isVisible');
            element.classList.add('isHidden');
        });
        document.querySelectorAll('select').forEach(element => { 
            element.classList.remove('isVisible');
            element.classList.add('isHidden');
        });
    }

    static renderHideCapacites() {
        let capacitesContainer = document.getElementById('capacites-description');
        capacitesContainer.innerHTML = "";
        document.getElementById('voir-capacites').classList.remove('isHidden');
        document.getElementById('voir-capacites').classList.add('isVisible');
        document.getElementById('cacher-capacites').classList.remove('isVisible');
        document.getElementById('cacher-capacites').classList.add('isHidden');
        document.getElementById('title-filters').classList.remove('isVisible');
        document.getElementById('title-filters').classList.add('isHidden');
        document.getElementById('search-button').classList.remove('isVisible');
        document.getElementById('search-button').classList.add('isHidden');
        document.getElementById('title-sort').classList.remove('isVisible');
        document.getElementById('title-sort').classList.add('isHidden');
        document.getElementById('sort-button').classList.remove('isVisible');
        document.getElementById('sort-button').classList.add('isHidden');
        document.querySelectorAll('#all-filters input[type="text"]').forEach(element => { 
            element.classList.remove('isVisible');
            element.classList.add('isHidden');
        });
        document.querySelectorAll('select').forEach(element => { 
            element.classList.remove('isVisible');
            element.classList.add('isHidden');
        });
    }

    static renderHideEquipements() {
        let equipementsContainer = document.getElementById('equipements-description');
        equipementsContainer.innerHTML = "";
        document.getElementById('voir-equipements').classList.remove('isHidden');
        document.getElementById('voir-equipements').classList.add('isVisible');
        document.getElementById('cacher-equipements').classList.remove('isVisible');
        document.getElementById('cacher-equipements').classList.add('isHidden');
        document.getElementById('title-filters').classList.remove('isVisible');
        document.getElementById('title-filters').classList.add('isHidden');
        document.getElementById('search-button').classList.remove('isVisible');
        document.getElementById('search-button').classList.add('isHidden');
        document.getElementById('title-sort').classList.remove('isVisible');
        document.getElementById('title-sort').classList.add('isHidden');
        document.getElementById('sort-button').classList.remove('isVisible');
        document.getElementById('sort-button').classList.add('isHidden');
        document.querySelectorAll('#all-filters input[type="text"]').forEach(element => { 
            element.classList.remove('isVisible');
            element.classList.add('isHidden');
        });
        document.querySelectorAll('select').forEach(element => { 
            element.classList.remove('isVisible');
            element.classList.add('isHidden');
        });
    }

    static renderDisplayCapacites(capacites) {
        let personnagesContainer = document.getElementById('personnages-description');
        personnagesContainer.innerHTML = "";
        let capacitesContainer = document.getElementById('capacites-description');
        capacitesContainer.innerHTML = "";
        capacites.forEach(capacite => {
            let card = document.createElement('div');
            card.classList.add('card');
            card.classList.add('isVisible');
            let nom = document.createElement('h2');
            nom.textContent = capacite['nom'];
            card.appendChild(nom);
            let descr = document.createElement('p');
            descr.textContent = 'Description: ' + capacite['description'];
            card.appendChild(descr);
            let detailButton = document.createElement('button');
            detailButton.textContent = 'Détail';
            detailButton.classList.add('button-primary')
            detailButton.addEventListener('click', async function() {
                console.log('~ Click on detail button... ~ Preparing datas... ~');
                let url = '/capacites/';
                await routes(url, `${capacite["id"]}`);
            });
            card.appendChild(detailButton);
            capacitesContainer.appendChild(card);
        });
        document.getElementById('voir-capacites').classList.remove('isVisible');
        document.getElementById('voir-capacites').classList.add('isHidden');
        document.getElementById('cacher-capacites').classList.remove('isHidden');
        document.getElementById('cacher-capacites').classList.add('isVisible');
        document.getElementById('title-filters').classList.remove('isHidden');
        document.getElementById('title-filters').classList.add('isVisible');
        document.getElementById('search-button').classList.remove('isHidden');
        document.getElementById('search-button').classList.add('isVisible');
        document.getElementById('title-sort').classList.remove('isHidden');
        document.getElementById('title-sort').classList.add('isVisible');
        document.getElementById('sort-button').classList.remove('isHidden');
        document.getElementById('sort-button').classList.add('isVisible');
        document.querySelectorAll('#all-filters input[type="text"]').forEach(element => { 
            element.classList.remove('isHidden');
            element.classList.add('isVisible');
        });
        document.querySelectorAll('select').forEach(element => { 
            element.classList.remove('isHidden');
            element.classList.add('isVisible');
        });
    }

    static renderDisplayEquipements(equipements) {
        let personnagesContainer = document.getElementById('personnages-description');
        personnagesContainer.innerHTML = "";
        let capacitesContainer = document.getElementById('capacites-description');
        capacitesContainer.innerHTML = "";
        let equipementsContainer = document.getElementById('equipements-description');
        equipementsContainer.innerHTML = "";
        equipements.forEach(equipement => {
            let card = document.createElement('div');
            card.classList.add('card');
            card.classList.add('isVisible');
            let nom = document.createElement('h2');
            nom.textContent = equipement['nom'];
            card.appendChild(nom);
            let descr = document.createElement('p');
            descr.textContent = 'Description: ' + equipement['description'];
            card.appendChild(descr);
            let prerequis = document.createElement('p');
            prerequis.textContent = 'Prérequis: Force - ' + equipement['prerequis_force'] + ', Intelligence - ' + equipement['prerequis_intelligence'] + ', Agilité - ' + equipement['prerequis_agilite'];
            card.appendChild(prerequis);
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
        document.getElementById('voir-equipements').classList.remove('isVisible');
        document.getElementById('voir-equipements').classList.add('isHidden');
        document.getElementById('cacher-equipements').classList.remove('isHidden');
        document.getElementById('cacher-equipements').classList.add('isVisible');
        document.getElementById('title-filters').classList.remove('isHidden');
        document.getElementById('title-filters').classList.add('isVisible');
        document.getElementById('search-button').classList.remove('isHidden');
        document.getElementById('search-button').classList.add('isVisible');
        document.getElementById('title-sort').classList.remove('isHidden');
        document.getElementById('title-sort').classList.add('isVisible');
        document.getElementById('sort-button').classList.remove('isHidden');
        document.getElementById('sort-button').classList.add('isVisible');
        document.querySelectorAll('#all-filters input[type="text"]').forEach(element => { 
            element.classList.remove('isHidden');
            element.classList.add('isVisible');
        });
        document.querySelectorAll('select').forEach(element => { 
            element.classList.remove('isHidden');
            element.classList.add('isVisible');
        });
    }

    static renderDisplayPersonnages(personnages) {
        let buttonAccueil = document.getElementById('go-to-home');
        buttonAccueil.classList.remove('isVisible');
        buttonAccueil.classList.add('isHidden');
        let detailPerso = document.getElementById('detail-personnage');
        detailPerso.classList.remove('isVisible');
        detailPerso.classList.add('isHidden');
        let manageFav = document.getElementById('manage-fav-button');
        manageFav.classList.remove('isHidden');
        manageFav.classList.add('isVisible');
        let capacitesContainer = document.getElementById('capacites-description');
        capacitesContainer.innerHTML = "";
        document.getElementById('voir-capacites').classList.remove('isHidden');
        document.getElementById('voir-capacites').classList.add('isVisible');
        let equipementsContainer = document.getElementById('equipements-description');
        equipementsContainer.innerHTML = "";
        document.getElementById('voir-equipements').classList.remove('isHidden');
        document.getElementById('voir-equipements').classList.add('isVisible');
        let personnagesContainer = document.getElementById('personnages-description');
        personnagesContainer.innerHTML = "";
        personnages.forEach(personnage => {
            let card = document.createElement('div');
            card.classList.add('card');
            card.classList.add('isVisible');
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
        document.getElementById('voir-personnages').classList.remove('isVisible');
        document.getElementById('voir-personnages').classList.add('isHidden');
        document.getElementById('cacher-personnages').classList.remove('isHidden');
        document.getElementById('cacher-personnages').classList.add('isVisible');
        document.getElementById('title-filters').classList.remove('isHidden');
        document.getElementById('title-filters').classList.add('isVisible');
        document.getElementById('search-button').classList.remove('isHidden');
        document.getElementById('search-button').classList.add('isVisible');
        document.getElementById('title-sort').classList.remove('isHidden');
        document.getElementById('title-sort').classList.add('isVisible');
        document.getElementById('sort-button').classList.remove('isHidden');
        document.getElementById('sort-button').classList.add('isVisible');
        document.querySelectorAll('#all-filters input[type="text"]').forEach(element => { 
            element.classList.remove('isHidden');
            element.classList.add('isVisible');
        });
        document.querySelectorAll('select').forEach(element => { 
            element.classList.remove('isHidden');
            element.classList.add('isVisible');
        });
    }    
    
    static RenderDisplayDetailPersonnage(personnage) {
        document.querySelectorAll('.isVisible').forEach(element => {
            element.classList.remove('isVisible');
            element.classList.add('isHidden');
        });
        
        let buttonAccueil = document.getElementById('go-to-home');
        buttonAccueil.classList.remove('isHidden');
        buttonAccueil.addEventListener('click', async function() {
            console.log('~ Click on Home button... ~ Go to home... ~');
            let url = '/personnages';
            await routes(url, null);
        });
        buttonAccueil.classList.add('isVisible');
        let detailContainer = document.getElementById('detail-personnage');
        detailContainer.innerHTML = "";
        detailContainer.classList.add('card');
        detailContainer.classList.add('isVisible');
        let favButton = document.createElement('button');
        let favImage = document.createElement('img');
        if (personnage['estFav'] === 0) {
            favImage.src = '../assets/not-fav.png';
        } else {
            favImage.src = '../assets/fav.png';
        }
        favImage.alt = 'Fav Icon';
        favImage.classList.add('fav-icon');
        favButton.appendChild(favImage);
        
        favButton.addEventListener('click', async function() {
            console.log('~ Click on fav button... ~ Change fav status... ~');
            if (personnage['estFav'] === 0) {
                personnage['estFav'] = 1;
                favImage.src = '../assets/fav.png';
            } else {
                personnage['estFav'] = 0;
                favImage.src = '../assets/not-fav.png';
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
                Rendering.updateStarImages(personnage['note']);
            });
            let starImage = document.createElement('img');
            i <= personnage['note'] ? starImage.src = '../assets/star-yellow.png' : starImage.src = '../assets/star.png';
            starImage.alt = 'Star Icon';
            starImage.classList.add('star-icon');
            starButton.appendChild(starImage);
            evaluationContainer.appendChild(starButton);
        }
        detailContainer.appendChild(evaluationContainer);
        detailContainer.classList.remove('isHidden');
    }

    static updateStarImages(note) {
        let starButtons = document.querySelectorAll('.evaluation-container button');
        starButtons.forEach((button, index) => {
            let starImage = button.querySelector('img');
            if (index < note) {
                starImage.src = '../assets/star-yellow.png';
            } else {
                starImage.src = '../assets/star.png';
            }
        });
    }
    
    static renderShowCreatedInput() {
        document.getElementById('validate-creation').classList.remove('isHidden')
        document.getElementById('validate-creation').classList.add('isVisible')
        document.getElementById('create-personnage-button').classList.remove('isVisible');
        document.getElementById('create-personnage-button').classList.add('isHidden');
        document.querySelectorAll('#create-personnage input[type="text"]').forEach(element => { 
            element.classList.remove('isHidden');
            element.classList.add('isVisible');
        });
    }

    static renderHideCreatedInput() {
        document.getElementById('validate-creation').classList.remove('isVisible')
        document.getElementById('validate-creation').classList.add('isHidden')
        document.getElementById('create-personnage-button').classList.remove('isHidden');
        document.getElementById('create-personnage-button').classList.add('isVisible');
        document.querySelectorAll('#create-personnage input[type="text"]').forEach(element => { 
            element.classList.remove('isVisible');
            element.classList.add('isHidden');
        });
    }

    static createInputSelect(inputsMap) {
        let inputContainer = document.getElementById('select-sorted-columns');
        let selectElement = document.createElement('select');
        selectElement.classList.add('isHidden');
        selectElement.classList.add('custom-select');
        selectElement.id = 'input-select-sorted-columns';

        let defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Sélectionnez une colonne';
        defaultOption.selected = true;
        selectElement.appendChild(defaultOption);

        Object.keys(inputsMap).forEach(key => {
            let input = inputsMap[key];
            let optionElement = document.createElement('option');
            optionElement.value = input.id;
            optionElement.textContent = input.placeholder;
            selectElement.appendChild(optionElement);
        });
        inputContainer.appendChild(selectElement);
    }

    static createInputsFilters(inputsMap) {
        let divElement = document.getElementById('all-filters');
        Object.keys(inputsMap).forEach(key => {
            let input = inputsMap[key];
            let inputElement = document.createElement('input');
            inputElement.setAttribute('type', 'text');
            inputElement.setAttribute('id', input.id);
            inputElement.classList.add('isHidden');
            inputElement.setAttribute('placeholder', input.placeholder);
            divElement.appendChild(inputElement);
        });
    }

    static createInputsCreate(inputsMap) {
        let divElement = document.getElementById('create-personnage');
        Object.keys(inputsMap).forEach(key => {
            let input = inputsMap[key];
            let inputElement = document.createElement('input');
            inputElement.setAttribute('type', 'text');
            inputElement.setAttribute('id', input.id);
            inputElement.classList.add('isHidden');
            inputElement.setAttribute('placeholder', input.placeholder);
            divElement.appendChild(inputElement);
        });
    }

    static makeCreatedPersonnageInputsEmpty() {
        document.querySelectorAll('#create-personnage input[type="text"]').forEach(element => { 
            element.innerHTML = "";
        });
    }

    static displayPopupModify(data) {
        let divElement = document.getElementById('modify-personnage');
        divElement.innerHTML = "";
        Object.keys(inputMapCreating).forEach(key => {
            let input = inputMapCreating[key];
            let inputElement = document.createElement('input');
            inputElement.setAttribute('type', 'text');
            inputElement.setAttribute('id', input.id);
            inputElement.classList.remove('isHidden');
            inputElement.classList.add('isVisible');
            inputElement.setAttribute('value', data[key]);
            divElement.appendChild(inputElement);
        });
        document.getElementById('close-popup').style.display = 'block';
        document.getElementById('validate-editing').style.display = 'block';
        document.getElementById('modal').style.display = 'block';
    }

    static renderHidePopupModify() {
        document.getElementById('close-popup').style.display = 'none';
        document.getElementById('validate-editing').style.display = 'none';
        document.getElementById('modal').style.display = 'none';
    }

    static renderDisplayFav(personnages) {
        document.querySelectorAll('.isVisible').forEach(element => {
            element.classList.remove('isVisible');
            element.classList.add('isHidden');
        });
        let buttonAccueil = document.getElementById('go-to-home');
        buttonAccueil.classList.remove('isHidden');
        buttonAccueil.addEventListener('click', async function() {
            console.log('~ Click on Home button... ~ Go to home... ~');
            let url = '/personnages';
            await routes(url, null);
        });
        buttonAccueil.classList.add('isVisible');
        let detailContainer = document.getElementById('personnages-description');
        detailContainer.innerHTML = "";
        personnages.forEach(personnage => {
            let card = document.createElement('div');
            card.classList.add('card');
            card.classList.add('isVisible');
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
            detailContainer.appendChild(card);
        });
    }
}

export default Rendering;