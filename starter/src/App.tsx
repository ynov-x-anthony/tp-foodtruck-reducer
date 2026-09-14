import { CartProvider } from "./context/CartContext";
import { Header } from "./components/Header";
import { ProductGrid } from "./components/ProductGrid";
import { CartPanel } from "./components/CartPanel";

function App() {
  return (
    // CartProvider entoure tout l'arbre : ProductGrid et CartPanel peuvent
    // donc appeler useCart() sans que le state/dispatch ne soit passé
    // manuellement en props à chaque niveau (pas de "prop drilling").
    <CartProvider>
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="mx-auto grid max-w-5xl grid-cols-1 gap-6 p-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <ProductGrid />
          </div>
          <CartPanel />
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
