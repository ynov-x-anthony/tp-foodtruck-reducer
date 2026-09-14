import { useState } from "react";
import { useCart } from "../context/CartContext";

export function DiscountForm() {
  const { state, dispatch } = useCart();
  const [code, setCode] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (code.trim() === "") return;
    // Le formulaire dispatch le code TEL QUEL (sans normaliser la casse) :
    // c'est au reducer de décider ce qui est valide, pas au composant.
    dispatch({ type: "APPLY_DISCOUNT_CODE", code });
    setCode("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1">
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Code promo"
          className="min-w-0 flex-1 rounded-md border border-slate-300 px-2 py-1 text-sm"
        />
        <button
          type="submit"
          className="rounded-md bg-slate-800 px-3 py-1 text-sm font-medium text-white hover:bg-slate-900"
        >
          Appliquer
        </button>
      </div>
      {state.discountCode ? (
        <p className="text-xs text-emerald-600">
          Code {state.discountCode} actif (-{state.discountPercent}%)
        </p>
      ) : (
        <p className="text-xs text-slate-400">Essaie ETUDIANT10 ou CAMPUS20</p>
      )}
    </form>
  );
}
