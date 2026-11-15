"""
WSGI Configuration File for PythonAnywhere
In the PythonAnywhere 'Web' tab, point the WSGI configuration to this file,
or copy-paste its contents into your /var/www/<username>_pythonanywhere_com_wsgi.py
"""

import sys
import os

# Définir le chemin vers le projet (à adapter avec votre nom d'utilisateur PythonAnywhere)
project_home = os.path.dirname(os.path.abspath(__file__))
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Importer l'application Flask sous le nom 'application' requis par WSGI
from flask_app import app as application
