class GetFactory {

    #datasFetched = null;
    #url = null;

    constructor(url) {
        console.log('Creating GetFactory Oject first... with URL :' + url)
        this.#url = url;
    }

    getDatasFetched() {
        return this.#datasFetched;
    }

    getURL() {
        return this.#url;
    }

    setDatasFetched(datasFetched) {
        this.#datasFetched = datasFetched;
    }

    setURL(url) {
        this.#url = url;
    }

    async fetchDatas() {
        const rep = await fetch(this.getURL());
        return await rep.json();
    }

    async recupDatasInArray() {
        console.log('Recup referentials datas...')
        this.setDatasFetched(await this.fetchDatas());
        return this.getDatasFetched();
    }
}

export default GetFactory;