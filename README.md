# Mamou Prestige Award (MPA) 2026

Plateforme officielle du **Mamou Prestige Award**, une cérémonie de récompense qui célèbre l'excellence et met à l'honneur les personnalités et acteurs marquants de la région de Mamou, en Guinée.

Le site permet au grand public de voter pour leurs candidats favoris, tandis qu'un jury professionnel évalue les nominations en parallèle. Le score final combine les deux sources pour un résultat équitable et transparent.

---

## Fonctionnalités

- **Vote public** avec vérification anti-fraude (CAPTCHA + paiement Orange Money Guinée)
- **Jury indépendant** avec interface d'évaluation dédiée
- **Calcul pondéré** : `Score final = (Public × 45%) + (Jury × 55%)`
- **Gestion des éditions** : édition active 2026, archives en lecture seule
- **Design Lépi** : identité visuelle inspirée du tissu traditionnel guinéen

---

## Stack Technique

| Couche | Technologie |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI Library | [React 19](https://react.dev) |
| Langage | [TypeScript](https://www.typescriptlang.org) |
| Styles | [Tailwind CSS v4](https://tailwindcss.com) |
| Composants | [Shadcn/UI](https://ui.shadcn.com) + [Radix UI](https://radix-ui.com) |
| Icônes | [Lucide React](https://lucide.dev) |
| Animations | [tw-animate-css](https://github.com/jamiebuilds/tailwindcss-animate) |
| Linting | ESLint (config Next.js) |

---

## Structure du Projet

```
src/
├── app/          # Routes et layouts (App Router)
├── components/   # Composants UI réutilisables et blocs fonctionnels
├── lib/          # Utilitaires, configs (DB, Auth, API)
├── hooks/        # Hooks React personnalisés
└── types/        # Définitions TypeScript globales
```

---

## Identité Visuelle

Le design s'inspire du **Lépi**, tissu traditionnel de Mamou, avec :

- `#002147` — Indigo Mamou (couleur principale)
- `#ffffff` — Blanc
- Touches dorées (accents, récompenses)
- Motifs géométriques en arrière-plan rappelant le tissage traditionnel

---

## Démarrage

### Prérequis

- Node.js >= 18
- npm

### Installation

```bash
git clone <repo-url>
cd mamou-prestige
npm install
```

### Développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

### Build Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## Ajouter un Composant Shadcn

```bash
npx shadcn@latest add [nom-du-composant]
```

---

## Logique de Vote

Chaque vote public est soumis à :
1. Une validation CAPTCHA
2. Une vérification de transaction via l'**API Orange Money Guinée**

Le score final d'un candidat est calculé ainsi :

```
Score Final = (Score Public × 0.45) + (Score Jury × 0.55)
```

Les éditions archivées sont accessibles en lecture seule — les boutons de vote y sont masqués.
