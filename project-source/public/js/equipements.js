class Equipements {

    #equipements = null;
    #url = null;

    constructor(url) {
        console.log('Creating Equipements Oject first... with URL :' + url)
        this.#url = url;
    }

    getEquipements() {
        return this.#equipements;
    }

    getURL() {
        return this.#url;
    }

    setEquipements(equipements) {
        this.#equipements = equipements;
    }

    setURL(url) {
        this.#url = url;
    }

    async fetchEquipements() {
        const rep = await fetch(this.getURL());
        return await rep.json();
    }

    async recupEquipementsInArray() {
        console.log('Recup equipements datas...')
        this.setEquipements(await this.fetchEquipements());
        return this.getEquipements();
    }
}

export default Equipements;