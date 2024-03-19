class DeleteFactory {

    #url = null;

    constructor(url) {
        console.log('Creating DeleteFactory Oject first... with URL :' + url)
        this.#url = url;
    }

    getURL() {
        return this.#url;
    }

    setURL(url) {
        this.#url = url;
    }

    async deletePersonnage(id) {
        this.setURL(`/personnages/${id}`);
        return await fetch(this.getURL(), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: id
        });
    }
}

export default DeleteFactory