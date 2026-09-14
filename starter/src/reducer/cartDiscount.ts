import type { CartState } from "../types";
import { DISCOUNT_CODES } from "../data/discountCodes";

/**
 * Applique un code promo à l'état du panier.
 *
 * Normalise la casse, cherche le code dans DISCOUNT_CODES, et renvoie soit
 * un NOUVEL état (code valide), soit `state` INCHANGÉ (code invalide) :
 * c'est le comportement attendu par la règle 3 d'un reducer (une action
 * invalide ne casse rien).
 */
export function applyDiscountCode(state: CartState, code: string): CartState {
	const normalizedCode = code.toUpperCase();
	const discountPercent = DISCOUNT_CODES[normalizedCode];

	if (discountPercent === undefined) {
		return state;
	}

	return { ...state, discountCode: normalizedCode, discountPercent };
}
