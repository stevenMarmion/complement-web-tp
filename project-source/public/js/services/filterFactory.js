import Utilitaires from "../utils/utilitaires.js";
import RenderingPersonnage from "../vues/rendering_personnage.js";

class FilterFactory {

    filters = {};
    sortedColumns = null;
    #url = ''
    #datasFetched = null;

    constructor(url) {
        console.log('Creating FilterFactory Oject first... with URL :' + url);
        this.setInitialURL();
        this.actionPaginationValide('');
    }

    setInitialURL() {
        this.#url = '/personnages?';
    }

    getDatasFetched() {
        return this.#datasFetched;
    }

    setDatasFetched(datasFetched) {
        this.#datasFetched = datasFetched;
    }

    getFiltersOn() {
        let inputs = document.querySelectorAll('#all-filters input[type="text"]');
        inputs.forEach(input => {
            console.log(input.value)
            if (input.value !== null && input.value !== "" && input.value !== undefined) {
                this.filters[input.id] = input.value;
                this.#url += '&' + input.id + '=' + input.value;
            }
        });
        console.log('New URL on by parsing and filtered inputs : ' + this.#url);
        return this.#url;
    }

    getSortOn() {
        let sortedColumns = document.getElementById('input-select-sorted-columns').value;
        if (sortedColumns !== null && sortedColumns !== "" && sortedColumns !== undefined) {
            this.#url += '&_sort=';
            this.sortedColumns = sortedColumns;
            this.#url += sortedColumns;
        } else {
            this.sortedColumns = null;
        }
        return this.#url;
    }

    async fetchDatas(url) {
        const rep = await fetch(url);
        return await rep.json();
    }

    async recupDatasInArray(id) {
        console.log('Recup personnages datas by filters : \n' + id);
        this.setDatasFetched(await this.fetchDatas(this.#url));
        return this.getDatasFetched();
    }

    async actionPaginationValide(next_or_previous) {
        this.setInitialURL();
        next_or_previous === 'next' && Utilitaires.currentPage < Utilitaires.totalPages ? Utilitaires.currentPage+=1 : null;
        next_or_previous === 'previous' && Utilitaires.currentPage > 1 ? Utilitaires.currentPage-=1 : null;
        this.#url += `_start=${((Utilitaires.perPage * Utilitaires.currentPage) - Utilitaires.perPage)}&_limit=${Utilitaires.perPage}`;
        this.getFiltersOn();
        this.getSortOn();
        const json = await this.recupDatasInArray(this.#url);
        localStorage.setItem('content', JSON.stringify(json));
        const data = JSON.parse(localStorage.getItem('content'));
        this.setDatasFetched(data);
    }

    render() {
        RenderingPersonnage.renderDisplayPersonnages(this.getDatasFetched());
    }
}

export default FilterFactory;