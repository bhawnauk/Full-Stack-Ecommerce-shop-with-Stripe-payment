export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Classic Dill Pickles",
    description: "Crunchy, tangy and packed with fresh dill.",
    price: 12.5,
    image:
      "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80",
    category: "Classic",
  },
  {
    id: 2,
    name: "Spicy Jalapeño Pickles",
    description: "A fiery twist for those who like a little heat.",
    price: 14.0,
    image:
      "https://images.unsplash.com/photo-1589135233689-5f3b5d4b9c8d?auto=format&fit=crop&w=800&q=80",
    category: "Spicy",
  },
  {
    id: 3,
    name: "Garlic & Herb Pickles",
    description: "Bold garlic flavour with a fragrant herb finish.",
    price: 13.5,
    image:
      "https://images.unsplash.com/photo-1599909533730-f9d5d8c1b8f0?auto=format&fit=crop&w=800&q=80",
    category: "Specialty",
  },
];