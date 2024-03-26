import inputMapCreating from '../utils/inputs.js';

class Rendering {
    
    static renderShowCreatedInput() {
        document.getElementById('validate-creation').classList.remove('isHidden')
        document.getElementById('validate-creation').classList.add('isVisible')
        document.getElementById('create-personnage-button').classList.remove('isVisible');
        document.getElementById('create-personnage-button').classList.add('isHidden');
        document.querySelectorAll('#create-personnage input[type="text"]').forEach(element => { 
            Rendering.renderVisible(element);
        });
    }

    static renderHideCreatedInput() {
        document.getElementById('validate-creation').classList.remove('isVisible')
        document.getElementById('validate-creation').classList.add('isHidden')
        document.getElementById('create-personnage-button').classList.remove('isHidden');
        document.getElementById('create-personnage-button').classList.add('isVisible');
        document.querySelectorAll('#create-personnage input[type="text"]').forEach(element => { 
            Rendering.renderHidden(element);
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
            Rendering.renderEmpty(element);
        });
    }

    static displayPopupModify(data) {
        let divElement = document.getElementById('modify-personnage');
        Rendering.renderEmpty(divElement);
        Object.keys(inputMapCreating).forEach(key => {
            let input = inputMapCreating[key];
            let inputElement = document.createElement('input');
            inputElement.setAttribute('type', 'text');
            inputElement.setAttribute('id', input.id);
            Rendering.renderVisible(inputElement);
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

    static renderHidden(component) {
        component.classList.remove('isVisible');
        component.classList.add('isHidden');
    }

    static renderVisible(component) {
        component.classList.remove('isHidden');
        component.classList.add('isVisible');
    }

    static renderEmpty(component) {
        component.innerHTML = "";
    }
}

export default Rendering;