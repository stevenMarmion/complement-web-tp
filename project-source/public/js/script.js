/* pré-requis : lancer le script bash : 
*  ```bash lancement.sh```
*/
import AboutFactory from "./services/about/aboutFactory.js";
import CreateFactory from "./services/post/createFactory.js";
import ModifyFactory from "./services/put/modifyFactory.js";
import DeleteFactory from "./services/delete/deleteFactory.js";
import GetFactory from "./services/get/getFactory.js";
import FilterFactory from "./services/get/filterFactory.js";

import Rendering from "./vues/rendering.js";
import RenderingPersonnage from "./vues/personnages_page/rendering_personnage.js";

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

    "/personnages?_page" : FilterFactory,
    "/personnages/post" : CreateFactory,
    "/personnages/put" : ModifyFactory,
    "/personnages/delete" : DeleteFactory,
}

Rendering.createInputsFilters(Utilitaires.inputsMap);
Rendering.createInputSelect(Utilitaires.inputsMap);
Rendering.createInputsCreate(Utilitaires.inputMapCreating);
UrlParser.makeRedirectionHome();

// Me permet de remplir le cache et de charger les données avant n'importe quelle requête ==> on prédit le clique souris sur "Voir les villes"
const rep = await fetch('/personnages');
var cache = rep.json();
console.log(cache);

// Me permet de stocker la taille initiale des données
const datasLenght = Object.keys(cache).length;

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
        switch (url) {

            case "/personnages/post":
                let data = object.recupValuesOnInputs();
                const responseCreation = await object.postPersonnage(data);
                if (responseCreation.status == 200) {
                    Rendering.makeCreatedPersonnageInputsEmpty();
                    await routes("/personnages", null);
                }
                break;

            case "/personnages/put":
                let dataToModify = object.recupValuesOnInputs();
                const responseModify = await object.putPersonnage(id, dataToModify);
                if (responseModify.status == 200) {
                    Rendering.makeCreatedPersonnageInputsEmpty();
                    await routes("/personnages", null);
                }
                break;

            case "/personnages/delete":
                const responseDelete = await object.deletePersonnage(id);
                if (responseDelete.status == 200) {
                    await routes("/personnages", null);
                }
                break;

            default:
                break;
        }
    }
}

let buttonSearch = document.getElementById('search-button');
buttonSearch.addEventListener('click', async function(e) {
    console.log('~ Click on search button... ~ Loading and fetch datas by filters... ~');
    let url = '/personnages?';
    url = FilterFactory.getFiltersOn(url);
    cache = await FilterFactory.recupSortedDatas(url);
    Rendering.renderHideCreatedInput();
    RenderingPersonnage.renderDisplayPersonnages(cache);
});

let selectSort = document.querySelector('#input-select-sorted-columns');
selectSort.addEventListener('change', async function(e) {
    console.log('~ Click on sort button... ~ Loading and fetch datas by sorted columns... ~');
    let url = '/personnages?_sort';
    url = FilterFactory.getSortOn(url);
    cache = await FilterFactory.recupSortedDatas(url);
    Rendering.renderHideCreatedInput();
    RenderingPersonnage.renderDisplayPersonnages(cache);
});


// let buttonPage = document.getElementById('#buttonPage');
// buttonPage.addEventListener('click', async function(e) {
//     let url = '/personnages?_page';
//     currentPage = FilterFactory.actionPaginationValide(Utilitaires.currentPage, Utilitaires.perPage, id);
//     FilterFactory.getDatasByPage(Utilitaires.currentPage, Utilitaires.perPage);
//     cache = await FilterFactory.recupSortedDatas(url);
//     Rendering.renderHideCreatedInput();
//     RenderingPersonnage.renderDisplayPersonnages(cache.data);
// });

window.addEventListener('hashchange', async function() {
    UrlParser.makeRedirectionHome();
    await routes(window.location.hash, UrlParser.checkParamOnUrl());
});

export default routes;