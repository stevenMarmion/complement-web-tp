class FilterFactory {

    static filters = {};
    ENDPOINTS_SORT = 'personnages?_sort';
    ENDPOINTS_PAGE = 'personnages?_page';

    static getFiltersOn(url) {
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

    static getSortOn(url) {
        let sortedColumns = document.getElementById('input-select-sorted-columns').value;
        if (sortedColumns !== null && sortedColumns !== "" && sortedColumns !== undefined) {
            url += '=' + sortedColumns;
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
}

export default FilterFactory;