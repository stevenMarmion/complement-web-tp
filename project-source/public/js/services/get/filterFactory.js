class FilterFactory {

    #personnages = null;
    #url = null;
    #filters = {};
    ENDPOINTS_FAV = 'personnages?estFav=1';
    ENDPOINTS_SORT = 'personnages?_sort';
    ENDPOINTS_PAGE = 'personnages?_page';

    constructor(url) {
        console.log('Creating FilterFactory Oject first... with URL :' + url);
        url == '#/favoris' ? this.#url = this.ENDPOINTS_FAV : url == 'personnages?_sort' ? ;
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
        console.log('Setting URL FilterFactory Oject... with URL :' + url);
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

    async recupDatasInArray(id) {
        console.log('Recup personnage datas on personnage by filters : \n' + this.#url)
        this.setPersonnages(await this.fetchPersonnages());
        return this.getPersonnages();
    }
}

export default FilterFactory;