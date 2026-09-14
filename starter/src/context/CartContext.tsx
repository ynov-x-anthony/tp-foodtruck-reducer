import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from "react";
import { cartReducer, initialCartState } from "../reducer/cartReducer";
import type { CartAction, CartState } from "../types";

interface CartContextValue {
  state: CartState;
  dispatch: Dispatch<CartAction>;
}

// On initialise le Context à `null` plutôt qu'à une fausse valeur par
// défaut : ça permet à `useCart()` (plus bas) de détecter clairement un
// usage en dehors du <CartProvider>, au lieu de laisser un bug silencieux
// se produire.
const CartContext = createContext<CartContextValue | null>(null);

// ----------------------------------------------------------------------------
// 🔧 TODO 3 : useReducer + Context
// ----------------------------------------------------------------------------
// C'est ici que useReducer et Context se rejoignent : useReducer centralise
// la LOGIQUE de mise à jour (le reducer que tu as écrit au TODO 2), Context
// rend `state`/`dispatch` accessibles PARTOUT dans l'arbre sans "prop
// drilling". Inspire-toi du ThemeContext vu en cours (support useReducer,
// diapo "THEMECONTEXT AVEC USEREDUCER") : structure identique, domaine
// différent.
export function CartProvider({ children }: { children: ReactNode }) {
  // TODO 3.1 : appelle useReducer avec `cartReducer` et `initialCartState`
  // pour obtenir `state` et `dispatch`. (Import à ajouter : `useReducer`
  // depuis "react".)
  const [state, dispatch] = useReducer(cartReducer,initialCartState);


  // TODO 3.2 : remplace le fragment ci-dessous par
  // <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>; // 🔧 à remplacer (c'est remplacer)
}

/**
 * Hook personnalisé pour consommer le panier. Les composants qui
 * l'utilisent n'ont besoin de connaître ni le reducer, ni la structure
 * interne du Context : juste `const { state, dispatch } = useCart()`.
 * Déjà fourni, tu n'as rien à changer ici.
 */
export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart() doit être appelé à l'intérieur d'un <CartProvider>.");
  }

  return context;
}
