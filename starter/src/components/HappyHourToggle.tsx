import { useCart } from "../context/CartContext";

export function HappyHourToggle() {
  const { state, dispatch } = useCart();

  return (
    <button
      type="button"
      // Action sans payload : le reducer se contente d'inverser
      // state.happyHour, aucune donnée supplémentaire à transporter.
      onClick={() => dispatch({ type: "TOGGLE_HAPPY_HOUR" })}
      className={`w-full rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
        state.happyHour
          ? "bg-amber-400 text-amber-950"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }`}
    >
      🎉 Happy Hour {state.happyHour ? "activée (-50% boissons)" : "désactivée"}
    </button>
  );
}
