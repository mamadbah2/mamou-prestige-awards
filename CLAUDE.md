# CLAUDE.md

Ce fichier fournit les directives contextuelles pour **Claude Code** (agent CLI) afin de garantir la cohérence du projet **Mamou Prestige Award (MPA) 2026**.

## 🚀 Commandes de Base

```bash
npm run dev          # Serveur de développement
npm run build        # Build production
npm run lint         # Vérification ESLint
npx prisma generate  # Générer le client Prisma (si utilisé)
npx prisma db push   # Synchroniser la DB (développement)
npx shadcn@latest add [component] # Ajouter un composant UI

```

## 🏗️ Architecture & Stack

Projet **Next.js 16 (App Router)** | **React 19** | **TypeScript**.

* `src/app/` : Routes et layouts.
* `src/components/` : Composants UI (atomiques) et blocs fonctionnels.
* `src/lib/` : Utilitaires, configurations (DB, Auth, API).
* `src/hooks/` : Logique React personnalisée.
* `src/types/` : Définitions TypeScript globales.

## 🎨 Identité Visuelle (Le "Lépi" Vibe)

* **Thème** : Palette Indigo Mamou. Utiliser `--color-lepi-indigo: #002147` et `--color-lepi-white: #ffffff` et du doree (moins frequent).
* **Patterns** : Utiliser des motifs géométriques (SVG/CSS) en arrière-plan pour rappeler le tissu traditionnel Lépi.
* **UI** : Utiliser **Shadcn/UI** pour la structure, avec des bordures fines et un aspect institutionnel/prestigieux.
* **Mobile First** : Le site doit etre vraiment adapter a l'usage mobile.

## ⚖️ Logique Métier (Critique)

1. **Système de Vote** :
* **Pondération** : Le calcul final doit être `(Score Public * 0.45) + (Score Jury * 0.55)`.
* **Sécurité** : Chaque vote doit être validé via un CAPTCHA et une vérification de transaction (paiement via api orange money guinee).


2. **Gestion des Éditions** :
* L'édition active est **2026**.
* Les archives (éditions précédentes) sont en **lecture seule** (boutons de vote masqués).


## 🛠️ Règles de Code & Style

* **Composants** : Privilégier les *Server Components* par défaut. Utiliser `"use client"` uniquement si nécessaire.
* **Nommage** : Variables et fonctions en **English**. Contenu textuel (UI) en **Français**.
* **Data Fetching** : Utiliser `fetch` avec validation `Zod` pour les données externes.
* **Erreurs** : Toujours implémenter des `try/catch` robustes dans les Server Actions et API routes avec des messages d'erreur explicites pour l'utilisateur.

---
