/* pré-requis : lancer le script bash : 
*  ```bash lancement.sh```
*/

import Capacites from "./capacites.js";
import Equipements from "./equipements.js";
import Personnages from "./personnages.js";
import AboutFactory from "./aboutFactory.js";
import CreateFactory from "./createFactory.js";
import ModifyFactory from "./modifyFactory.js";
import DeleteFactory from "./deleteFactory.js";
import GetFactory from "./getFactory.js";
import Rendering from "./rendering.js";

const route = {
    "/personnages" : GetFactory,
    "/personnages?" : AboutFactory,
    "/personnages?_sort" : AboutFactory,
    "/personnages?_page" : AboutFactory,
    "/personnages/post" : CreateFactory,
    "/personnages/put" : ModifyFactory,
    "/personnages/delete" : DeleteFactory,
    "/equipements" : GetFactory,
    "/capacites" : GetFactory,
}

// Nous permet de définir la nomenclature de mes colonnes de tableau
const headingTable = [
    "Id",
    "Code ville",
    "Code zip",
    "Nom de ville",
    "Latitude",
    "Longitude",
    "Nom de département",
    "Numéro de département",
    "Nom de région",
    "Nom de région (GeoJson)",
    "Actions"
]

// Me permet de définir au préalable mes champs de filtres sur ma page
// A completer
const inputsMap = {
    'insee_code': { 
        id: 'insee_code', 
        placeholder: 'Code INSEE' 
    },
    'zip_code': { 
        id: 'zip_code', 
        placeholder: 'Code zip' 
    },
    'label': { 
        id: 'label', 
        placeholder: 'Nom de ville' 
    },
    'department_name': { 
        id: 'department_name', 
        placeholder: 'Nom de département' 
    },
    'department_number': { 
        id: 'department_number', 
        placeholder: 'Numéro de département' 
    },
    'region_name': { 
        id: 'region_name', 
        placeholder: 'Nom de région' 
    }
};

// Me permet de définir mes champs de création d'un personnage au préalable
const inputMapCreating = {
    'insee_code': { 
        id: 'insee_code', 
        placeholder: 'Code INSEE' 
    },
    'city_code': { 
        id: 'city_code', 
        placeholder: 'Code de ville' 
    },
    'zip_code': { 
        id: 'zip_code', 
        placeholder: 'Code zip' 
    },
    'label': { 
        id: 'label', 
        placeholder: 'Nom de ville' 
    },
    'latitude': { 
        id: 'latitude', 
        placeholder: 'Latitude' 
    },
    'longitude': { 
        id: 'longitude', 
        placeholder: 'Longitude' 
    },
    'department_name': { 
        id: 'department_name', 
        placeholder: 'Nom de département' 
    },
    'department_number': { 
        id: 'department_number', 
        placeholder: 'Numéro de département' 
    },
    'region_name': { 
        id: 'region_name', 
        placeholder: 'Nom de région' 
    },
    'region_geojson_name': { 
        id: 'region_geojson_name', 
        placeholder: 'Nom de région (GeoJSON)' 
    },
    'id': {
        id: 'id', 
        placeholder: 'ID' 
    },
};

async function routes(url, id) {
    if (url in route) {
        let object = new route[url](url) // optimise le switch case, avec le dico, on créer dans tous les cas l'objet dès le début sans condition de test
        switch (url) {
            case "/personnages":
                cache = await object.recupPersonnagesInArray();
                Rendering.renderHideCreatedInput();
                Rendering.renderDisplayPersonnages(headingTable, cache);
                break;
            
            case "/personnages?":
                object.getFiltersOn();
                cache = await object.recupPersonnagesInArray();
                Rendering.renderHideCreatedInput();
                Rendering.renderDisplayPersonnages(headingTable, cache);
                break;
            
            case "/personnages?_sort":
                object.getSortOn();
                cache = await object.recupPersonnagesInArray();
                Rendering.renderHideCreatedInput();
                Rendering.renderDisplayPersonnages(headingTable, cache);
                break;

            case "/personnages?_page":
                currentPage = object.actionPaginationValide(currentPage, perPage, id);
                object.getDatasByPage(currentPage, perPage);
                cache = await object.recupPersonnagesInArray();
                Rendering.renderHideCreatedInput();
                Rendering.renderDisplayPersonnages(headingTable, cache.data);
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
                cache = await object.recupPersonnagesInArray();
                Rendering.renderHideCreatedInput();
                Rendering.renderDisplayPersonnages(headingTable, cache);
                break;

            case "/capacites":
                cache = await object.recupPersonnagesInArray();
                Rendering.renderHideCreatedInput();
                Rendering.renderDisplayPersonnages(headingTable, cache);
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

let buttonHidePersonnages = document.getElementById('cacher-personnages');
buttonHidePersonnages.addEventListener('click', function(e) {
    Rendering.renderHidePersonnages();
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

Rendering.createInputsFilters(inputsMap);
Rendering.createInputSelect(inputsMap);
Rendering.createInputsCreate(inputMapCreating);

export { routes, inputMapCreating };