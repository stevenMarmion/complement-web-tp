import routes from '../../script.js';

class RenderingFav {

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

export default RenderingFav;