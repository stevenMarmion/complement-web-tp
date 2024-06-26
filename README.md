# TP NOTE COMPLEMENT WEB

## branche

- develop

## Membres

- MARMION Steven
- SIMON Gael

## Sujet

Afin de nous apporter une culture sans faille sur les personnages de jeux vidéos ou de jeux de rôle, nous vous demandons de bien vouloir développer une application de 
gestion de ce type de personnages. Ces bonshommes pourraient évoluer selon certains critères et posséder certains équipements disponibles également dans l’application.

## Contraintes

- Utilisation de json-serv : <https://github.com/typicode/json-server>
- Plusieurs vues : 
  - Listing
  - Détail données avec :
    - Mise en favoris
    - Notation
  - Gestion des favoris
- Pagination
- JSON relationnel avec des relations diverses et variées
- Développement SPA ( Single Page Application )
- Organisation sous module
- POO

## Evolutions possible

- Outil de recherche
- Système de notation (stockage dans le JSON)
- Système de favoris client (local data storage)
- Gestion des images (lazy loading) ==> Afficher l'image ssi la page est actuellement scroller sur la ou les image(s)

## Lancement

- Aller dans le dossier project-source
- Exécuter cette commande :
  ```bash
  bash json-serv.sh
  ```
- Si jamais npm ou json-serv pose problème, merci de vous tourner vers cette URL : <https://github.com/typicode/json-server>
