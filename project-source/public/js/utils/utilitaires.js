export default class Utilitaires { 

    static currentPage = 1;
    static perPage = 3;

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