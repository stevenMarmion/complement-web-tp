class AboutFactory {

    #personnages = null;
    #url = null;
    #filters = {};

    constructor(url) {
        console.log('Creating AboutFactory Oject first... with URL :' + url)
        this.#url = url;
    }

    getPersonnages() {
        return this.#personnages;
    }

    getURL() {
        return this.#url;
    }

    setPersonnages(personnages) {
        this.#personnages = personnages;
    }

    setURL(url) {
        this.#url = url;
    }

    getFiltersOn() {
        let inputs = document.querySelectorAll('#all-filters input[type="text"]');
        inputs.forEach(input => {
            if (input.value !== null && input.value !== "" && input.value !== undefined) {
                this.#filters[input.id] = input.value;
                if (Object.keys(this.#filters).length == 1) {
                    this.#url += input.id + '=' + input.value;
                } else {
                    this.#url += '&' + input.id + '=' + input.value;
                }
            }
        });
    }

    getSortOn() {
        let sortedColumns = document.getElementById('input-select-sorted-columns').value;
        if (sortedColumns !== null && sortedColumns !== "" && sortedColumns !== undefined) {
            this.#url += '=' + sortedColumns;
        }
    }

    async fetchPersonnages() {
        const rep = await fetch(this.#url);
        return await rep.json();
    }

    async recupPersonnagesInArray() {
        console.log('Recup personnage datas on personnage by filters : \n' + this.#url)
        this.setPersonnages(await this.fetchPersonnages());
        return this.getPersonnages();
    }
}

export default AboutFactory;