# 🚀 Déploiement Automatisé du Portfolio sur PythonAnywhere

Ce projet est une application **Flask** optimisée pour une mise en production sur [PythonAnywhere](https://www.pythonanywhere.com/).

Le déploiement est **100% automatisé** grâce au workflow GitHub Actions (`.github/workflows/deploy.yml`) : chaque `git push` sur la branche `main` téléverse vos fichiers et recharge automatiquement votre application web via l'API officielle de PythonAnywhere !

---

## 📁 Structure du projet

```text
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml         # Pipeline CI/CD de déploiement automatique
├── flask_app.py               # Application Flask principale (profil, projets réels, API contact)
├── wsgi.py                    # Point d'entrée WSGI standard pour PythonAnywhere
├── requirements.txt           # Dépendances (Flask, Gunicorn)
├── README_PYTHONANYWHERE.md   # Ce guide de configuration
├── templates/
│   └── index.html             # Template HTML professionnel orienté recrutement
└── static/
    ├── css/
    │   └── style.css          # Design system épuré & réactif
    └── js/
        └── motion.js          # Filtres interactifs et formulaire de contact
```

---

## ⚡ Configuration du Déploiement Automatique (GitHub Actions)

Pour que GitHub puisse téléverser vos fichiers et recharger PythonAnywhere à chaque `push`, configurez les **4 secrets** sur GitHub :

### 1. Générer votre API Token sur PythonAnywhere
1. Connectez-vous à votre compte [PythonAnywhere](https://www.pythonanywhere.com/).
2. Allez dans **Account** (en haut à droite) → onglet **API token**.
3. Cliquez sur **Create a new API token** (ou copiez votre token existant).

### 2. Ajouter les Secrets dans votre dépôt GitHub
Dans votre dépôt GitHub (`https://github.com/henri983/portfolio`), allez dans :
**Settings** → **Secrets and variables** → **Actions** → **New repository secret** et ajoutez :

| Nom du Secret | Description | Exemple de Valeur |
|---|---|---|
| `PA_USERNAME` | Votre nom d'utilisateur PythonAnywhere | `henri983` |
| `PA_TOKEN` | Votre token API PythonAnywhere | `a1b2c3d4e5f6...` |
| `PA_TARGET_DIR` | Chemin cible sur PythonAnywhere | `/home/henri983/portfolio` |
| `PA_WEBAPP_DOMAIN` | Domaine de votre WebApp PythonAnywhere | `henri983.pythonanywhere.com` |
| `PA_HOST` *(optionnel)* | Hôte API (si compte EU) | `www.pythonanywhere.com` (par défaut) |

---

## ⚙️ Configuration initiale sur PythonAnywhere (à faire une seule fois)

### 1. Installer Flask
Dans une console **Bash** sur PythonAnywhere :
```bash
pip install -r /home/<votre_nom_utilisateur>/portfolio/requirements.txt
```

### 2. Configurer la WebApp dans l'onglet "Web"
Dans l'onglet **Web** de votre tableau de bord PythonAnywhere :
1. **Source code** : `/home/<votre_nom_utilisateur>/portfolio`
2. **Working directory** : `/home/<votre_nom_utilisateur>/portfolio`
3. **WSGI configuration file** : cliquez sur le lien du fichier (ex: `/var/www/<username>_pythonanywhere_com_wsgi.py`), effacez son contenu et remplacez par :
```python
import sys
import os

path = '/home/<votre_nom_utilisateur>/portfolio'
if path not in sys.path:
    sys.path.insert(0, path)

from flask_app import app as application
```

---

## 🚀 Déclencher le déploiement

Dès que vos secrets sont enregistrés :
1. Faites simplement un commit et push :
   ```bash
   git add .
   git commit -m "feat: automated deployment workflow"
   git push origin main
   ```
2. Ou allez dans l'onglet **Actions** sur GitHub et cliquez sur **Run workflow**.

Le workflow téléverse vos fichiers de manière récursive via l'API Files et appelle l'API `/reload/`. Votre portfolio est mis à jour en direct !
