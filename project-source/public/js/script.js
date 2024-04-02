/* pré-requis : lancer le script bash : 
*  ```bash lancement.sh```
*/
import AboutFactory from "./services/aboutFactory.js";
import GetFactory from "./services/getFactory.js";
import FilterFactory from "./services/filterFactory.js";
import Rendering from "./vues/rendering.js";
import Utilitaires from './utils/utilitaires.js';
import UrlParser from "./utils/url.js";
import Erreur_404 from "./vues/rendering_404.js";
import Home from "./vues/rendering_home.js";


Rendering.createInputsFilters(Utilitaires.inputsMap);
Rendering.createInputSelect(Utilitaires.inputsMap);
Utilitaires.datasPages();

// ====================== [ ROUTAGE ] ====================== 

const route = {
    "#/home": Home,
    "#/personnages" : FilterFactory,
    "#/capacites" : GetFactory,
    "#/equipements" : GetFactory,
    "#/personnages/detail" : AboutFactory,
    "#/equipements/detail" : AboutFactory,
    "#/favoris" : GetFactory,
}

async function routes(url, id) {
    if (id!=null) {
        const decomposition = UrlParser.decomposeURLwithParam();
        url = decomposition[0];
        id = decomposition[1];
    }
    if (url in route) {
        if (url == "#/home") {
            Home.render();
        } else {
            let object = new route[url](url)
            await object.recupDatasInArray(id);
            object.render();
        }
    } else {
        Erreur_404.render();
    }
}

UrlParser.makeRedirectionHome();

// ====================== [ EVENTS ] ====================== 

let previous_page = document.getElementById('previous-page');
let next_page = document.getElementById('next-page');
previous_page.addEventListener('click', async () => await pagination('previous'));
next_page.addEventListener('click', async () => await pagination('next'));

async function pagination(next_or_previous) {
    let object = new FilterFactory('');
    await object.actionPaginationValide(next_or_previous);
    object.render();
}

addEventListener('hashchange', async function() {
    UrlParser.makeRedirectionHome();
    await routes(location.hash, UrlParser.checkParamOnUrl());
});