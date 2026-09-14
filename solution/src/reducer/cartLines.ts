import type { CartLine, Product } from "../types";

// Ces fonctions manipulent UNIQUEMENT le tableau `lines`, toujours de façon
// immutable (jamais de push, jamais de `line.quantity++`). Elles sont
// fournies pour que tu puisses te concentrer sur le vrai sujet du TP :
// QUAND et COMMENT le reducer déclenche un changement d'état, pas sur la
// mécanique .map()/.filter()/.find() elle-même.

/** Ajoute une unité de `product` : incrémente la ligne existante, ou en crée une nouvelle (quantity: 1). */
export function addLine(lines: CartLine[], product: Product): CartLine[] {
	const existingLine = lines.find((line) => line.product.id === product.id);

	if (existingLine) {
		return lines.map((line) =>
			line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line,
		);
	}

	return [...lines, { product, quantity: 1 }];
}

/** +1 sur la ligne dont `product.id === productId`. Ne fait rien si la ligne n'existe pas. */
export function incrementLine(lines: CartLine[], productId: string): CartLine[] {
	return lines.map((line) =>
		line.product.id === productId ? { ...line, quantity: line.quantity + 1 } : line,
	);
}

/** -1 sur la ligne concernée ; la retire entièrement si sa quantité tombe à 0. */
export function decrementLine(lines: CartLine[], productId: string): CartLine[] {
	return lines
		.map((line) => (line.product.id === productId ? { ...line, quantity: line.quantity - 1 } : line))
		.filter((line) => line.quantity > 0);
}

/** Retire complètement la ligne dont `product.id === productId`, quelle que soit sa quantité. */
export function removeLine(lines: CartLine[], productId: string): CartLine[] {
	return lines.filter((line) => line.product.id !== productId);
}
