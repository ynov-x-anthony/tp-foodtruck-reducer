import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { CartState, CartAction } from "../types";
import { cartReducer, initialCartState } from "../reducer/cartReducer";

interface CartContextValue {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextValue | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

// ----------------------------------------------------------------------------
// 🔧 TODO 3 : CartProvider (useReducer + Context)
// ----------------------------------------------------------------------------
export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart() doit être appelé au sein d'un CartProvider");
  }

  return context;
}