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
import RenderingCapacites from "./vues/capacites_page/rendering_capacites.js";
import RenderingEquipements from "./vues/equipements_page/rendering_equipements.js";
import RenderingFav from "./vues/fav_page/rendering_fav.js";
import RenderingPersonnage from "./vues/personnages_page/rendering_personnage.js";

import Utils from './utils/inputs.js';

const route = {
    "#/home": GetFactory,
    "#/personnages" : GetFactory,
    "#/capacites" : GetFactory,
    "#/equipements" : GetFactory,
    "#/personnages/detail" : AboutFactory,
    "#/equipements/detail" : AboutFactory,
    "#/personnages/favoris" : GetFactory,

    "/personnages?" : FilterFactory,
    "/personnages?_sort" : FilterFactory,
    "/personnages?_page" : FilterFactory,
    "/personnages/post" : CreateFactory,
    "/personnages/put" : ModifyFactory,
    "/personnages/delete" : DeleteFactory,
}


// Me permet de remplir le cache et de charger les données avant n'importe quelle requête ==> on prédit le clique souris sur "Voir les villes"
const rep = await fetch('/personnages');
var cache = rep.json();
console.log(cache);

// Me permet de stocker la taille initiale des données
const datasLenght = Object.keys(cache).length;

async function routes(url, id) {
    if (id!=null) {
        const decomposition = decomposeURLwithParam(url);
        url = decomposition[0];
        id = decomposition[1];
    }
    if (url in route) {
        let object = new route[url](url) // optimise le switch case, avec le dico, on créer dans tous les cas l'objet dès le début sans condition de test
        switch (url) {
            case "#/home":
                RenderingPersonnage.renderHidePersonnages();
                RenderingCapacites.renderHideCapacites();
                RenderingEquipements.renderHideEquipements();
                break;

            case "#/personnages":
                cache = await object.recupDatasInArray();
                Rendering.renderHideCreatedInput();
                RenderingPersonnage.renderDisplayPersonnages(cache);
                break;

            case "#/equipements":
                cache = await object.recupDatasInArray(id);
                RenderingEquipements.renderDisplayEquipements(cache);
                break;

            case "#/capacites":
                cache = await object.recupDatasInArray();
                Rendering.renderHideCreatedInput();
                RenderingCapacites.renderDisplayCapacites(cache);
                break;
            
            case "#/personnages/detail":
                cache = await object.recupDatasAboutInArray(id);
                RenderingPersonnage.RenderDisplayDetailPersonnage(cache);
                break;

            case "#/equipements/detail":
                cache = await object.recupDatasAboutInArray(id);
                RenderingEquipements.renderDisplayDetailEquipements(cache);
                break;
        
            case "#/personnages/favoris":
                object.setURL('/personnages?estFav=1');
                cache = await object.recupDatasInArray();
                RenderingFav.renderDisplayFav(cache);
                break;
            
            case "/personnages?_sort":
                object.getSortOn();
                cache = await object.recupPersonnagesInArray();
                Rendering.renderHideCreatedInput();
                RenderingPersonnage.renderDisplayPersonnages(cache);
                break;

            case "/personnages?_page":
                currentPage = object.actionPaginationValide(currentPage, perPage, id);
                object.getDatasByPage(currentPage, perPage);
                cache = await object.recupPersonnagesInArray();
                Rendering.renderHideCreatedInput();
                RenderingPersonnage.renderDisplayPersonnages(cache.data);
                break;

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
    await routes(url, null);
});

Rendering.createInputsFilters(Utils.inputsMap);
Rendering.createInputSelect(Utils.inputsMap);
Rendering.createInputsCreate(Utils.inputMapCreating);

let selectSort = document.querySelector('#input-select-sorted-columns');
selectSort.addEventListener('change', async function(e) {
    console.log('~ Click on sort button... ~ Loading and fetch datas by sorted columns... ~');
    let url = '/personnages?_sort';
    await routes(url, null);
});

window.addEventListener('hashchange', async function() {
    makeRedirectionHome();
    await routes(window.location.hash, checkParamOnUrl());
});

function checkParamOnUrl() {
    const decomposition = window.location.hash.split('/');
    if (decomposition.length === 4) {
        return decomposition[3];
    }
    return null;
}

function decomposeURLwithParam(URL) {
    const decomposition = window.location.hash.split('/');
    return [
        `${decomposition[0]}/${decomposition[1]}/${decomposition[2]}`,
        decomposition[3]
    ];
}

function makeRedirectionHome() {
    window.location.hash == "" ? window.location.hash = "#/home" : null;
}
makeRedirectionHome();

export default routes;