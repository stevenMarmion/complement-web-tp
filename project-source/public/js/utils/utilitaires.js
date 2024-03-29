export default class Utilitaires { 

    static currentPage = 1;
    static perPage = 10;

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

    // Me permet de définir mes champs de création d'un personnage au préalable
    static inputMapCreating = {
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