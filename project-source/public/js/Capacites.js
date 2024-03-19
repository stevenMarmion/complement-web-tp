class Capacites {

    #capacites = null;
    #url = null;

    constructor(url) {
        console.log('Creating Capacites Oject first... with URL :' + url)
        this.#url = url;
    }

    getCapacites() {
        return this.#capacites;
    }

    getURL() {
        return this.#url;
    }

    setCapacites(capacites) {
        this.#capacites = capacites;
    }

    setURL(url) {
        this.#url = url;
    }

    async fetchCapacites() {
        const rep = await fetch(this.getURL());
        return await rep.json();
    }

    async recupCapacitesInArray() {
        console.log('Recup capacites datas...')
        this.setCapacites(await this.fetchCapacites());
        return this.getCapacites();
    }
}

export default Capacites;