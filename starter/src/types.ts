// ============================================================================
// Types du domaine métier : un produit, une ligne de panier, l'état du panier.
// ============================================================================

/** Un produit du menu du foodtruck. */
export interface Product {
  id: string;
  name: string;
  /** Prix unitaire en euros. */
  price: number;
  category: "burger" | "side" | "drink";
  emoji: string;
}

/** Une ligne du panier : un produit + la quantité commandée. */
export interface CartLine {
  product: Product;
  quantity: number;
}

/**
 * L'état complet du panier.
 *
 * Remarque de conception : on ne stocke PAS le total ici. Le total se
 * CALCULE à partir de `lines`, `discountPercent` et `happyHour` (voir
 * `reducer/cartSelectors.ts`, déjà fourni). Un reducer ne gère que la
 * SOURCE DE VÉRITÉ, jamais les valeurs qu'on peut recalculer à partir
 * d'elle.
 */
export interface CartState {
  lines: CartLine[];
  /** Le code promo actif, ou `null` si aucun n'est appliqué. */
  discountCode: string | null;
  /** Le pourcentage de réduction associé (0 si aucun code actif). */
  discountPercent: number;
  /** Vrai si le mode "happy hour" (-50% sur les boissons) est activé. */
  happyHour: boolean;
}

// ----------------------------------------------------------------------------
// 🔧 TODO 1 : Type des actions (union discriminée)
// ----------------------------------------------------------------------------
// Remplace `CartAction` ci-dessous par une UNION DISCRIMINÉE qui modélise
// les 7 actions possibles sur le panier. Chaque variante doit avoir un
// champ `type` littéral (une chaîne fixe), plus les champs de payload
// nécessaires. Voir le README, section "TODO 1", pour le détail de chaque
// action et un exemple sur un autre domaine (le compteur du cours).
//
// Les 7 actions à modéliser :
//   - "ADD_ITEM"            → ajoute un produit au panier (payload: product)
//   - "INCREMENT_ITEM"      → +1 sur une ligne (payload: productId)
//   - "DECREMENT_ITEM"      → -1 sur une ligne (payload: productId)
//   - "REMOVE_ITEM"         → retire une ligne entière (payload: productId)
//   - "APPLY_DISCOUNT_CODE" → tente d'appliquer un code promo (payload: code)
//   - "TOGGLE_HAPPY_HOUR"   → active/désactive le happy hour (pas de payload)
//   - "RESET_CART"          → vide le panier (pas de payload)
//
// Tant que ce type vaut `never`, `cartReducer.ts` ne compilera pas
// correctement : c'est normal, complète-le AVANT de passer au TODO 2.
export type CartAction = | { type: "ADD_ITEM"; payload: Product}
	                       | { type: "INCREMENT_ITEM"; payload: string}
	                       | { type: "DECREMENT_ITEM"; payload: string}
                         | { type: "REMOVE_ITEM"; payload: string }
                         | { type: "APPLY_DISCOUNT_CODE"; payload: string }
                         | { type: "TOGGLE_HAPPY_HOUR",}
                         | { type: "RESET_CART" }
