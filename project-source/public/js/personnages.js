class Personnages {

    #personnages = null;
    #url = null;

    constructor(url) {
        console.log('Creating Personnages Oject first... with URL :' + url)
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

    async fetchPersonnages() {
        const rep = await fetch(this.getURL());
        return await rep.json();
    }

    async recupPersonnagesInArray() {
        console.log('Recup personnages datas...')
        this.setPersonnages(await this.fetchPersonnages());
        return this.getPersonnages();
    }
}

export default Personnages;