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

// Le provider garde le state du panier avec useReducer et le partage
// à tous les composants enfants grâce au Context
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
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
