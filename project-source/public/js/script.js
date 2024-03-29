/* pré-requis : lancer le script bash : 
*  ```bash lancement.sh```
*/
import AboutFactory from "./services/aboutFactory.js";
import GetFactory from "./services/getFactory.js";
import FilterFactory from "./services/filterFactory.js";
import Rendering from "./vues/rendering.js";
import RenderingPersonnage from "./vues/rendering_personnage.js";
import Utilitaires from './utils/utilitaires.js';
import UrlParser from "./utils/url.js";

const route = {
    "#/home": GetFactory,
    "#/personnages" : GetFactory,
    "#/capacites" : GetFactory,
    "#/equipements" : GetFactory,
    "#/personnages/detail" : AboutFactory,
    "#/equipements/detail" : AboutFactory,
    "#/favoris" : GetFactory,
}

Rendering.createInputsFilters(Utilitaires.inputsMap);
Rendering.createInputSelect(Utilitaires.inputsMap);
UrlParser.makeRedirectionHome();

async function routes(url, id) {
    if (id!=null) {
        const decomposition = UrlParser.decomposeURLwithParam();
        url = decomposition[0];
        id = decomposition[1];
    }
    if (url in route) {
        let object = new route[url](url) // optimise le switch case, avec le dico, on créer dans tous les cas l'objet dès le début sans condition de test
        await object.recupDatasInArray(id);
        object.render();
    }
}

let buttonSearch = document.getElementById('search-button');
buttonSearch.addEventListener('click', async function(e) {
    console.log('~ Click on search button... ~ Loading and fetch datas by filters... ~');
    let url = FilterFactory.getFiltersOn();
    localStorage.setItem('content', JSON.stringify(await FilterFactory.recupSortedDatas(url)));
    RenderingPersonnage.renderDisplayPersonnages(JSON.parse(localStorage.getItem('content')));
});

let selectSort = document.querySelector('#input-select-sorted-columns');
selectSort.addEventListener('change', async function(e) {
    console.log('~ Click on sort button... ~ Loading and fetch datas by sorted columns... ~');
    let url = FilterFactory.getSortOn();
    localStorage.setItem('content', JSON.stringify(await FilterFactory.recupSortedDatas(url)));
    RenderingPersonnage.renderDisplayPersonnages(JSON.parse(localStorage.getItem('content')));
});


let previous_page = document.getElementById('previous-page');
let next_page = document.getElementById('next-page');
previous_page.addEventListener('click', () => pagination('previous'));
next_page.addEventListener('click', () => pagination('next'));

async function pagination(next_or_previous) {
    const data = await FilterFactory.actionPaginationValide(next_or_previous);
    RenderingPersonnage.renderDisplayPersonnages(data);
}

addEventListener('hashchange', async function() {
    UrlParser.makeRedirectionHome();
    await routes(location.hash, UrlParser.checkParamOnUrl());
});

export default routes;