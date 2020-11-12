# Application TODO

Cette application est le rendu d'un TP noté suivant les consignes suivantes :
- Réalisez une application web mono-page à l’aide du framework React permettant de créer plusieurs listes.
- On doit pouvoir créer plusieurs tâches dans chacune des listes et mettre à jour les informations (titre/nom) d’une liste ou d’une tâche donnée.
- On souhaite également pouvoir supprimer une liste ou une tâche donnée.
- Bien entendu, pour qu’une ToDo List soit valable, on doit pouvoir mettre à jour facilement le statut d’une tâche (réalisé ou non)
- Faites en sorte d’afficher un suivi des tâches réalisées (avec un compteur, par exemple)

# Démarrer le projet

Dans le répertoire du projet :

## Lancement en mode développement : 

Lancez la commande `npm start`
Rendez-vous à l'adresse [http://localhost:3000](http://localhost:3000)

## Lancement en mode production avec Docker

Je vous propose les commandes suivantes, n'hésitez à les modifier selon vos préférences : 

### Construction de l'image
`docker build -t todoimage/todoproject:latest .`

### Démarrage de l'image
docker run -d -p 8080:3000 todoimage/todoproject

Avec la commande ci-dessus, rendez-vous à l'adresse [http://localhost:8080](http://localhost:8080)
