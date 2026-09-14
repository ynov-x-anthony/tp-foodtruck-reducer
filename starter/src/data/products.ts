import type { Product } from "../types";

// Catalogue statique du foodtruck. En vrai projet ça viendrait d'une API,
// mais ce n'est pas le sujet de ce workshop : on se concentre sur la
// gestion d'état du panier, pas sur le fetch de données.
export const PRODUCTS: Product[] = [
  { id: "burger-classic", name: "Classic Burger", price: 7.5, category: "burger", emoji: "🍔" },
  { id: "burger-cheese", name: "Cheeseburger", price: 8.5, category: "burger", emoji: "🧀" },
  { id: "burger-veggie", name: "Veggie Burger", price: 8, category: "burger", emoji: "🥬" },
  { id: "side-fries", name: "Frites", price: 3.5, category: "side", emoji: "🍟" },
  { id: "side-onion-rings", name: "Onion Rings", price: 4, category: "side", emoji: "🧅" },
  { id: "drink-soda", name: "Soda", price: 2.5, category: "drink", emoji: "🥤" },
  { id: "drink-lemonade", name: "Limonade maison", price: 3, category: "drink", emoji: "🍋" },
  { id: "drink-water", name: "Eau", price: 1.5, category: "drink", emoji: "💧" },
];
