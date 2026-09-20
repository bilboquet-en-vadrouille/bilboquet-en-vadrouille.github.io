import pandas as pd
from pathlib import Path
import re

# --------------------------------------------------
# CONFIGURATION
# --------------------------------------------------

# Nom de ton fichier Excel
FICHIER_EXCEL = "ludotheque-final.xlsx"

# Dossier dans lequel seront créés les fichiers .md
DOSSIER_SORTIE = "md"


# --------------------------------------------------
# FONCTIONS
# --------------------------------------------------

def nettoyer_nom_fichier(nom):
    """
    Nettoie le nom pour pouvoir l'utiliser comme nom de fichier.
    """
    nom = str(nom).strip()

    # Caractères interdits dans les noms de fichiers
    nom = re.sub(r'[<>:"/\\|?*]', '-', nom)

    return nom


def valeur(row, colonne):
    """
    Récupère une valeur Excel proprement.
    """
    valeur = row[colonne]

    if pd.isna(valeur):
        return ""

    # Évite par exemple 10.0 si Excel contient simplement 10
    if isinstance(valeur, float) and valeur.is_integer():
        return str(int(valeur))

    return str(valeur).strip()


# --------------------------------------------------
# LECTURE DU FICHIER EXCEL
# --------------------------------------------------

print("Lecture du fichier Excel...")

df = pd.read_excel(FICHIER_EXCEL)

# Vérification des colonnes
colonnes_attendues = [
    "Nom",
    "txt",
    "txt2",
    "txt3",
    "txt4",
    "etoile",
    "prix loc",
    "lien regle",
    "nom photo"
]

for colonne in colonnes_attendues:
    if colonne not in df.columns:
        print(f"ERREUR : la colonne '{colonne}' est absente du fichier Excel.")
        print("Colonnes trouvées :")
        print(list(df.columns))
        input("\nAppuie sur Entrée pour fermer...")
        exit()


# --------------------------------------------------
# CREATION DU DOSSIER DE SORTIE
# --------------------------------------------------

dossier = Path(DOSSIER_SORTIE)
dossier.mkdir(exist_ok=True)


# --------------------------------------------------
# CREATION DES FICHIERS MARKDOWN
# --------------------------------------------------

nombre = 0

for index, row in df.iterrows():

    nom = valeur(row, "Nom")

    # On ignore les lignes sans nom
    if not nom:
        continue

    txt1 = valeur(row, "txt")
    txt2 = valeur(row, "txt2")
    txt3 = valeur(row, "txt3")
    txt4 = valeur(row, "txt4")

    etoile = valeur(row, "etoile")
    prixlocation = valeur(row, "prix loc")
    lienregle = valeur(row, "lien regle")
    nomphoto = valeur(row, "nom photo")


    # --------------------------------------------------
    # DESCRIPTION
    # --------------------------------------------------

    textes = []

    for texte in [txt1, txt2, txt3, txt4]:
        if texte:
            textes.append(texte)

    description = "\n\n".join(textes)

    # Indentation nécessaire pour le YAML
    description = "\n".join(
        "  " + ligne
        for ligne in description.split("\n")
    )


    # --------------------------------------------------
    # CONTENU DU FICHIER MARKDOWN
    # --------------------------------------------------

    contenu = f"""---
layout: post
title: {nom}
description: >-
{description}

etoile: {etoile}
prixlocation: {prixlocation}
lienplaquette: {lienregle}

categorie: jeux
---
![{nomphoto}](assets/img/posts/{nomphoto})
"""


    # --------------------------------------------------
    # NOM DU FICHIER
    # --------------------------------------------------

    nom_fichier = nettoyer_nom_fichier(nom)

    fichier = dossier / f"{nom_fichier}.md"

    # Si un fichier portant le même nom existe,
    # on ajoute -2, -3, etc.
    compteur = 2

    while fichier.exists():
        fichier = dossier / f"{nom_fichier}-{compteur}.md"
        compteur += 1


    # --------------------------------------------------
    # ECRITURE
    # --------------------------------------------------

    fichier.write_text(contenu, encoding="utf-8")

    nombre += 1

    print(f"Créé : {fichier}")


# --------------------------------------------------
# FIN
# --------------------------------------------------

print()
print("----------------------------------------")
print(f"{nombre} fichiers Markdown créés.")
print(f"Ils se trouvent dans : {dossier.resolve()}")
print("----------------------------------------")

input("\nAppuie sur Entrée pour fermer...")