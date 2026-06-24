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
    text: "The quality of every piece I've ordered has been exceptional. The ceramic pour-over.",
  },
  {
    id: 2,
    name: "Theo Nakamura",
    location: "Portland",
    avatar: "https://i.scdn.co/image/ab67616d00001e0269e7e306e623b22f1aad772d",
    rating: 5,
    text: "Lumière has completely changed how I think about my home. Thoughtful design at a price that",
  },
  {
    id: 3,
    name: "Sofia Reyes",
    location: "Barcelona",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/7/78/Sof%C3%ADa_Reyes_2016.jpg",
    rating: 5,
    text: "Fast shipping, beautiful packaging, and the products look even better in person. I've gifted these to everyone I know.",
  },
];

const valueProps = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary delivery on all orders over $75. No codes needed.",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    description: "Not in love? Return anything within 30 days, no questions asked.",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "Every product is curated and tested before it reaches our shelves.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Real humans available 7 days a week to help with anything.",
  },
];

const featuredCollections = [
  {
    id: 1,
    title: "The Morning Ritual",
    subtitle: "Home & Living",
    description: "Start every day with intention. Ceramics, linens, and tools that make mornings worth waking up for.",
    image: "https://images.squarespace-cdn.com/content/v1/668f3bf6f1fed363b0872c2b/9839fd26-ce71-47da-a376-6410812391ee/Lumiere+logo.png",
    cta: "Explore Collection",
    accent: "bg-amber-50",
    textAccent: "text-amber-700",
  },
  {
    id: 2,
    title: "Carry With You",
    subtitle: "Accessories",
    description: "Refined everyday carry. Leather goods and tech accessories built to last a decade.",
    image: "https://m.media-amazon.com/images/M/MV5BZjRkYjc2NmYtZTE5OC00MGExLTk1M2ItNjUwZTJjYWRjZGUxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    cta: "Shop Accessories",
    accent: "bg-indigo-50",
    textAccent: "text-indigo-700",
  },
];

// ─── Badge component ───────────────────────────────────────────────────────

const badgeStyles: Record<string, string> = {
  Sale: "bg-rose-100 text-rose-700",
  New: "bg-emerald-100 text-emerald-700",
  Featured: "bg-indigo-100 text-indigo-700",
  Bestseller: "bg-amber-100 text-amber-700",
};

// ─── Star rating ───────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={12}
            className={
              i <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200"
            }
          />
        ))}
      </div>
      <span className="text-xs text-slate-500">
        {rating.toFixed(1)} ({count})
      </span>
    </div>
  );
}

// ─── Product card ──────────────────────────────────────────────────────────

const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)" },
  hover: { y: -6, boxShadow: "0 4px 8px rgba(0,0,0,0.06), 0 20px 40px -12px rgba(0,0,0,0.16)" },
};

function ProductCard({ product }: { product: typeof products[0] }) {
  const [wished, setWished] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group relative bg-white rounded-2xl overflow-hidden border border-black/5 cursor-pointer"
      style={{ willChange: "transform" }}
    >
      <motion.div variants={cardHover} className="h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.badge && (
            <span
              className={`absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full ${badgeStyles[product.badge] ?? ""}`}
            >
              {product.badge}
            </span>
          )}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setWished((w) => !w)}
            aria-label="Wishlist"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-black/5 flex items-center justify-center shadow-sm transition-all duration-200 hover:bg-white"
          >
            <Heart
              size={14}
              className={wished ? "fill-rose-500 text-rose-500" : "text-slate-400"}
            style={{ color: "#00000a" }}
            />
          </motion.button>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          <p className="text-[11px] font-medium tracking-widest uppercase text-indigo-500">
            {product.category}
          </p>
          <h3 className="font-semibold text-slate-900 text-sm leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed flex-1">
            {product.description}
          </p>
          <StarRating rating={product.rating} count={product.reviewCount} />
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-slate-900">
                ${product.price}
              </span>
              {product.originalPrice != null && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors duration-200"
            >
              <ShoppingBag size={12} />
              Add
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 pt-16">
        {/* Subtle mesh glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-indigo-100/50 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-50/60 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                <Sparkles size={12} />
                New arrivals for Spring 2025
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.08] text-balance"
            >
              Objects worth
              <br />
              <span className="text-indigo-600">living with.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-500 leading-relaxed max-w-md text-pretty"
            style={{ color: "#1071f9" }}
            >
              Lumière curates home goods, accessories, and wellness products
              designed to last. No fast fashion, no throwaway pieces. Just
              things you'll reach for every day.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex items-center gap-4 flex-wrap">
              <motion.a
                href="#products"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 shadow-[0_4px_14px_rgba(99,102,241,0.35)]"
              >
                <ShoppingBag size={16} />
                {brand.cta}
              </motion.a>
              <motion.a
                href="#about"
                whileHover={{ x: 4 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors duration-200"
              >
                Our story
                <ChevronRight size={16} />
              </motion.a>
            </motion.div>

            {/* Social proof strip */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-4 pt-2"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden"
                  >
                    <img
                      src={`/images/avatar-customer-${i}.jpg`}
                      alt={`Customer ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Loved by <span className="font-semibold text-slate-700">12,000+</span> customers
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right image grid */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="relative grid grid-cols-2 gap-4"
          >
            <div className="flex flex-col gap-4 mt-8">
              <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.14)] border border-black/5">
                <img
                  src="https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg"
                  alt="Ceramic Pour-Over Set"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.14)] border border-black/5">
                <img
                  src="https://vulkit.com/cdn/shop/files/1-2_0bdb10b2-9d72-49d5-8a7f-d90826d37359.jpg?v=1739068111&width=1800"
                  alt="Leather Card Holder"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl overflow-hidden aspect-square shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.14)] border border-black/5">
                <img
                  src="https://m.media-amazon.com/images/I/81Ez4LqQS2L.jpg"
                  alt="Linen Throw Pillow Set"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.14)] border border-black/5">
                <img
                  src="https://i.etsystatic.com/18396026/r/il/269bc5/2056444760/il_fullxfull.2056444760_4tcv.jpg"
                  alt="Walnut Desk Organizer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.14)] border border-black/5 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
                <ShoppingBag size={16} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">New drop</p>
                <p className="text-[11px] text-slate-500">Spring 2025 is live</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Value props ───────────────────────────────────────────── */}
      <section className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {valueProps.map((vp) => (
              <motion.div
                key={vp.title}
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                  <vp.icon size={18} className="text-indigo-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{vp.title}</p>
                  <p className="text-xs text-slate-400 leading-relaxed mt-0.5 hidden sm:block">
                    {vp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Featured collections ──────────────────────────────────── */}
      <section id="categories" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-14"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs font-semibold tracking-widest uppercase text-indigo-500 mb-3"
            >
              Collections
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 tracking-tight text-balance"
            >
              Curated for how you live
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredCollections.map((col, i) => (
              <motion.div
                key={col.id}
                variants={i === 0 ? slideInLeft : slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-3xl overflow-hidden ${col.accent} border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] group cursor-pointer`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 min-h-[320px]">
                  <div className="p-8 md:p-10 flex flex-col justify-between">
                    <div>
                      <span className={`text-xs font-semibold tracking-widest uppercase ${col.textAccent}`}>
                        {col.subtitle}
                      </span>
                      <h3 className="font-playfair text-2xl md:text-3xl font-bold text-slate-900 mt-2 mb-3 leading-tight">
                        {col.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {col.description}
                      </p>
                    </div>
                    <motion.a
                      href="#products"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      whileHover={{ x: 4 }}
                      className={`inline-flex items-center gap-2 text-sm font-semibold mt-6 ${col.textAccent} transition-all duration-200`}
                    >
                      {col.cta}
                      <ArrowRight size={14} />
                    </motion.a>
                  </div>
                  <div className="relative overflow-hidden min-h-[200px] sm:min-h-0">
                    <img
                      src={col.image}
                      alt={col.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products grid ─────────────────────────────────────────── */}
      <section id="products" className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
          >
            <div>
              <motion.p
                variants={fadeInUp}
                className="text-xs font-semibold tracking-widest uppercase text-indigo-500 mb-3"
              >
                Shop
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
              >
                Featured products
              </motion.h2>
            </div>
            <motion.a
              variants={fadeIn}
              href="#products"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-200 shrink-0"
            >
              View all
              <ArrowRight size={14} />
            </motion.a>
          </motion.div>

          {/* Category filter */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="flex items-center gap-2 flex-wrap mb-10"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                variants={scaleIn}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-[0_4px_14px_rgba(99,102,241,0.3)]"
                    : "bg-white text-slate-600 border-black/8 hover:border-indigo-200 hover:text-indigo-600"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {(filtered ?? []).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <ShoppingBag size={40} className="mx-auto mb-4 opacity-30" />
              <p className="text-sm">No products in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Sale banner ───────────────────────────────────────────── */}
      <section id="sale" className="py-20 bg-indigo-600 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-800/40 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <span className="inline-block bg-white/15 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-5">Our seasonal sale is live. Discover reduced prices on home goods, apparel, and accessories</span>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
                Up to 30% off
                <br />
                select pieces.
              </h2>
              <p className="text-indigo-200 text-base leading-relaxed mb-8 max-w-md">
                Our seasonal sale is live. Discover reduced prices on home
                goods, apparel, and accessories. While stocks last.
              </p>
              <motion.a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveCategory("All");
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors duration-200 shadow-[0_4px_14px_rgba(0,0,0,0.15)]"
              >
                Shop the sale
                <ArrowRight size={16} />
              </motion.a>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-2 gap-4"
            >
              {products
                .filter((p) => p.badge === "Sale")
                .slice(0, 4)
                .map((p) => (
                  <motion.div
                    key={p.id}
                    whileHover={{ scale: 1.03 }}
                    className="rounded-2xl overflow-hidden aspect-square border border-white/20 shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs font-semibold tracking-widest uppercase text-indigo-500 mb-3"
            >
              Reviews
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
            >
              What our customers say
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl p-7 border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] ${
                  i === 1 ? "bg-indigo-600 text-white" : "bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      className={
                        i === 1
                          ? "fill-amber-300 text-amber-300"
                          : "fill-amber-400 text-amber-400"
                      }
                    />
                  ))}
                </div>
                <p
                  className={`text-sm leading-relaxed mb-6 ${
                    i === 1 ? "text-indigo-100" : "text-slate-600"
                  }`}
                >
                  {t.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        i === 1 ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {t.name}
                    </p>
                    <p
                      className={`text-xs ${
                        i === 1 ? "text-indigo-200" : "text-slate-400"
                      }`}
                    >
                      {t.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── About / Brand story ───────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image collage */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.14)] border border-black/5">
                  <img
                    src="https://images.squarespace-cdn.com/content/v1/668f3bf6f1fed363b0872c2b/9839fd26-ce71-47da-a376-6410812391ee/Lumiere+logo.png"
                    alt="Lumière brand story"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-4 mt-10">
                  <div className="rounded-2xl overflow-hidden aspect-square shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.14)] border border-black/5">
                    <img
                      src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/assets/65ee8db8-3d2e-4d81-b718-fea6084c292c/ae1dcf0b93c141b5aeb1b8896d08febf.png"
                      alt="Wellness products"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden aspect-square shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.14)] border border-black/5">
                    <img
                      src="https://u-mercari-images.mercdn.net/photos/m95759376336_5.jpg?1765670898"
                      alt="Apparel collection"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Stat badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                className="absolute -bottom-4 right-4 bg-white rounded-2xl px-5 py-4 shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.14)] border border-black/5"
              >
                <p className="font-playfair text-3xl font-bold text-slate-900">12k+</p>
                <p className="text-xs text-slate-500 mt-0.5">Happy customers</p>
              </motion.div>
            </motion.div>

            {/* Copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-6"
            >
              <motion.p
                variants={fadeInUp}
                className="text-xs font-semibold tracking-widest uppercase text-indigo-500"
              >
                Our story
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight text-balance"
              >
                Designed to last.
                <br />
                Made to be used.
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-slate-500 leading-relaxed text-pretty"
              >
                Lumière was founded on a simple belief: the objects around you
                shape how you feel. We partner with independent makers and
                small-batch manufacturers to bring you pieces that are
                thoughtfully designed, responsibly made, and built to outlast
                trends.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-slate-500 leading-relaxed text-pretty"
              >
                Every product in our catalog is personally tested by our team.
                If we wouldn't keep it in our own homes, it doesn't make the
                cut.
              </motion.p>

              <motion.ul variants={staggerContainer} className="flex flex-col gap-3 mt-2">
                {[
                  "Responsibly sourced materials",
                  "Carbon-neutral shipping on all orders",
                  "1% of revenue donated to reforestation",
                  "Packaging that's 100% recyclable",
                ].map((item) => (
                  <motion.li
                    key={item}
                    variants={fadeInUp}
                    className="flex items-center gap-3 text-sm text-slate-700"
                  >
                    <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                      <Check size={11} className="text-indigo-600" />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              variants={scaleIn}
              className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center"
            >
              <Sparkles size={24} className="text-indigo-600" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 tracking-tight text-balance"
            >
              Get 10% off your first order
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-slate-500 leading-relaxed max-w-md text-pretty"
            >
              Join our community for early access to new arrivals, exclusive
              offers, and stories from the makers behind our products.
            </motion.p>
            <motion.form
              variants={fadeInUp}
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-xl border border-black/10 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 shadow-[0_4px_14px_rgba(99,102,241,0.35)] whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </motion.form>
            <motion.p variants={fadeIn} className="text-xs text-slate-400">
              No spam, ever. Unsubscribe at any time.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}