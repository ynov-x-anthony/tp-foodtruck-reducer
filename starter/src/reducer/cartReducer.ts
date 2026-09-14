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
			// TODO 2.1 : renvoie un nouvel état dont `lines` vaut
			// addLine(state.lines, action.product).
			return { ...state, lines: addLine(state.lines, action.product) };
		}

		case "INCREMENT_ITEM": {
			// TODO 2.2 : même principe, avec incrementLine(state.lines, action.productId).
			return { ...state, lines: incrementLine(state.lines, action.productId) };
		}

		case "DECREMENT_ITEM": {
			// TODO 2.3 : même principe, avec decrementLine(state.lines, action.productId).
			return { ...state, lines: decrementLine(state.lines, action.productId) };
		}

		case "REMOVE_ITEM": {
			// TODO 2.4 : même principe, avec removeLine(state.lines, action.productId).
			return { ...state, lines: removeLine(state.lines, action.productId) };
		}

		case "APPLY_DISCOUNT_CODE": {
			// TODO 2.5 : même principe, avec applyDiscountCode(state, action.code)
			// (celle-ci renvoie déjà l'état COMPLET, pas juste `lines`).
			return applyDiscountCode(state, action.code);
		}

		case "TOGGLE_HAPPY_HOUR": {
			// TODO 2.6 : inverse `state.happyHour`.
			return { ...state, happyHour: !state.happyHour };
		}

		case "RESET_CART": {
			// TODO 2.7 : reviens à l'état initial (panier vide, pas de remise,
			// happy hour désactivée).
			return initialCartState;
		}

		default:
			return state;
	}
}
