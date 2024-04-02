class Rendering {

    static createInputSelect(inputsMap) {
        let inputContainer = document.getElementById('select-sorted-columns');
        let selectElement = document.createElement('select');
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
            inputElement.setAttribute('placeholder', input.placeholder);
            divElement.appendChild(inputElement);
        });
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