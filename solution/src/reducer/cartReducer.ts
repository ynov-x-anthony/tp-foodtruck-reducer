import type { CartState, CartAction } from "../types";
import { addLine, incrementLine, decrementLine, removeLine } from "./cartLines";
import { applyDiscountCode } from "./cartDiscount";

export const initialCartState: CartState = {
  lines: [],
  discountCode: null,
  discountPercent: 0,
  happyHour: false,
};

/**
 * Le reducer du panier : (state, action) => nouvel état.
 *
 * La manipulation du tableau `lines` (trouver une ligne, incrémenter,
 * retirer à 0...) vit dans cartLines.ts, et la recherche du code promo
 * dans cartDiscount.ts : ce reducer ne fait que décider, pour chaque
 * action, QUEL nouvel état en résulte - c'est la vraie responsabilité
 * d'un reducer, séparée des algorithmes qu'il orchestre.
 *
 * Règles à respecter partout dans cette fonction (elles sont ce qui fait
 * qu'un reducer est FIABLE et TESTABLE) :
 *
 * 1. C'est une fonction PURE : aucun fetch, aucun setTimeout, aucun
 *    Math.random(), aucune mutation d'une variable extérieure. Les mêmes
 *    (state, action) en entrée donnent TOUJOURS le même état en sortie.
 * 2. On ne MUTE jamais `state` (ni `state.lines`, ni un objet `line`
 *    existant). On retourne toujours un NOUVEL objet / NOUVEAU tableau.
 *    C'est ce qui permet à React de détecter le changement (comparaison
 *    par référence) et de re-render au bon moment.
 * 3. Une action inconnue ou invalide ne casse rien : on retourne l'état
 *    inchangé (`default: return state`).
 */
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
      // applyDiscountCode gère elle-même le cas "code inconnu" en
      // renvoyant `state` inchangé : le reducer n'a rien de plus à faire.
      return applyDiscountCode(state, action.code);
    }

    case "TOGGLE_HAPPY_HOUR": {
      return { ...state, happyHour: !state.happyHour };
    }

    case "RESET_CART": {
      // On repart de l'état initial. Nouvel objet à chaque fois (pas de
      // risque qu'un composant mute accidentellement `initialCartState`).
      return { ...initialCartState };
    }

    default:
      return state;
  }
}
