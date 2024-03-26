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
    "/personnages" : GetFactory,
    "/personnages/" : AboutFactory,
    "/personnages?" : FilterFactory,
    "/personnages?_sort" : FilterFactory,
    "/personnages?_page" : FilterFactory,
    "/personnages/post" : CreateFactory,
    "/personnages/put" : ModifyFactory,
    "/personnages/delete" : DeleteFactory,
    "/equipements" : GetFactory,
    "/capacites" : GetFactory,
}


// Me permet de remplir le cache et de charger les données avant n'importe quelle requête ==> on prédit le clique souris sur "Voir les villes"
const rep = await fetch('/personnages');
var cache = rep.json();
console.log(cache);

// Me permet de stocker la taille initiale des données
const datasLenght = Object.keys(cache).length;

async function routes(url, id) {
    if (url in route) {
        let object = new route[url](url) // optimise le switch case, avec le dico, on créer dans tous les cas l'objet dès le début sans condition de test
        switch (url) {
            case "/personnages":
                cache = await object.recupDatasInArray();
                Rendering.renderHideCreatedInput();
                RenderingPersonnage.renderDisplayPersonnages(cache);
                break;
            
            case "/personnages/":
                cache = await object.recupPersonnagesInArray(id);
                RenderingPersonnage.RenderDisplayDetailPersonnage(cache);
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
            
            case "/equipements":
                cache = await object.recupDatasInArray();
                Rendering.renderHideCreatedInput();
                RenderingEquipements.renderDisplayEquipements(cache);
                break;

            case "/capacites":
                cache = await object.recupDatasInArray();
                Rendering.renderHideCreatedInput();
                RenderingCapacites.renderDisplayCapacites(cache);
                break;

            default:
                break;
        }
    }
}

let buttonVoirPersonnages = document.getElementById('voir-personnages');
buttonVoirPersonnages.addEventListener('click', async function(e) {
    console.log('~ Click on personnages button... ~ Loading and fetch datas... ~');
    let url = '/personnages';
    await routes(url, null);
});

let buttonVoirCapacties = document.getElementById('voir-capacites');
buttonVoirCapacties.addEventListener('click', async function(e) {
    console.log('~ Click on capacités button... ~ Loading and fetch datas... ~');
    let url = '/capacites';
    await routes(url, null);
});

let buttonVoirEquipements = document.getElementById('voir-equipements');
buttonVoirEquipements.addEventListener('click', async function(e) {
    console.log('~ Click on équipements button... ~ Loading and fetch datas... ~');
    let url = '/equipements';
    await routes(url, null);
});

let buttonHidePersonnages = document.getElementById('cacher-personnages');
buttonHidePersonnages.addEventListener('click', function(e) {
    RenderingPersonnage.renderHidePersonnages();
});

let buttonHideCapacites = document.getElementById('cacher-capacites');
buttonHideCapacites.addEventListener('click', function(e) {
    RenderingCapacites.renderHideCapacites();
});

let buttonHideEquipements = document.getElementById('cacher-equipements');
buttonHideEquipements.addEventListener('click', function(e) {
    RenderingEquipements.renderHideEquipements();
});

let buttonSearch = document.getElementById('search-button');
buttonSearch.addEventListener('click', async function(e) {
    console.log('~ Click on search button... ~ Loading and fetch datas by filters... ~');
    let url = '/personnages?';
    await routes(url, null);
});

let buttonSort = document.getElementById('sort-button');
buttonSort.addEventListener('click', async function(e) {
    console.log('~ Click on sort button... ~ Loading and fetch datas by sorted columns... ~');
    let url = '/personnages?_sort';
    await routes(url, null);
});

let buttonManageFav = document.getElementById('manage-fav-button');
buttonManageFav.addEventListener('click', async function(e) {
    console.log('~ Click on manage fav button... ~ Loading and fetch datas... ~');
    let url = '/personnages?estFav=1';
    const rep = await fetch(url);
    var cache = await rep.json();
    RenderingFav.renderDisplayFav(cache);
});

Rendering.createInputsFilters(Utils.inputsMap);
Rendering.createInputSelect(Utils.inputsMap);
Rendering.createInputsCreate(Utils.inputMapCreating);

export default routes;