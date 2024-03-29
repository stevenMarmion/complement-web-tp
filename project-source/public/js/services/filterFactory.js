import Utilitaires from "../utils/utilitaires.js";

class FilterFactory {

    static filters = {};

    static getFiltersOn() {
        let url = '/personnages?';
        let inputs = document.querySelectorAll('#all-filters input[type="text"]');
        inputs.forEach(input => {
            console.log(input.value)
            if (input.value !== null && input.value !== "" && input.value !== undefined) {
                FilterFactory.filters[input.id] = input.value;
                if (Object.keys(FilterFactory.filters).length == 1) {
                    url += input.id + '=' + input.value;
                } else {
                    url += '&' + input.id + '=' + input.value;
                }
            }
        });
        console.log('New URL on by parsing and filtered inputs : ' + url);
        return url;
    }

    static getSortOn() {
        let url = '/personnages?_sort=';
        let sortedColumns = document.getElementById('input-select-sorted-columns').value;
        if (sortedColumns !== null && sortedColumns !== "" && sortedColumns !== undefined) {
            url += sortedColumns;
        }
        return url;
    }

    static async fetchDatas(url) {
        const rep = await fetch(url);
        return await rep.json();
    }

    static async recupSortedDatas(url) {
        console.log('Recup personnage datas on personnage by filters : \n' + url);
        return await FilterFactory.fetchDatas(url);
    }

    static async actionPaginationValide(next_or_previous) {
        let url = `/personnages?_page=${Utilitaires.currentPage}&_per_page=${Utilitaires.perPage}`;
        const json = await FilterFactory.recupSortedDatas(url);
        localStorage.setItem('content', JSON.stringify(json));
        const data = JSON.parse(localStorage.getItem('content'));
        //console.log(data)
        next_or_previous === 'next' && data.next != null ? Utilitaires.currentPage = data.next : null;
        next_or_previous === 'previous' && data.prev != null ? Utilitaires.currentPage = data.prev : null;
        return data.data;
    }
}

export default FilterFactory;