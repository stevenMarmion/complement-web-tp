import RenderingCapacites from "../vues/rendering_capacites.js";
import RenderingEquipements from "../vues/rendering_equipements.js";
import RenderingFav from "../vues/rendering_fav.js";
import RenderingPersonnage from "../vues/rendering_personnage.js";

class GetFactory {

    #datasFetched = null;
    #url = null;
    #ENDPOINTFAVORIS = 'personnages?estFav=1'

    constructor(url) {
        const urlDecomposition = url.split('/')[1];
        urlDecomposition != 'favoris' ?
            this.#url = urlDecomposition : 
            this.#url = this.#ENDPOINTFAVORIS;
        console.log('Creating GetFactory Oject first... with URL :' + this.#url);
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

    async recupDatasInArray(id) {
        console.log('Recup referentials datas...')
        this.setDatasFetched(await this.fetchDatas());
        return this.getDatasFetched();
    }

    render() {
        switch(this.getURL()) {
            case 'personnages':
                RenderingPersonnage.renderDisplayPersonnages(this.getDatasFetched());
                break;
        
            case 'equipements':
                RenderingEquipements.renderDisplayEquipements(this.getDatasFetched());
                break;

            case 'capacites':
                RenderingCapacites.renderDisplayCapacites(this.getDatasFetched());
                break;

            case this.#ENDPOINTFAVORIS:
                RenderingFav.renderDisplayFav(this.getDatasFetched());
                break;
        }
    }
}

export default GetFactory;