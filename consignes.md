# CalorieCounter
Créer un projet avec vite (typescript / react)
Créer une page unique (App.tsx)
Faire 3 section (chaque section est composant):
- Zone avec le bilan des calories (calcul du total)
- Zone avec un formulaire pour inscrire un apport ou une consommation (Log) de calorie (intitulé et une quantité de calories)
- Zone avec la liste des apports / consommation de calories.

Les 3 composants ne prennent pas de props.
Utiliser un contexte pour partager les infos entre les composants.

# SUITE #
- Créer un back-end NodeJS avec une collection permettant de stocker les apports / dépenses de calorie (Log)
- Ajouter un route pour lister les calories avec un filtre optionnel sur le type apport ou dépense
- Ajouter une route pour ajouter une dépense ou un apport- Utiliser ces routes dans le front-end
- Chargement de la liste à l'affichage
- Enregistrement d'un élément à l'ajout
- Ajouter un filtre de type
- Recharger la liste si le type change

# EXAMEN #
- Création d'une date d'ajout du Log (entité globale ajout / dépense de calorie)
- Possibilité de trier par date- Possibilité de supprimer un Log/Entry depuis la liste
- Affichage du total consommé, total dépensé et bilan au niveau de la liste des Logs.
   - Ces données se mettent à jour en temps réel lors d'une opération sur la liste. A minima lors d'une suppression mais également un ajout si le formulaire est sur la même page
   Ajouter un mécanisme d'authentification:  - Formulaire de login / mot de passe. Idéalement dans une nouvelle page avec un router  - Logique d'identification coté backend, identifiants en dur ou en base de donnée
- Restriction de l'interface aux utilisateurs connectés uniquement
  - un utilisateur ne voit que ses données
  - Persistance du token pour permettre un rechargement de la page sans être déconnecté.
  - Formulaire d'inscription, avec persistance des comptes en base de donée
- Système de templates de Log prédéfnis
  - Proposer dans deux listes déroulantes,  des templates de dépense et apport
  - Les templates viennent idéalement du backend, en dur ou en base de données
  - Ajout d'une interface d'administration des templates
  - Connection protégée par login / mot de page. Possiblement depuis le même formulaire de connection utilisateur, avec redirection des la bonne page un fois connecté. Ou une nouvelle page avec réutilisation du composant du formulaire
  - Identifiants en dur ou dans la base de donnée, par exemple avec une propriété role pour un user
  - Formulaire pour créer des templates d'ajout/dépense (Log) de calories. Avec un nom, une valeur et un type.
  - Réutiliser le composant React utilisateur si possible
  - Enregistrement en base 
