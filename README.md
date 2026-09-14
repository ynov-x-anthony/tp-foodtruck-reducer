# 🚚 Le Foodtruck Ynov : workshop `useReducer`

TP **solo** pour mettre en pratique `useReducer` sur un cas différent du
compteur ou du switch de thème vus en cours : la gestion du **panier de
commande** d'un foodtruck.

Objectif : à la fin, tu dois être capable d'écrire un reducer avec
**plusieurs actions métier qui interagissent entre elles**, de le **typer**
correctement avec TypeScript, et de le **combiner avec Context** pour en
faire un petit store global - sans aucune librairie externe.

---

## 🎯 Pourquoi un panier, et pas un compteur ?

Un compteur n'a qu'**une seule valeur** (`count`) et des actions qui ne se
marchent jamais sur les pieds (`+1`, `-1`, `reset`). C'est parfait pour
apprendre la **syntaxe** de `useReducer`, mais ça ne montre pas *pourquoi*
on en a besoin en vrai projet.

Le panier, lui, a un état **composé de plusieurs valeurs qui se
influencent** :

- les lignes du panier (`lines`) déterminent le sous-total ;
- le **happy hour** change le prix des boissons *dans* ce sous-total ;
- le **code promo** s'applique *après* le happy hour ;
- vider le panier (`RESET_CART`) doit remettre **les trois** à zéro d'un
  coup, de façon cohérente.

Avec `useState`, tu te retrouverais avec 3-4 `useState` séparés, et un
risque réel d'oublier de remettre `happyHour` à `false` quand tu vides le
panier. Avec `useReducer`, **toute la logique métier est centralisée** au
même endroit : impossible d'oublier une transition, parce que
`RESET_CART` a son propre `case` explicite.

---

## 🧠 Rappels théoriques (vus en cours, résumé express)

| Concept                     | Rappel                                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------------------- |
| **Reducer**                  | Une fonction **pure** `(state, action) => nouvel état`. Jamais de fetch/setTimeout dedans. |
| **Immutabilité**              | Chaque `case` retourne un **nouvel** objet/tableau, on ne modifie jamais `state` en place. |
| **`dispatch`**                | La seule façon d'envoyer une action au reducer : `dispatch({ type: "..." })`.              |
| **Union discriminée**         | `type Action = { type: "A" } \| { type: "B"; payload: X }` : le champ `type` dit à TypeScript quelle forme a l'action. |
| **`useReducer` + `Context`**  | Le Context rend `state`/`dispatch` accessibles partout ; `useReducer` centralise leur logique de mise à jour. Un mini store, sans Redux. |

Si un de ces points est flou, rouvre le support de cours `useReducer.pdf`
avant de commencer : ce workshop part du principe qu'ils sont acquis sur
l'exemple du compteur, et te demande de les **transférer** sur un nouveau
domaine.

---

## 📦 Structure du dépôt

```
foodtruck/
├── README.md        ← ce fichier
├── starter/          ← ton point de départ (3 TODOs)
└── solution/          ← le corrigé complet, ultra commenté
```

`starter/` et `solution/` sont deux applications **Vite + React + TypeScript
+ Tailwind v4** totalement indépendantes (chacune a son `package.json`).

---

## 🚀 Mise en route

```bash
cd starter
npm install
npm run dev
```

Ouvre `http://localhost:5173`. Tu dois voir : la liste des produits à
gauche, un panier vide à droite. **C'est normal que rien ne fonctionne
encore** - tu vas le construire.

> ⚠️ Tant que le TODO 3 (Context) n'est pas fait, l'appli affiche une erreur
> React au chargement (`useCart() doit être appelé à l'intérieur d'un
> <CartProvider>`). C'est un message d'erreur **volontaire** : il te dit
> exactement quoi corriger. Ce n'est pas un bug du starter.

---

## 🗂️ Le domaine métier

Regarde d'abord `starter/src/types.ts` (déjà en grande partie rempli) :

```ts
interface Product {
  id: string;
  name: string;
  price: number;
  category: "burger" | "side" | "drink";
  emoji: string;
}

interface CartLine {
  product: Product;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  discountCode: string | null;
  discountPercent: number;
  happyHour: boolean;
}
```

Remarque importante : **le total n'est PAS dans `CartState`**. Il se
calcule à partir du reste (voir `starter/src/reducer/cartSelectors.ts`,
déjà fourni et fonctionnel). Si le total était stocké dans le state, il
faudrait le recalculer à la main dans chaque `case` du reducer qui touche
au panier - un oubli, et le total affiché mentirait. En le calculant à la
demande, il est toujours juste.

Tout le reste (catalogue de produits, composants d'affichage, formulaire
de code promo, bouton happy hour...) est **déjà fourni et câblé**. C'est
aussi le cas de `starter/src/reducer/cartLines.ts` (fonctions
`addLine`/`incrementLine`/`decrementLine`/`removeLine`, qui manipulent le
tableau `lines`) et de `starter/src/reducer/cartDiscount.ts` (fonction
`applyDiscountCode`, qui cherche un code promo) : ces algorithmes sont
fournis pour que TODO 2 se concentre sur le reducer lui-même - QUAND et
COMMENT l'état change - pas sur la mécanique de recherche/tableau. Ton
travail se concentre sur **3 fichiers**, dans cet ordre :

---

## 🔹 TODO 1 · `src/types.ts` : typer les actions

**~15 minutes**

Le reducer doit gérer **7 actions**. À toi d'écrire l'union discriminée
`CartAction` qui les modélise (remplace le `export type CartAction =
never;` actuel) :

| `type`                 | Payload à transporter          | Déclenchée par                          |
| ---------------------- | ------------------------------- | ---------------------------------------- |
| `"ADD_ITEM"`           | `product: Product`              | bouton "Ajouter" d'une carte produit     |
| `"INCREMENT_ITEM"`     | `productId: string`             | bouton `+` dans le panier                |
| `"DECREMENT_ITEM"`     | `productId: string`             | bouton `−` dans le panier                |
| `"REMOVE_ITEM"`        | `productId: string`             | icône poubelle dans le panier            |
| `"APPLY_DISCOUNT_CODE"`| `code: string`                  | formulaire de code promo                 |
| `"TOGGLE_HAPPY_HOUR"`  | *(aucun)*                       | bouton "Happy Hour"                      |
| `"RESET_CART"`         | *(aucun)*                       | bouton "Vider le panier"                 |

⚠️ **Attention à un piège** : dans le cours (`useReducer.pdf`), l'action
`"set"` du compteur transporte sa donnée dans un champ générique
`payload` (`{ type: "set"; payload: number }`). Ici, chaque action a son
**propre champ nommé** (`product`, `productId`, `code` - voir la colonne
"Payload à transporter" ci-dessus), PAS un champ `payload`. Regarde
`starter/src/components/ProductCard.tsx` : le `dispatch({ type:
"ADD_ITEM", product })` déjà câblé te dit exactement quel nom de champ
utiliser. Si tu tapes `payload` par réflexe, ton union ne collera pas
avec les composants déjà fournis.

<details markdown="1">
<summary>▸ Indice : la syntaxe d'une union discriminée</summary>

Rappelle-toi l'exemple du compteur vu en cours :

```ts
type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "set"; payload: number };
```

Chaque ligne du tableau ci-dessus devient une variante de l'union, sur le
même modèle (juste avec le nom de champ de la colonne "Payload à
transporter" à la place de `payload`). Une action sans donnée à
transporter (comme `"increment"` ou `"reset"` ci-dessus) n'a que le champ
`type`.
</details>

**✅ Vérif.** `npm run build` dans `starter/` doit faire disparaître les
erreurs `is not assignable to parameter of type 'never'` dans les
fichiers `components/*.tsx`. Il restera des erreurs dans `cartReducer.ts`
et `CartContext.tsx` : normal, ce sont les TODOs suivants.

---

## 🔹 TODO 2 · `src/reducer/cartReducer.ts` : écrire le reducer

**~15-20 minutes**, le cœur de l'exercice.

Le squelette est là : une fonction `cartReducer(state, action)` avec un
`switch (action.type)` et un `case` vide (`return state;`) pour chacune
des 7 actions. Ce TODO n'est **volontairement pas** un exercice d'algo :
`addLine`/`incrementLine`/`decrementLine`/`removeLine` (dans
`cartLines.ts`) font déjà tout le travail de `.find()`/`.map()`/
`.filter()` sur `lines`, et `applyDiscountCode` (dans `cartDiscount.ts`)
fait déjà la recherche du code promo. Ta seule question, pour chaque
`case` : **quel nouvel état l'action produit-elle ?**

Trois règles à respecter partout (déjà rappelées en commentaire dans le
fichier) :

1. **Fonction pure** : pas de `fetch`, pas de `Math.random()`, pas de
   mutation d'une variable extérieure au reducer.
2. **Immutabilité** : jamais `state.lines.push(...)` ni
   `line.quantity++`. Toujours `{ ...state, ... }`.
3. **Action invalide → état inchangé** : un code promo qui n'existe pas
   dans `DISCOUNT_CODES` ne doit RIEN changer, pas planter.

<details markdown="1">
<summary>▸ Indice · ADD_ITEM, INCREMENT_ITEM, DECREMENT_ITEM, REMOVE_ITEM</summary>

Les quatre suivent exactement le même moule : appelle la fonction de
`cartLines.ts` qui correspond (`addLine`, `incrementLine`,
`decrementLine` ou `removeLine`) avec `state.lines` et le bon argument
(`action.product` ou `action.productId`), et renvoie
`{ ...state, lines: /* le résultat de l'appel */ }`.
</details>

<details markdown="1">
<summary>▸ Indice · APPLY_DISCOUNT_CODE</summary>

Même moule que les quatre précédents, avec `applyDiscountCode` (déjà
importée en haut du fichier) : `applyDiscountCode(state, action.code)`.
Différence à noter : elle renvoie directement l'état COMPLET (pas
seulement `lines`), donc pas de `{ ...state, ... }` à écrire ici -
retourne juste ce qu'elle te donne.
</details>

<details markdown="1">
<summary>▸ Indice · TOGGLE_HAPPY_HOUR et RESET_CART</summary>

Les deux plus courts cases du fichier : `!state.happyHour` pour le
premier, et l'objet `initialCartState` (déjà déclaré en haut du fichier)
pour le second.
</details>

**✅ Vérif.** Dans le navigateur : ajoute un burger deux fois de suite →
une seule ligne, quantité `2`. Clique `−` jusqu'à `0` → la ligne
disparaît. Le bouton Happy Hour divise par deux le prix affiché des
boissons. `ETUDIANT10` affiche `-10%` sur le total ; un code inventé
n'affiche rien (et ne fait pas planter la page).

---

## 🔹 TODO 3 · `src/context/CartContext.tsx` : brancher useReducer + Context

**~15 minutes**

Structure identique au `ThemeContext` vu en cours, appliquée au panier.
Dans `CartProvider` :

1. Appelle `useReducer(cartReducer, initialCartState)` pour récupérer
   `state` et `dispatch` (import `useReducer` à ajouter depuis `"react"`).
2. Remplace `return <>{children}</>;` par
   `return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;`

Le hook `useCart()` en bas du fichier est **déjà fourni** : tu n'as rien à
y changer. Regarde-le quand même - il illustre un pattern utile (lever une
erreur explicite si le Context est `null`, plutôt que planter plus loin
avec un message obscur).

**✅ Vérif.** L'erreur `useCart() doit être appelé...` disparaît, toute
l'appli fonctionne de bout en bout : ajoute des produits, joue avec
`+`/`−`, le happy hour, un code promo, et "Vider le panier".

---

## 🧪 Scénario de validation

Une fois les 3 TODOs faits, déroule ce scénario en entier :

1. Ajoute 2 Cheeseburgers et 1 Frites → le panier affiche 2 lignes,
   quantités correctes, sous-total juste.
2. Ajoute un Soda, puis active le **Happy Hour** → le prix affiché du Soda
   est divisé par deux, le sous-total se met à jour.
3. Applique le code `CAMPUS20` → le total baisse de 20% par rapport au
   sous-total (happy hour inclus).
4. Essaie un code bidon (`NIMPORTEQUOI`) → rien ne change, pas d'erreur
   dans la console.
5. Clique `−` sur les Frites jusqu'à `0` → la ligne disparaît toute
   seule.
6. **Vide le panier** → retour à zéro : plus de lignes, plus de code
   promo actif, happy hour désactivée.

---

## 🎁 Bonus (si tu as fini en avance)

Aucun n'est noté, à faire uniquement par curiosité :

- **Initialisation paresseuse (lazy init)** : `useReducer` accepte un
  **3ᵉ argument**, une fonction `init(initialArg)` appelée une seule fois
  au premier rendu. Utilise-la pour lire un panier sauvegardé dans
  `localStorage` au démarrage (`useReducer(cartReducer, undefined,
  init)`), et un `useEffect` pour l'y réécrire à chaque changement. Utile
  quand construire l'état initial est coûteux (ici : lire le
  `localStorage`), pour ne pas le refaire à chaque render.
- **Quantité maximale** : refuse `INCREMENT_ITEM` au-delà de 10 unités
  d'un même produit (toujours sans planter, juste en ignorant l'action).
- **Total de la commande dans le `<title>`** : un `useEffect` dans `App`
  qui met à jour `document.title` avec le total du panier.
- **Historique des actions** : garde un tableau des 5 dernières actions
  dispatchées (dans un state séparé, ou un second reducer) et affiche-le
  pour déboguer - c'est le principe de base des devtools Redux.

---

## 📋 Auto-évaluation

Pas de rendu pour ce TP : sers-toi de cette grille pour vérifier que tu as
bien tout couvert avant de comparer avec `solution/`.

| Ce qu'on regarde                                                          | Points  |
| --------------------------------------------------------------------------| :-----: |
| `npm run dev` démarre, `node_modules` non commité                        |    2    |
| **TODO 1** : union discriminée complète et correctement typée            |    4    |
| **TODO 2** : les 7 actions du reducer fonctionnent, state jamais muté    |    8    |
| **TODO 3** : Context + hook `useCart` fonctionnels                       |    4    |
| **Scénario de validation** passe en entier                               |    2    |
| **Total**                                                                 | **/20** |

---

## ☝️ Récap

Reformule pour toi-même, sans regarder le code :

- pourquoi ce panier serait pénible à gérer avec plusieurs `useState` ;
- ce qu'une union discriminée apporte par rapport à `type Action = { type:
  string; payload?: any }` ;
- pourquoi le total n'est pas stocké dans `CartState` ;
- ce que Context apporte à `useReducer`, et inversement.

La solution complète et commentée est dans `solution/` - ne l'ouvre
qu'après avoir fini (ou vraiment bloqué plus de 15 minutes sur un TODO).
