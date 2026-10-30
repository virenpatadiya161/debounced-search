export type Product = { id: number; name: string };

const names = ['Laptop', 'Phone', 'Headphones', 'Keyboard', 'Mouse', 'Monitor', 'Camera', 'Speaker'];

// Generate a large mock list instead of writing thousands of entries.
export const products: Product[] = Array.from({ length: 5000 }, (_, index) => ({
  id: index + 1,
  name: `${names[index % names.length]} ${index + 1}`,
}));
