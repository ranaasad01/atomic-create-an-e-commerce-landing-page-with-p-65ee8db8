export type NavLink = {
  label: string;
  href: string;
};

export type Brand = {
  name: string;
  tagline: string;
  cta: string;
  ctaHref: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "#products" },
  { label: "Categories", href: "#categories" },
  { label: "Sale", href: "#sale" },
  { label: "About", href: "#about" },
];

export const brand: Brand = {
  name: "Lumière",
  tagline: "Crafted for modern living",
  cta: "Shop Now",
  ctaHref: "#products",
};

export type ProductCategory =
  | "All"
  | "Home & Living"
  | "Accessories"
  | "Wellness"
  | "Tech"
  | "Apparel";

export const categories: ProductCategory[] = [
  "All",
  "Home & Living",
  "Accessories",
  "Wellness",
  "Tech",
  "Apparel",
];

export type Product = {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: "Sale" | "New" | "Featured" | "Bestseller";
  description: string;
};