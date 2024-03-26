class AboutFactory {

    #datasAbout = null;
    #url = null;

    constructor(url) {
        console.log('Creating AboutFactory Oject first... with URL :' + url)
        this.#url = url;
    }

    getDatasAbout() {
        return this.#datasAbout;
    }

    getURL() {
        return this.#url;
    }

    setDatasAbout(personnages) {
        this.#datasAbout = personnages;
    }

    setURL(url, id) {
        this.#url = url + id;
    }

    async fetchPersonnages() {
        const rep = await fetch(this.getURL());
        return await rep.json();
    }

    async recupDatasAboutInArray(id) {
        this.setURL(this.getURL(), id);
        console.log('Recup personnage datas on personnage by filters : \n' + this.getURL())
        this.setDatasAbout(await this.fetchPersonnages());
        return this.getDatasAbout();
    }
}

export default AboutFactory;