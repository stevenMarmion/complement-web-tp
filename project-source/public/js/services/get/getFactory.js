import RenderingCapacites from "../../vues/capacites_page/rendering_capacites";
import RenderingEquipements from "../../vues/equipements_page/rendering_equipements";
import RenderingPersonnage from "../../vues/personnages_page/rendering_personnage";
import Rendering from "../../vues/rendering";

class GetFactory {

    #datasFetched = null;
    #url = null;

    constructor(url) {
        console.log('Creating GetFactory Oject first... with URL :' + url.split('/')[1])
        this.#url = url.split('/')[1];
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
        console.log('Setting URL GetFactory Oject... with URL :' + url);
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

    render() {
        Rendering.renderHideCreatedInput();
        switch(this.getURL()) {
            case 'personnages':
                RenderingPersonnage.renderDisplayPersonnages(this.getDatasFetched());
                break;
        
            case 'equipements':
                RenderingEquipements.renderDisplayEquipements(this.getDatasFetched());
                break;

            case 'capacites':
                RenderingCapacites.renderHideCapacites(this.getDatasFetched());
                break;
        }
    }
}

export default GetFactory;