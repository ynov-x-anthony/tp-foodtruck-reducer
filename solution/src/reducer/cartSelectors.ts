import type { CartLine, CartState } from "../types";

/**
 * Ces fonctions sont des "sélecteurs" : elles calculent une valeur DÉRIVÉE
 * à partir du state, sans jamais le modifier. Elles vivent volontairement
 * EN DEHORS du reducer.
 *
 * Pourquoi ne pas mettre ce calcul dans le reducer, ou stocker le total
 * dans le state ? Parce que le total ne fait que dépendre de `lines`,
 * `discountPercent` et `happyHour` : si on le stockait, il faudrait
 * recalculer et remettre à jour ce total dans CHAQUE `case` du reducer qui
 * touche à ces valeurs. Un oubli et le total affiché "ment" par rapport
 * au contenu réel du panier. En le calculant à la demande, il est
 * TOUJOURS juste, par construction.
 */

/** Prix appliqué à une ligne, en tenant compte du happy hour sur les boissons. */
export function getLinePrice(line: CartLine, happyHour: boolean): number {
  const isDiscountedDrink = happyHour && line.product.category === "drink";
  const unitPrice = isDiscountedDrink ? line.product.price * 0.5 : line.product.price;
  return unitPrice * line.quantity;
}

/** Nombre total d'articles dans le panier (toutes lignes confondues). */
export function getItemCount(state: CartState): number {
  return state.lines.reduce((count, line) => count + line.quantity, 0);
}

/** Sous-total, happy hour appliqué, mais AVANT le code promo. */
export function getSubtotal(state: CartState): number {
  return state.lines.reduce((sum, line) => sum + getLinePrice(line, state.happyHour), 0);
}

/** Montant retiré du sous-total grâce au code promo actif. */
export function getDiscountAmount(state: CartState): number {
  const subtotal = getSubtotal(state);
  return (subtotal * state.discountPercent) / 100;
}

/** Total final à payer : sous-total moins la réduction. */
export function getTotal(state: CartState): number {
  return getSubtotal(state) - getDiscountAmount(state);
}
