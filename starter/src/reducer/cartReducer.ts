import type { CartState, CartAction } from "../types";
import { addLine, incrementLine, decrementLine, removeLine } from "./cartLines";
import { applyDiscountCode } from "./cartDiscount";

export const initialCartState: CartState = {
	lines: [],
	discountCode: null,
	discountPercent: 0,
	happyHour: false,
};

// ----------------------------------------------------------------------------
// 🔧 TODO 2 : Le reducer
// ----------------------------------------------------------------------------
// La manipulation du tableau `lines` (trouver une ligne, incrémenter,
// retirer à 0...) est déjà fournie par addLine/incrementLine/decrementLine/
// removeLine (voir cartLines.ts), et la recherche du code promo par
// applyDiscountCode (voir cartDiscount.ts). Ton travail ici n'est PAS de
// réécrire ces algorithmes : c'est de comprendre QUAND et COMMENT le
// reducer transforme l'état en un NOUVEL état - c'est ça, le vrai sujet
// du TP.
//
// Rappelle-toi les 3 règles d'un reducer (détaillées dans le README) :
//   1. Fonction PURE : pas de fetch, pas de Math.random(), pas d'effet de bord.
//   2. On ne MUTE jamais `state` : on retourne toujours un NOUVEL objet
//      (`{ ...state, lines: ... }`).
//   3. Une action invalide ne casse rien : elle retourne l'état inchangé.
//
// Fais les cases dans l'ordre, en testant dans le navigateur après chacune
// (voir les "✅ Vérif." du README) : le reste de l'appli est déjà câblé,
// dès qu'un case fonctionne le bouton correspondant s'anime.
export function cartReducer(state: CartState, action: CartAction): CartState {
	switch (action.type) {
		case "ADD_ITEM": {
			return { ...state, lines: addLine(state.lines, action.product) };
		}

		case "INCREMENT_ITEM": {
			return { ...state, lines: incrementLine(state.lines, action.productId) };
		}

		case "DECREMENT_ITEM": {
			return { ...state, lines: decrementLine(state.lines, action.productId) };
		}

		case "REMOVE_ITEM": {
			return { ...state, lines: removeLine(state.lines, action.productId) };
		}

		case "APPLY_DISCOUNT_CODE": {
			return applyDiscountCode(state, action.code);
		}

		case "TOGGLE_HAPPY_HOUR": {
			return { ...state, happyHour: !state.happyHour };
		}

		case "RESET_CART": {
			return initialCartState;
		}

		default:
			return state;
	}
}
