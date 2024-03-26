class CreateFactory {

    #url = null;

    constructor(url) {
        this.#url = url;
    }

    getURL() {
        return this.#url;
    }

    setURL(url) {
        this.#url = url;
    }

    async postPersonnage(data) {
        if (Object.keys(data).length !== 11) {
            // signifie que tous les champs ne sont pas remplis car il en faut 11
            throw new Error("Datas provided are not fully completed...")
        }
        this.setURL("/personnages");
        return await fetch(this.getURL(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    recupValuesOnInputs() {
        let inputsCreate = document.querySelectorAll('#create-personnage input[type="text"]');
        var data = {};
        inputsCreate.forEach(input => {
            data[input.id] = input.value
        });
        return data;
    }
}

export default CreateFactory;
