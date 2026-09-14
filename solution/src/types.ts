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
 * `reducer/cartSelectors.ts`). Si on le stockait, il faudrait le
 * recalculer et le remettre à jour dans CHAQUE action qui touche au
 * panier -> source classique de bugs (le total qui "désynchronise" du
 * contenu réel du panier). Un reducer ne doit gérer que la SOURCE DE
 * VÉRITÉ, jamais les valeurs qu'on peut recalculer à partir d'elle.
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
// Les actions : UNE UNION DISCRIMINÉE.
//
// Chaque variante a un champ `type` littéral (une chaîne fixe) qui permet à
// TypeScript de savoir, dans le `switch (action.type)` du reducer, quels
// autres champs sont disponibles sur `action`. C'est ce qui empêche
// d'écrire `dispatch({ type: "ADD_ITEM" })` en oubliant le `product`, ou
// `dispatch({ type: "TYPO_DE_TYPE" })` : TypeScript refuse à la compilation.
// ----------------------------------------------------------------------------
export type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "INCREMENT_ITEM"; productId: string }
  | { type: "DECREMENT_ITEM"; productId: string }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "APPLY_DISCOUNT_CODE"; code: string }
  | { type: "TOGGLE_HAPPY_HOUR" }
  | { type: "RESET_CART" };
