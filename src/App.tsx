/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Search, ShoppingBag, Menu, X, ArrowRight, Star, Bookmark } from "lucide-react";

// --- Types ---
interface Book {
  id: string;
  title: string;
  author: string;
  price: string;
  rating: number;
  image: string;
  category: string;
  description: string;
}

// --- Mock Data ---
const BOOKS: Book[] = [
  {
    id: "1",
    title: "The Silent Weaver",
    author: "Elena Rossi",
    price: "$24.00",
    rating: 4.8,
    image: "https://picsum.photos/seed/book1/600/800",
    category: "Literary Fiction",
    description: "A profound exploration of silence and craft in the Italian Alps."
  },
  {
    id: "2",
    title: "Structures of Light",
    author: "Tadao Ando",
    price: "$65.00",
    rating: 4.9,
    image: "https://picsum.photos/seed/book2/600/800",
    category: "Architecture",
    description: "A definitive collection of architectural masterpieces and their philosophy."
  },
  {
    id: "3",
    title: "The Modern Curator",
    author: "Julian Barnes",
    price: "$18.50",
    rating: 4.5,
    image: "https://picsum.photos/seed/book3/600/800",
    category: "Essays",
    description: "Meditations on art, collecting, and the digital age."
  },
  {
    id: "4",
    title: "Ephemeral Cities",
    author: "Saskia Sassen",
    price: "$32.00",
    rating: 4.7,
    image: "https://picsum.photos/seed/book4/600/800",
    category: "Sociology",
    description: "How urban environments shape our perception of time and space."
  },
  {
    id: "5",
    title: "Winter Botanicals",
    author: "Linnaeus Thorne",
    price: "$45.00",
    rating: 4.6,
    image: "https://picsum.photos/seed/book5/600/800",
    category: "Nature",
    description: "A beautifully illustrated guide to northern flora in the cold season."
  },
  {
    id: "6",
    title: "Abstract Logic",
    author: "Noam Chomsky",
    price: "$28.00",
    rating: 4.4,
    image: "https://picsum.photos/seed/book6/600/800",
    category: "Philosophy",
    description: "Revisiting the foundations of structural linguistics and mind."
  }
];

const CATEGORIES = ["All", "Literary Fiction", "Architecture", "Essays", "Sociology", "Nature", "Philosophy"];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredBooks = selectedCategory === "All" 
    ? BOOKS 
    : BOOKS.filter(b => b.category === selectedCategory);

  return (
    <div className="min-h-screen selection:bg-aurum-accent selection:text-aurum-bg">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          scrolled ? "bg-aurum-bg/80 backdrop-blur-xl border-aurum-ink/10 py-4" : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-8"
          >
            <a href="/" className="text-2xl font-serif font-bold tracking-tight">AURUM</a>
            <div className="hidden md:flex gap-6">
              {["Library", "Collections", "About", "Journal"].map((item) => (
                <a 
                  key={item} 
                  href="#" 
                  className="text-[11px] uppercase tracking-[0.2em] font-medium opacity-60 hover:opacity-100 transition-opacity"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <button className="opacity-60 hover:opacity-100 transition-opacity"><Search size={20} /></button>
            <button className="relative opacity-60 hover:opacity-100 transition-opacity">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-aurum-accent rounded-full border-2 border-aurum-bg"></span>
            </button>
            <button 
              className="md:hidden opacity-60 hover:opacity-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </motion.div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-aurum-bg pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 text-4xl font-serif">
              {["Library", "Collections", "About", "Journal"].map((item) => (
                <motion.a 
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  href="#"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop" 
              className="w-full h-full object-cover opacity-80"
              alt="Bookstore library"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-linear-to-b from-aurum-bg/20 via-transparent to-aurum-bg"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex flex-col gap-4">
                <span className="text-[11px] uppercase tracking-[0.5em] opacity-60 font-semibold mb-2">Curated for the Curious</span>
                <h1 className="text-[15vw] md:text-[10vw] font-serif leading-[0.85] tracking-tighter mb-8">
                  Discovery <br /> Meets Design
                </h1>
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                  <p className="max-w-md text-aurum-muted leading-relaxed italic border-l border-aurum-ink/20 pl-6">
                    A minimalist platform for those who believe a book is more than just paper and ink. Explore our curated sanctuary of titles.
                  </p>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group bg-aurum-ink text-aurum-bg px-8 py-5 rounded-full flex items-center gap-3 text-sm tracking-widest uppercase"
                  >
                    Explore Library
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Collections / Categories */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-lg">
              <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">Featured Collections</h2>
              <p className="text-aurum-muted leading-relaxed">
                Our staff spends hours meticulously selecting every title that joins our library. 
                Focusing on design, depth, and lasting cultural relevance.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-300 border ${
                    selectedCategory === cat 
                      ? "bg-aurum-ink text-aurum-bg border-aurum-ink" 
                      : "bg-transparent text-aurum-muted border-aurum-muted/20 hover:border-aurum-ink/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20"
          >
            <AnimatePresence mode="popLayout">
              {filteredBooks.map((book, idx) => (
                <motion.div
                  layout
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-white shadow-2xl">
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                      src={book.image} 
                      alt={book.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-aurum-bg/90 backdrop-blur-md p-3 rounded-full hover:bg-aurum-ink hover:text-aurum-bg transition-colors">
                        <Bookmark size={18} />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-aurum-ink/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-white/80 text-sm italic">{book.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-serif font-medium">{book.title}</h3>
                      <span className="text-sm font-medium">{book.price}</span>
                    </div>
                    <p className="text-sm opacity-50 uppercase tracking-widest">{book.author}</p>
                    <div className="flex items-center gap-4 pt-4 border-t border-aurum-ink/5">
                      <span className="text-[10px] uppercase tracking-widest bg-aurum-accent/10 text-aurum-accent px-2 py-0.5 rounded">
                        {book.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star size={10} className="fill-aurum-accent stroke-aurum-accent" />
                        <span className="text-[10px] font-bold">{book.rating}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Curator Quote */}
        <section className="bg-aurum-ink text-aurum-bg py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-3xl md:text-5xl font-serif italic mb-12 leading-tight">
                "A room without books is like a body without a soul. We curate not just for the shelf, but for the spirit."
              </h3>
              <div className="flex flex-col items-center">
                <div className="w-12 h-px bg-aurum-bg/30 mb-6"></div>
                <span className="text-[11px] uppercase tracking-[0.5em] font-semibold">Staff Selection No. 42</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Journal Section */}
        <section className="py-32 max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <span className="text-[11px] uppercase tracking-[0.5em] opacity-60 font-semibold mb-4 block">The Journal</span>
            <h2 className="text-5xl md:text-7xl font-serif">Literary Insights</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="aspect-video overflow-hidden mb-8 border border-aurum-ink/10">
                <img 
                  src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1200&auto=format&fit=crop" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt="Journal entry 1"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 block mb-4">May 12, 2024 — Reading Culture</span>
              <h4 className="text-3xl font-serif mb-6 group-hover:italic transition-all">The Renaissance of Printed Matter</h4>
              <p className="text-aurum-muted leading-relaxed mb-8">
                In an increasingly digital world, the physical book remains an anchor to reality. 
                We explore why tactile experiences matter more than ever...
              </p>
              <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold border-b border-aurum-ink pb-1">
                Read Article
              </button>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="group cursor-pointer md:mt-24"
            >
              <div className="aspect-video overflow-hidden mb-8 border border-aurum-ink/10">
                <img 
                  src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt="Journal entry 2"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 block mb-4">April 28, 2024 — Curated Spaces</span>
              <h4 className="text-3xl font-serif mb-6 group-hover:italic transition-all">Design as a Dialogue</h4>
              <p className="text-aurum-muted leading-relaxed mb-8">
                How architecture and literature inform each other. An interview with Pritzker-winner 
                Tadao Ando on the spiritual power of libraries.
              </p>
              <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold border-b border-aurum-ink pb-1">
                Read Article
              </button>
            </motion.div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-32 border-t border-aurum-ink/10">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-serif mb-8">Stay Insightful</h2>
            <p className="text-aurum-muted mb-12">
              Subscribe to our monthly newsletter for a hand-picked selection of new arrivals, 
              journal entries, and exclusive invitations to library events.
            </p>
            <form className="flex border-b border-aurum-ink py-2">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent flex-1 text-xs uppercase tracking-widest outline-hidden"
              />
              <button className="text-[10px] uppercase tracking-widest font-bold hover:opacity-100 opacity-60">Subscribe</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-aurum-bg py-24 border-t border-aurum-ink/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-serif font-bold mb-8 italic">AURUM</h3>
            <p className="text-xs text-aurum-muted leading-loose tracking-wide">
              Established 2024.<br />
              London / Digital Sanctuary.<br />
              All rights reserved.
            </p>
          </div>
          
          <div>
            <h5 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8">Explore</h5>
            <ul className="space-y-4 text-xs text-aurum-muted tracking-widest">
              <li className="hover:text-aurum-ink cursor-pointer">LIBRARY</li>
              <li className="hover:text-aurum-ink cursor-pointer">COLLECTIONS</li>
              <li className="hover:text-aurum-ink cursor-pointer">JOURNAL</li>
              <li className="hover:text-aurum-ink cursor-pointer">WISHLIST</li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8">Legal</h5>
            <ul className="space-y-4 text-xs text-aurum-muted tracking-widest">
              <li className="hover:text-aurum-ink cursor-pointer">TERMS</li>
              <li className="hover:text-aurum-ink cursor-pointer">PRIVACY</li>
              <li className="hover:text-aurum-ink cursor-pointer">SHIPPING</li>
              <li className="hover:text-aurum-ink cursor-pointer">RETURNS</li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8">Social</h5>
            <ul className="space-y-4 text-xs text-aurum-muted tracking-widest">
              <li className="hover:text-aurum-ink cursor-pointer">INSTAGRAM</li>
              <li className="hover:text-aurum-ink cursor-pointer">TWITTER</li>
              <li className="hover:text-aurum-ink cursor-pointer">ARE.NA</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
