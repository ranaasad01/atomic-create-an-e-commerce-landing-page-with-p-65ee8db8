"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ShoppingBag, Star, ArrowRight, Shield, Truck, RefreshCw, Headphones, Heart, ChevronRight, Sparkles, Check } from 'lucide-react';
import { brand, categories, type ProductCategory } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline product data ───────────────────────────────────────────────────

const products = [
  {
    id: 1,
    name: "Linen Throw Pillow Set",
    category: "Home & Living" as ProductCategory,
    price: 68,
    originalPrice: 95,
    rating: 4.8,
    reviewCount: 214,
    image: "https://m.media-amazon.com/images/I/81Ez4LqQS2L.jpg",
    badge: "Sale" as const,
    description: "Soft Belgian linen in earthy tones. Set of two.",
  },
  {
    id: 2,
    name: "Ceramic Pour-Over Set",
    category: "Home & Living" as ProductCategory,
    price: 112,
    rating: 4.9,
    reviewCount: 389,
    image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    badge: "Bestseller" as const,
    description: "Hand-thrown stoneware with matte glaze finish.",
  },
  {
    id: 3,
    name: "Merino Wool Scarf",
    category: "Apparel" as ProductCategory,
    price: 89,
    rating: 4.7,
    reviewCount: 156,
    image: "https://arancrafts.com/wp-content/uploads/2016/06/1011-TRADITIONAL-MERINO-WOOL-HONEYCOMB-SCARF.jpg",
    badge: "New" as const,
    description: "Extra-fine 18.5 micron merino in a generous wrap.",
  },
  {
    id: 4,
    name: "Walnut Desk Organizer",
    category: "Home & Living" as ProductCategory,
    price: 145,
    rating: 4.9,
    reviewCount: 97,
    image: "https://i.etsystatic.com/18396026/r/il/269bc5/2056444760/il_fullxfull.2056444760_4tcv.jpg",
    badge: "Featured" as const,
    description: "Solid American walnut with brass hardware.",
  },
  {
    id: 5,
    name: "Amber Glass Diffuser",
    category: "Wellness" as ProductCategory,
    price: 58,
    originalPrice: 72,
    rating: 4.6,
    reviewCount: 302,
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/assets/65ee8db8-3d2e-4d81-b718-fea6084c292c/ae1dcf0b93c141b5aeb1b8896d08febf.png",
    badge: "Sale" as const,
    description: "Ultrasonic diffuser with 12-hour run time.",
  },
  {
    id: 6,
    name: "Leather Card Holder",
    category: "Accessories" as ProductCategory,
    price: 48,
    rating: 4.8,
    reviewCount: 441,
    image: "https://vulkit.com/cdn/shop/files/1-2_0bdb10b2-9d72-49d5-8a7f-d90826d37359.jpg?v=1739068111&width=1800",
    description: "Full-grain vegetable-tanned leather, holds 6 cards.",
  },
  {
    id: 7,
    name: "Wireless Charging Pad",
    category: "Tech" as ProductCategory,
    price: 79,
    rating: 4.7,
    reviewCount: 528,
    image: "https://satechi.com/cdn/shop/products/trio-wireless-charging-pad-charging-stations-satechi-868975.jpg?v=1762440331",
    badge: "New" as const,
    description: "15W fast charge, compatible with all Qi devices.",
  },
  {
    id: 8,
    name: "Linen Waffle Robe",
    category: "Apparel" as ProductCategory,
    price: 128,
    originalPrice: 160,
    rating: 4.9,
    reviewCount: 183,
    image: "https://u-mercari-images.mercdn.net/photos/m95759376336_5.jpg?1765670898",
    badge: "Sale" as const,
    description: "Lightweight waffle-knit linen, unisex sizing.",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Mara Jensen",
    location: "Copenhagen",
    avatar: "https://www.ageist.com/wp-content/uploads/2024/05/IMG_5448-683x1024.jpg",
    rating: 5,
    text: "The quality of every piece I've ordered has been exceptional. The ceramic pour-over set is a daily ritual now — beautiful and functional.",
  },
  {
    id: 2,
    name: "Theo Nakamura",
    location: "Portland",
    avatar: "https://i.scdn.co/image/ab67616d00001e0269e7e306e623b22f1aad772d",
    rating: 5,
    text: "Lumière has completely changed how I think about my home. Every product feels intentional and well-crafted. Fast shipping too!",
  },
  {
    id: 3,
    name: "Sofia Reyes",
    location: "Barcelona",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    text: "I bought the walnut desk organizer and linen robe — both exceeded my expectations. The attention to detail is remarkable.",
  },
];

// ─── Cart types ────────────────────────────────────────────────────────────

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

// ─── Badge config ──────────────────────────────────────────────────────────

const badgeStyles: Record<string, string> = {
  Sale: "bg-rose-500 text-white",
  New: "bg-indigo-600 text-white",
  Featured: "bg-amber-400 text-slate-900",
  Bestseller: "bg-emerald-500 text-white",
};

// ─── Star renderer ─────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          className={i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}
        />
      ))}
    </div>
  );
}

// ─── Product Card ──────────────────────────────────────────────────────────

function ProductCard({
  product,
  onAddToCart,
}: {
  product: (typeof products)[0];
  onAddToCart: (item: CartItem) => void;
}) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      variants={scaleIn}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-slate-100 aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://placehold.co/400x300/f1f5f9/94a3b8?text=Product";
          }}
        />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
              badgeStyles[product.badge]
            }`}
          >
            {product.badge}
          </span>
        )}
        <button
          onClick={() => setWished((w) => !w)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-label="Wishlist"
        >
          <Heart
            size={15}
            className={wished ? "fill-rose-500 text-rose-500" : "text-slate-400"}
          />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-indigo-600 font-medium mb-1">{product.category}</p>
        <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-1.5 mb-3">
          <Stars rating={product.rating} />
          <span className="text-xs text-slate-400">({product.reviewCount})</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-slate-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all duration-200 ${
              added
                ? "bg-emerald-500 text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {added ? (
              <><Check size={13} /> Added</>
            ) : (
              <><ShoppingBag size={13} /> Add</>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Cart Drawer ───────────────────────────────────────────────────────────

function CartDrawer({
  open,
  onClose,
  items,
  onRemove,
  onUpdateQty,
}: {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQty: (id: number, qty: number) => void;
}) {
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 260 }}
        className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900 text-lg">
            Cart{" "}
            <span className="text-sm font-normal text-slate-400">
              ({items.reduce((s, i) => s + i.quantity, 0)} items)
            </span>
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 text-slate-400">
              <ShoppingBag size={40} strokeWidth={1.2} />
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover bg-slate-100 flex-shrink-0"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://placehold.co/64x64/f1f5f9/94a3b8?text=Item";
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{item.name}</p>
                  <p className="text-sm text-indigo-600 font-semibold">${item.price}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <button
                      onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm flex items-center justify-center transition-colors"
                    >
                      −
                    </button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="ml-auto text-xs text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Subtotal</span>
              <span className="font-bold text-slate-900">${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200">
              Checkout
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("All");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id: number, qty: number) => {
    if (qty < 1) return removeFromCart(id);
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <div className="min-h-screen">
      {/* ── Cart Drawer ── */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQty={updateQty}
      />

      {/* Cart FAB */}
      {cartCount > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-30 bg-indigo-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
          aria-label="Open cart"
        >
          <ShoppingBag size={22} />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 text-slate-900 text-xs font-bold rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        </motion.button>
      )}

      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] bg-amber-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-white"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 mb-6">
              <Sparkles size={14} className="text-amber-400" />
              New arrivals just dropped
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6"
            >
              Crafted for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                Modern
              </span>{" "}
              Living
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-white/70 text-lg leading-relaxed mb-8 max-w-md"
            >
              Discover thoughtfully designed products that bring beauty and
              function to every corner of your life.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors duration-200"
              >
                Shop Now <ArrowRight size={16} />
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors duration-200"
              >
                Our Story
              </a>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center gap-8 mt-12 pt-8 border-t border-white/10">
              {[
                { value: "12k+", label: "Happy customers" },
                { value: "4.9★", label: "Average rating" },
                { value: "Free", label: "Shipping over $75" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/50 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — hero product mosaic */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {products.slice(0, 4).map((p, i) => (
              <motion.div
                key={p.id}
                variants={scaleIn}
                className={`rounded-2xl overflow-hidden ${
                  i === 0 ? "col-span-2 aspect-[16/7]" : "aspect-square"
                }`}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://placehold.co/600x300/1e293b/64748b?text=Lumière";
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, label: "Free Shipping", sub: "On orders over $75" },
              { icon: RefreshCw, label: "30-Day Returns", sub: "Hassle-free policy" },
              { icon: Shield, label: "Secure Checkout", sub: "256-bit encryption" },
              { icon: Headphones, label: "24/7 Support", sub: "Always here to help" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 py-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{label}</p>
                  <p className="text-xs text-slate-400">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section id="products" className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-indigo-600 font-medium text-sm tracking-widest uppercase mb-3">
              Our Collection
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-playfair text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Shop the Edit
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 max-w-xl mx-auto">
              Thoughtfully curated pieces for every room and every routine.
            </motion.p>
          </motion.div>

          {/* Search + Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <p className="text-lg">No products found.</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="mt-3 text-indigo-600 text-sm hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Promo Banner ── */}
      <section id="sale" className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <motion.div variants={slideInLeft} className="text-white text-center md:text-left">
              <p className="text-indigo-200 text-sm font-medium uppercase tracking-widest mb-2">Limited Time</p>
              <h2 className="font-playfair text-4xl sm:text-5xl font-bold mb-3">
                Up to 30% Off
              </h2>
              <p className="text-indigo-200 max-w-md">
                Shop our curated sale selection — premium quality at exceptional value.
              </p>
            </motion.div>
            <motion.div variants={slideInRight}>
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveCategory("All");
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors duration-200 text-lg shadow-lg"
              >
                Shop Sale <ArrowRight size={20} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-indigo-600 font-medium text-sm tracking-widest uppercase mb-3">
              Reviews
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-playfair text-4xl sm:text-5xl font-bold text-slate-900">
              What Our Customers Say
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                className="bg-stone-50 rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className={`text-slate-700 leading-relaxed text-sm${
                  t.name === "Mara Jensen" ? " text-green-600" : ""
                }`}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover bg-slate-200"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://placehold.co/40x40/e2e8f0/94a3b8?text=" + t.name[0];
                    }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600/20 mb-6">
              <Sparkles size={22} className="text-indigo-400" />
            </motion.div>
            <motion.h2 variants={fadeInUp} className="font-playfair text-4xl font-bold text-white mb-4">
              Stay in the Loop
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 mb-8">
              Get early access to new arrivals, exclusive offers, and curated
              style inspiration — straight to your inbox.
            </motion.p>

            {subscribed ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-6 py-3 rounded-xl font-medium"
              >
                <Check size={18} /> You're subscribed!
              </motion.div>
            ) : (
              <motion.form
                variants={fadeInUp}
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </motion.form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
