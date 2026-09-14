import type { Product } from "../types";
import { useCart } from "../context/CartContext";

export function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart();

  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{product.emoji}</span>
        <div>
          <p className="font-medium text-slate-900">{product.name}</p>
          <p className="text-sm text-slate-500">{product.price.toFixed(2)} €</p>
        </div>
      </div>
      <button
        type="button"
        // Forme exacte attendue par CartAction["ADD_ITEM"] (voir types.ts) :
        // le reducer lit `action.product`, pas `action.payload`.
        onClick={() => dispatch({ type: "ADD_ITEM", product })}
        className="rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-orange-600"
      >
        Ajouter
      </button>
    </div>
  );
}
