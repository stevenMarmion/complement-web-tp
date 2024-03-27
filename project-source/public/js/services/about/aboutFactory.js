class AboutFactory {

    #datasAbout = null;
    #url = null;

    constructor(url) {
        const decomposition = url.split('/');
        console.log(decomposition)
        console.log('Creating AboutFactory Oject first... with URL :' + `${decomposition[1]}/${decomposition[2]}`)
        this.#url = `${decomposition[1]}/`;
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
        console.log('Setting URL AboutFactory Oject... with URL :' + url);
        this.#url = url + id;
    }

    async fetchPersonnages() {
        const rep = await fetch(this.getURL());
        return await rep.json();
    }

    async recupDatasAboutInArray(id) {
        this.setURL(this.getURL(), id);
        console.log('Recup datas about by filters : \n' + this.getURL())
        this.setDatasAbout(await this.fetchPersonnages());
        return this.getDatasAbout();
    }
}

export default AboutFactory;