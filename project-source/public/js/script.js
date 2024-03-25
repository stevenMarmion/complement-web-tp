/* pré-requis : lancer le script bash : 
*  ```bash lancement.sh```
*/
import AboutFactory from "./aboutFactory.js";
import CreateFactory from "./createFactory.js";
import ModifyFactory from "./modifyFactory.js";
import DeleteFactory from "./deleteFactory.js";
import GetFactory from "./getFactory.js";
import Rendering from "./rendering.js";
import FilterFactory from "./filterFactory.js";

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

// Me permet de définir au préalable mes champs de filtres sur ma page
const inputsMap = {
    'nom_prenom': { 
        id: 'nom_prenom', 
        placeholder: 'Nom et prénom' 
    },
    'race': { 
        id: 'race', 
        placeholder: 'Race' 
    },
    'force': { 
        id: 'force', 
        placeholder: 'Force' 
    },
    'intelligence': { 
        id: 'intelligence', 
        placeholder: 'Intelligence' 
    },
    'agilite': { 
        id: 'agilite', 
        placeholder: 'Agilité' 
    }
};

// Me permet de définir mes champs de création d'un personnage au préalable
const inputMapCreating = {
    'nom_prenom': { 
        id: 'nom_prenom', 
        placeholder: 'Nom et prénom' 
    },
    'race': { 
        id: 'race', 
        placeholder: 'Race' 
    },
    'force': { 
        id: 'force', 
        placeholder: 'Force' 
    },
    'intelligence': { 
        id: 'intelligence', 
        placeholder: 'Intelligence' 
    },
    'agilite': { 
        id: 'agilite', 
        placeholder: 'Agilité' 
    }
};


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
                Rendering.renderDisplayPersonnages(cache);
                break;
            
            case "/personnages/":
                cache = await object.recupPersonnagesInArray(id);
                console.log(cache);
                Rendering.RenderDisplayDetailPersonnage(cache);
                break;
            
            case "/personnages?_sort":
                object.getSortOn();
                cache = await object.recupPersonnagesInArray();
                Rendering.renderHideCreatedInput();
                Rendering.renderDisplayPersonnages(cache);
                break;

            case "/personnages?_page":
                currentPage = object.actionPaginationValide(currentPage, perPage, id);
                object.getDatasByPage(currentPage, perPage);
                cache = await object.recupPersonnagesInArray();
                Rendering.renderHideCreatedInput();
                Rendering.renderDisplayPersonnages(cache.data);
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
                Rendering.renderDisplayPersonnages(cache);
                break;

            case "/capacites":
                cache = await object.recupDatasInArray();
                Rendering.renderHideCreatedInput();
                Rendering.renderDisplayPersonnages(cache);
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