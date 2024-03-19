import { routes, inputMapCreating } from "./script.js";

class Rendering {

    static renderHidePersonnages() {
        // pour celle-ci, on cache tout
        let personnagesContainer = document.getElementById('personnages-description');
        personnagesContainer.innerHTML = "";
        document.getElementById('voir-personnages').classList.remove('isHidden');
        document.getElementById('voir-personnages').classList.add('isVisible');
        document.getElementById('cacher-personnages').classList.remove('isVisible');
        document.getElementById('cacher-personnages').classList.add('isHidden');
        document.getElementById('title-filters').classList.remove('isVisible');
        document.getElementById('title-filters').classList.add('isHidden');
        document.getElementById('search-button').classList.remove('isVisible');
        document.getElementById('search-button').classList.add('isHidden');
        document.getElementById('title-sort').classList.remove('isVisible');
        document.getElementById('title-sort').classList.add('isHidden');
        document.getElementById('sort-button').classList.remove('isVisible');
        document.getElementById('sort-button').classList.add('isHidden');

        document.querySelectorAll('#all-filters input[type="text"]').forEach(element => { 
            // permet de sélectionner tous les inputs des filtres
            element.classList.remove('isVisible');
            element.classList.add('isHidden');
        });

        document.querySelectorAll('select').forEach(element => { 
            // permet de sélectionner tous les select de ma page ( il y en a qu'un seul dans ma page )
            element.classList.remove('isVisible');
            element.classList.add('isHidden');
        });
    }

    static renderDisplayPersonnages(headingTable, personnages) {
        // pour la fonction, on va créer un tableau de données
        let personnagesContainer = document.getElementById('personnages-description');
        personnagesContainer.innerHTML = "";
        let table = document.createElement('table');
        table.classList.add('personnage-table');
        let ligneNomColonne = table.insertRow();
        for (let nomenclatureColonne in headingTable) {
            let nomColonne = document.createElement('th');
            nomColonne.textContent = headingTable[nomenclatureColonne];
            ligneNomColonne.appendChild(nomColonne);
        }
        personnages.forEach(personnage => {
            let ligneDonnees = table.insertRow();
            for (let donneVille in personnage) {
                let donnees = ligneDonnees.insertCell();
                donnees.textContent = personnage[donneVille];
            }
            let celluleImages = ligneDonnees.insertCell();
            let divImgActions = document.createElement('div');
            divImgActions.classList.add('isFlexed');

            let buttonPen = document.createElement('button');
            let buttonTrash = document.createElement('button');
            buttonPen.setAttribute('id', `modify-${personnage["id"]}`);;
            buttonTrash.setAttribute('id', `delete-${personnage["id"]}`);
            let pen = document.createElement('img');
            let trash = document.createElement('img');
            pen.src = './assets/pen.png';
            trash.src = './assets/trash.png';

            buttonPen.appendChild(pen);
            buttonTrash.appendChild(trash);
            buttonPen.addEventListener('click', async function() {
                Rendering.displayPopupModify(personnage);
            });
            buttonTrash.addEventListener('click', async function() {
                console.log('~ Click on delete personnage button... ~ Preparing deletion... ~');
                let url = '/personnages/delete';
                await routes(url, `${personnage["id"]}`);
            });
            divImgActions.appendChild(buttonPen);
            divImgActions.appendChild(buttonTrash);

            celluleImages.appendChild(divImgActions);
        });
        personnagesContainer.appendChild(table);

        document.getElementById('voir-personnages').classList.remove('isVisible');
        document.getElementById('voir-personnages').classList.add('isHidden');
        document.getElementById('cacher-personnages').classList.remove('isHidden');
        document.getElementById('cacher-personnages').classList.add('isVisible');
        document.getElementById('title-filters').classList.remove('isHidden');
        document.getElementById('title-filters').classList.add('isVisible');
        document.getElementById('search-button').classList.remove('isHidden');
        document.getElementById('search-button').classList.add('isVisible');
        document.getElementById('title-sort').classList.remove('isHidden');
        document.getElementById('title-sort').classList.add('isVisible');
        document.getElementById('sort-button').classList.remove('isHidden');
        document.getElementById('sort-button').classList.add('isVisible');

        document.querySelectorAll('#all-filters input[type="text"]').forEach(element => { 
            // permet de sélectionner tous les champs de filtre
            element.classList.remove('isHidden');
            element.classList.add('isVisible');
        });

        document.querySelectorAll('select').forEach(element => { 
            // permet de sélectionner tous les select de ma page ( il y en a qu'un )
            element.classList.remove('isHidden');
            element.classList.add('isVisible');
        });
    }

    static renderShowCreatedInput() {
        document.getElementById('validate-creation').classList.remove('isHidden')
        document.getElementById('validate-creation').classList.add('isVisible')
        document.getElementById('create-personnage-button').classList.remove('isVisible');
        document.getElementById('create-personnage-button').classList.add('isHidden');
        document.querySelectorAll('#create-personnage input[type="text"]').forEach(element => { 
            element.classList.remove('isHidden');
            element.classList.add('isVisible');
        });
    }

    static renderHideCreatedInput() {
        document.getElementById('validate-creation').classList.remove('isVisible')
        document.getElementById('validate-creation').classList.add('isHidden')
        document.getElementById('create-personnage-button').classList.remove('isHidden');
        document.getElementById('create-personnage-button').classList.add('isVisible');
        document.querySelectorAll('#create-personnage input[type="text"]').forEach(element => { 
            element.classList.remove('isVisible');
            element.classList.add('isHidden');
        });
    }

    static createInputSelect(inputsMap) {
        let inputContainer = document.getElementById('select-sorted-columns');
        let selectElement = document.createElement('select');
        selectElement.classList.add('isHidden');
        selectElement.classList.add('custom-select');
        selectElement.id = 'input-select-sorted-columns';

        let defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Sélectionnez une colonne';
        defaultOption.selected = true;
        selectElement.appendChild(defaultOption);

        Object.keys(inputsMap).forEach(key => {
            let input = inputsMap[key];
            let optionElement = document.createElement('option');
            optionElement.value = input.id;
            optionElement.textContent = input.placeholder;
            selectElement.appendChild(optionElement);
        });
        inputContainer.appendChild(selectElement);
    }

    static createInputsFilters(inputsMap) {
        let divElement = document.getElementById('all-filters');
        Object.keys(inputsMap).forEach(key => {
            let input = inputsMap[key];
            let inputElement = document.createElement('input');
            inputElement.setAttribute('type', 'text');
            inputElement.setAttribute('id', input.id);
            inputElement.classList.add('isHidden');
            inputElement.setAttribute('placeholder', input.placeholder);
            divElement.appendChild(inputElement);
        });
    }

    static createInputsCreate(inputsMap) {
        let divElement = document.getElementById('create-personnage');
        Object.keys(inputsMap).forEach(key => {
            let input = inputsMap[key];
            let inputElement = document.createElement('input');
            inputElement.setAttribute('type', 'text');
            inputElement.setAttribute('id', input.id);
            inputElement.classList.add('isHidden');
            inputElement.setAttribute('placeholder', input.placeholder);
            divElement.appendChild(inputElement);
        });
    }

    static makeCreatedPersonnageInputsEmpty() {
        document.querySelectorAll('#create-personnage input[type="text"]').forEach(element => { 
            element.innerHTML = "";
        });
    }

    static displayPopupModify(data) {
        let divElement = document.getElementById('modify-personnage');
        divElement.innerHTML = "";
        Object.keys(inputMapCreating).forEach(key => {
            let input = inputMapCreating[key];
            let inputElement = document.createElement('input');
            inputElement.setAttribute('type', 'text');
            inputElement.setAttribute('id', input.id);
            inputElement.classList.remove('isHidden');
            inputElement.classList.add('isVisible');
            inputElement.setAttribute('value', data[key]);
            divElement.appendChild(inputElement);
        });
        document.getElementById('close-popup').style.display = 'block';
        document.getElementById('validate-editing').style.display = 'block';
        document.getElementById('modal').style.display = 'block';
    }

    static renderHidePopupModify() {
        document.getElementById('close-popup').style.display = 'none';
        document.getElementById('validate-editing').style.display = 'none';
        document.getElementById('modal').style.display = 'none';
    }
}

export default Rendering;