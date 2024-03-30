export default class Utilitaires { 

    static currentPage = 1;
    static perPage = 4;
    static totalPages = 0;

    static datasPages = async () => {
        await fetch(`personnages?_page=${this.currentPage}&_per_page=${this.perPage}`)
            .then(async response => {
                const json = await response.json();
                this.totalPages = json.pages;
            }).catch(error => {
                console.log(error);
            })
    };

    // Me permet de définir au préalable mes champs de filtres sur ma page
    static inputsMap = {
        'nom_prenom': { 
            id: 'nom_prenom', 
            placeholder: 'Nom et prénom' 
        },
        'race': { 
            id: 'race', 
            placeholder: 'Race' 
        },
        'force': { 
            id: 'force', 
            placeholder: 'Force' 
        },
        'intelligence': { 
            id: 'intelligence', 
            placeholder: 'Intelligence' 
        },
        'agilite': { 
            id: 'agilite', 
            placeholder: 'Agilité' 
        }
    };
}