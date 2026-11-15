# 🚀 Déploiement de votre Portfolio MotionSites sur PythonAnywhere

Ce projet est une application **Flask** optimisée pour une intégration directe sur [PythonAnywhere](https://www.pythonanywhere.com/). Il utilise le système de design **MotionSites** (Dark Mode profond, glassmorphism, cartes 3D tilt et bordures luminescentes interactives au survol).

---

## 📁 Structure du projet

```text
portfolio/
├── flask_app.py               # Application Flask principale (profil, projets, compétences, API contact)
├── wsgi.py                    # Point d'entrée WSGI standard pour PythonAnywhere
├── requirements.txt           # Dépendances (Flask, Gunicorn)
├── README_PYTHONANYWHERE.md   # Ce guide de déploiement pas à pas
├── templates/
│   └── index.html             # Template HTML cinématique MotionSites
└── static/
    ├── css/
    │   └── style.css          # Tokens MotionSites, glassmorphism, bordures luminescentes
    └── js/
        └── motion.js          # Moteur de physique 3D tilt, spotlight curseur & AJAX
```

---

## ⚡ Guide de déploiement en 5 étapes sur PythonAnywhere

### Étape 1 : Téléverser le dossier sur PythonAnywhere
1. Connectez-vous à votre compte [PythonAnywhere](https://www.pythonanywhere.com/).
2. Ouvrez un terminal **Bash** (via le tableau de bord *Consoles > Bash*).
3. Clonez votre dépôt ou téléversez le dossier `portfolio` dans votre répertoire personnel `/home/<votre_nom_utilisateur>/portfolio`.

### Étape 2 : Installer Flask
Dans la console Bash de PythonAnywhere, exécutez simplement :
```bash
cd ~/portfolio
pip install -r requirements.txt
```

### Étape 3 : Créer l'application Web
1. Allez dans l'onglet **Web** de votre tableau de bord PythonAnywhere.
2. Cliquez sur **Add a new web app**.
3. Choisissez **Manual configuration** (ou sélectionnez Python 3.10, 3.11 ou 3.12).

### Étape 4 : Configurer les chemins et le fichier WSGI
Dans la page de configuration de votre application Web :
1. **Source code** : saisissez `/home/<votre_nom_utilisateur>/portfolio`
2. **Working directory** : saisissez `/home/<votre_nom_utilisateur>/portfolio`
3. **WSGI configuration file** : cliquez sur le lien du fichier (ex: `/var/www/<username>_pythonanywhere_com_wsgi.py`), effacez son contenu par défaut et remplacez-le par :
```python
import sys
import os

path = '/home/<votre_nom_utilisateur>/portfolio'
if path not in sys.path:
    sys.path.insert(0, path)

from flask_app import app as application
```
*(Pensez à remplacer `<votre_nom_utilisateur>` par votre vrai nom d'utilisateur PythonAnywhere).*

### Étape 5 : Recharger et admirer
Cliquez sur le gros bouton vert **Reload <username>.pythonanywhere.com** en haut de la page.
Visitez ensuite votre URL : votre portfolio cinématique est en ligne ! 🎉

---

## 🎨 Personnaliser vos données
Tout se configure directement dans le fichier `flask_app.py` :
- **`PROFILE`** : votre nom, votre titre, votre bio, vos réseaux sociaux.
- **`SKILLS`** : vos compétences, métriques et catégories de votre Bento Grid.
- **`PROJECTS`** : vos réalisations avec tags, descriptions, liens de démo et dépôts GitHub.

Les modifications prennent effet immédiatement après avoir cliqué sur **Reload** dans PythonAnywhere.
