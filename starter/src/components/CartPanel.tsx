import { useCart } from "../context/CartContext";
import { getDiscountAmount, getSubtotal, getTotal } from "../reducer/cartSelectors";
import { CartLineRow } from "./CartLineRow";
import { DiscountForm } from "./DiscountForm";
import { HappyHourToggle } from "./HappyHourToggle";

export function CartPanel() {
  const { state, dispatch } = useCart();
  // subtotal/discountAmount/total sont recalculés à CHAQUE render à partir
  // de state.lines/discountPercent/happyHour : rien de tout ça n'est stocké
  // dans le state lui-même (voir la remarque dans types.ts).
  const subtotal = getSubtotal(state);
  const discountAmount = getDiscountAmount(state);
  const total = getTotal(state);

  return (
    <aside className="flex h-fit flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">🧾 Ma commande</h2>
        {state.lines.length > 0 && (
          <button
            type="button"
            onClick={() => dispatch({ type: "RESET_CART" })}
            className="text-xs text-slate-400 hover:text-red-500"
          >
            Vider le panier
          </button>
        )}
      </div>

      {state.lines.length === 0 ? (
        <p className="text-sm text-slate-400">Ton panier est vide. Ajoute un produit !</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {state.lines.map((line) => (
            <CartLineRow key={line.product.id} line={line} />
          ))}
        </ul>
      )}

      <HappyHourToggle />
      <DiscountForm />

      <div className="border-t border-slate-200 pt-3 text-sm">
        <div className="flex justify-between text-slate-500">
          <span>Sous-total</span>
          <span>{subtotal.toFixed(2)} €</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-600">
            <span>Réduction</span>
            <span>-{discountAmount.toFixed(2)} €</span>
          </div>
        )}
        <div className="mt-1 flex justify-between text-base font-bold text-slate-900">
          <span>Total</span>
          <span>{total.toFixed(2)} €</span>
        </div>
      </div>
    </aside>
  );
}
