class AboutFactory {

    #personnages = null;
    #url = null;

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

    setURL(url, id) {
        this.#url = url + id;
    }

    async fetchPersonnages() {
        const rep = await fetch(this.getURL());
        return await rep.json();
    }

    async recupPersonnagesInArray(id) {
        this.setURL(this.getURL(), id);
        console.log('Recup personnage datas on personnage by filters : \n' + this.getURL())
        this.setPersonnages(await this.fetchPersonnages());
        return this.getPersonnages();
    }
}

export default AboutFactory;