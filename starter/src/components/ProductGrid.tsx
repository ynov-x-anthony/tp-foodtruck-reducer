import { PRODUCTS } from "../data/products";
import { ProductCard } from "./ProductCard";

const CATEGORY_LABELS = {
  burger: "🍔 Burgers",
  side: "🍟 Accompagnements",
  drink: "🥤 Boissons",
} as const;

export function ProductGrid() {
  return (
    <div className="flex flex-col gap-6">
      {/* Object.keys() renvoie string[] par défaut : le cast en
          Array<keyof typeof CATEGORY_LABELS> redonne à TypeScript le type
          précis ("burger" | "side" | "drink") pour indexer CATEGORY_LABELS
          sans erreur plus bas. */}
      {(Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>).map((category) => (
        <section key={category}>
          <h2 className="mb-2 text-lg font-semibold text-slate-800">
            {CATEGORY_LABELS[category]}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PRODUCTS.filter((product) => product.category === category).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
