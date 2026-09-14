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
export function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD_ITEM": {
            return {
                ...state,
                lines: addLine(state.lines, action.product),
            };
        }

        case "INCREMENT_ITEM": {
            return {
                ...state,
                lines: incrementLine(state.lines, action.productId),
            };
        }

        case "DECREMENT_ITEM": {
            return {
                ...state,
                lines: decrementLine(state.lines, action.productId),
            };
        }

        case "REMOVE_ITEM": {
            return {
                ...state,
                lines: removeLine(state.lines, action.productId),
            };
        }

        case "APPLY_DISCOUNT_CODE": {
            return applyDiscountCode(state, action.code);
        }

        case "TOGGLE_HAPPY_HOUR": {
            return {
                ...state,
                happyHour: !state.happyHour,
            };
        }

        case "RESET_CART": {
            return initialCartState;
        }

        default:
            return state;
    }
}