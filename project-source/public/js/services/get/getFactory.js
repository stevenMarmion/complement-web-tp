import RenderingCapacites from "../../vues/capacites_page/rendering_capacites.js";
import RenderingEquipements from "../../vues/equipements_page/rendering_equipements.js";
import RenderingFav from "../../vues/fav_page/rendering_fav.js";
import RenderingPersonnage from "../../vues/personnages_page/rendering_personnage.js";
import Rendering from "../../vues/rendering.js";

class GetFactory {

    #datasFetched = null;
    #url = null;
    #endPointFavoris = 'personnages?estFav=1'

    constructor(url) {
        const urlDecomposition = url.split('/')[1];
        urlDecomposition != 'favoris' ?
            this.#url = urlDecomposition : 
            this.#url = this.#endPointFavoris;
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
        Rendering.renderHideCreatedInput();
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

            case 'personnages?estFav=1':
                RenderingFav.renderDisplayFav(this.getDatasFetched());
                break;
        }
    }
}

export default GetFactory;