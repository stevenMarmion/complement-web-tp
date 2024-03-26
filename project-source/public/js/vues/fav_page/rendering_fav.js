import routes from '../../script.js';
import Rendering from '../rendering.js';

class RenderingFav {

    static renderDisplayFav(personnages) {
        document.querySelectorAll('.isVisible').forEach(element => {
            Rendering.renderHidden(element);
        });

        let buttonAccueil = document.getElementById('go-to-home');
        let detailContainer = document.getElementById('personnages-description');

        buttonAccueil.addEventListener('click', async function() {
            console.log('~ Click on Home button... ~ Go to home... ~');
            let url = '/personnages';
            await routes(url, null);
        });
        
        Rendering.renderVisible(buttonAccueil);
        Rendering.renderEmpty(detailContainer);

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
            detailContainer.appendChild(card);
        });
    }
}

export default RenderingFav;