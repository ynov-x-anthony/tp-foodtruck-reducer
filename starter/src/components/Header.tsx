// Purement statique : aucun state, aucun useCart(). Un composant qui
// n'a pas besoin du panier n'a pas à le connaître.
export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4">
      <h1 className="text-2xl font-bold text-slate-900">🚚 Le Foodtruck Ynov</h1>
      <p className="text-sm text-slate-500">Workshop useReducer : composez une commande</p>
    </header>
  );
}
