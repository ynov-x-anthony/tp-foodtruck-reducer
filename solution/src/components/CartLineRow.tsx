import type { CartLine } from "../types";
import { useCart } from "../context/CartContext";
import { getLinePrice } from "../reducer/cartSelectors";

export function CartLineRow({ line }: { line: CartLine }) {
  const { state, dispatch } = useCart();
  // getLinePrice a besoin de state.happyHour (pas seulement de `line`) car
  // la remise happy hour ne s'applique qu'aux boissons : le prix d'une
  // ligne dépend donc à la fois de la ligne ET d'un flag global du panier.
  const linePrice = getLinePrice(line, state.happyHour);

  return (
    <li className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm font-medium text-slate-900">
          {line.product.emoji} {line.product.name}
        </p>
        <p className="text-xs text-slate-500">{linePrice.toFixed(2)} €</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Retirer une unité de ${line.product.name}`}
          onClick={() => dispatch({ type: "DECREMENT_ITEM", productId: line.product.id })}
          className="h-7 w-7 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-100"
        >
          −
        </button>
        <span className="w-5 text-center text-sm font-semibold">{line.quantity}</span>
        <button
          type="button"
          aria-label={`Ajouter une unité de ${line.product.name}`}
          onClick={() => dispatch({ type: "INCREMENT_ITEM", productId: line.product.id })}
          className="h-7 w-7 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-100"
        >
          +
        </button>
        <button
          type="button"
          aria-label={`Retirer ${line.product.name} du panier`}
          onClick={() => dispatch({ type: "REMOVE_ITEM", productId: line.product.id })}
          className="ml-1 text-slate-400 hover:text-red-500"
        >
          🗑
        </button>
      </div>
    </li>
  );
}
