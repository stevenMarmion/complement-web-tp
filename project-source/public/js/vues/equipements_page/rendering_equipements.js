import routes from '../../script.js';

class RenderingEquipements {

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
        document.querySelectorAll('#all-filters input[type="text"]').forEach(element => { 
            element.classList.remove('isVisible');
            element.classList.add('isHidden');
        });
        document.querySelectorAll('select').forEach(element => { 
            element.classList.remove('isVisible');
            element.classList.add('isHidden');
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
        document.querySelectorAll('#all-filters input[type="text"]').forEach(element => { 
            element.classList.remove('isHidden');
            element.classList.add('isVisible');
        });
        document.querySelectorAll('select').forEach(element => { 
            element.classList.remove('isHidden');
            element.classList.add('isVisible');
        });
    }

    static renderDisplayDetailEquipements(equipement) {
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
        let detailContainer = document.getElementById('detail-equipement');
        detailContainer.innerHTML = "";
        detailContainer.classList.add('card');
        detailContainer.classList.add('isVisible');
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
        detailContainer.classList.remove('isHidden');
    }

}

export default RenderingEquipements;