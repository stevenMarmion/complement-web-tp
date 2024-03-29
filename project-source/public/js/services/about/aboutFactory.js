import RenderingEquipements from "../../vues/equipements_page/rendering_equipements.js";
import RenderingPersonnage from "../../vues/personnages_page/rendering_personnage.js";
import Rendering from "../../vues/rendering.js";

class AboutFactory {

    #datasAbout = null;
    #url = null;
    #subject = null;

    constructor(url) {
        const decomposition = url.split('/');
        console.log(decomposition)
        console.log('Creating AboutFactory Oject first... with URL :' + `${decomposition[1]}/${decomposition[2]}`)
        this.#url = decomposition[1];
        this.#subject = decomposition[1];
    }

    getDatasAbout() {
        return this.#datasAbout;
    }

    getURL() {
        return this.#url;
    }

    getSubject() {
        return this.#subject;
    }

    setDatasAbout(personnages) {
        this.#datasAbout = personnages;
    }

    setURL(url) {
        console.log('Setting URL AboutFactory Oject... with URL :' + url);
        this.#url = url;
    }

    async fetchPersonnages() {
        const rep = await fetch(this.getURL());
        return await rep.json();
    }

    async recupDatasInArray(id) {
        this.setURL(this.getURL() + '/' + id);
        console.log('Recup datas about by filters : \n' + this.getURL())
        this.setDatasAbout(await this.fetchPersonnages());
        return this.getDatasAbout();
    }

    render() {
        Rendering.renderHideCreatedInput();
        switch(this.getSubject()) {
            case "personnages":
                RenderingPersonnage.RenderDisplayDetailPersonnage(this.getDatasAbout());
                break;

            case "equipements":
                RenderingEquipements.renderDisplayDetailEquipements(this.getDatasAbout());
                break;
        }
    }
}

export default AboutFactory;