import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from "react";
import { cartReducer, initialCartState } from "../reducer/cartReducer";
import type { CartAction, CartState } from "../types";

interface CartContextValue {
  state: CartState;
  dispatch: Dispatch<CartAction>;
}

// On initialise le Context à `null` plutôt qu'à une fausse valeur par
// défaut (un faux `dispatch` qui ne ferait rien, par exemple). Ça permet à
// `useCart()` de détecter - et d'interdire clairement - un usage en dehors
// du <CartProvider>, au lieu de laisser un bug silencieux se produire.
const CartContext = createContext<CartContextValue | null>(null);

/**
 * Fournit le state du panier + son dispatch à tout l'arbre de composants
 * placé sous lui. C'est la combinaison useReducer + Context :
 * - useReducer centralise la LOGIQUE de mise à jour (le reducer).
 * - Context rend `state`/`dispatch` accessibles PARTOUT sans "prop
 *   drilling" (sans les faire passer manuellement de composant en
 *   composant).
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
}

/**
 * Hook personnalisé pour consommer le panier. Les composants qui
 * l'utilisent n'ont besoin de connaître ni le reducer, ni la structure
 * interne du Context : juste `const { state, dispatch } = useCart()`.
 */
export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (context === null) {
    // Erreur volontairement explicite : sans elle, `context` vaudrait
    // `null` et `context.state` planterait plus loin avec un message
    // TypeScript/JS bien moins clair ("Cannot read properties of null").
    throw new Error("useCart() doit être appelé à l'intérieur d'un <CartProvider>.");
  }

  return context;
}
