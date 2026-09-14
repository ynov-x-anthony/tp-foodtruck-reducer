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

export type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "INCREMENT_ITEM"; productId: string }
  | { type: "DECREMENT_ITEM"; productId: string }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "APPLY_DISCOUNT_CODE"; code: string }
  | { type: "TOGGLE_HAPPY_HOUR" }
  | { type: "RESET_CART" };
