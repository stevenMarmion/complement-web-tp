import routes from '../../script.js';

class RenderingCapacites {

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
}

export default RenderingCapacites;