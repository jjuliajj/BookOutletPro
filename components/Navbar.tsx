"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { getBooks, Book } from "@/lib/api";
import { Search, X, Loader2, Menu, ShoppingBag, ShieldCheck, Building2 } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, cartTotal, isMounted } = useCart();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState("");
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleSearchFocus = async () => {
    setIsSearchFocused(true);
    if (allBooks.length === 0 && !isLoadingBooks) {
      setIsLoadingBooks(true);
      try {
        const books = await getBooks();
        setAllBooks(books);
      } catch (err) {
        console.error("Failed to load search index:", err);
      } finally {
        setIsLoadingBooks(false);
      }
    }
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase().trim();
    const matches = allBooks.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query) ||
        (b.category && b.category.toLowerCase().includes(query))
    ).slice(0, 6);
    setSearchResults(matches);
  }, [searchQuery, allBooks]);

  const navItems = [
    { label: "Corporate Catalogue", href: "/collections" },
    { label: "Categories", href: "/genres" },
    { label: "Authors", href: "/authors" },
    { label: "Compliance & Info", href: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 md:px-12 py-3.5 flex justify-between items-center ${
        isScrolled || isMobileMenuOpen ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#205493]/20" : "bg-white/85 border-b border-[#1E293B]/10"
      }`}
    >
      {/* Brand Logo & Name - US Corporate Style */}
      <Link href="/" className="flex items-center gap-3 group font-sans">
        <div className="w-10 h-10 rounded-xl bg-[#205493] text-white p-2 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 font-bold">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#1E293B] leading-none uppercase">
              BookOutlet <span className="text-[#205493]">PRO</span>
            </span>
            <span className="bg-[#205493] text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">US CORPORATE</span>
          </div>
          <span className="text-[9px] font-bold tracking-widest text-[#205493] uppercase mt-0.5">Modern Corporate Catalogue</span>
        </div>
      </Link>

      {/* Header Search Bar */}
      <div className="relative hidden lg:block w-72 xl:w-96" ref={searchRef}>
        <div className="relative flex items-center font-sans">
          <Search className="absolute left-3.5 w-4 h-4 text-[#205493]" />
          <input
            type="text"
            placeholder="Search corporate catalogue, authors..."
            value={searchQuery}
            onFocus={handleSearchFocus}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2 text-xs bg-[#F1F3F5] text-[#1E293B] rounded-xl border border-[#205493]/20 focus:border-[#205493] focus:outline-none transition-all placeholder:text-[#1E293B]/50 font-bold"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 p-1 text-[#1E293B]/40 hover:text-[#205493]">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Live Search Results */}
        {isSearchFocused && (searchQuery.trim() !== "" || isLoadingBooks) && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#205493]/30 rounded-2xl shadow-xl overflow-hidden z-50 p-2 font-sans">
            {isLoadingBooks ? (
              <div className="p-4 text-center text-xs text-[#1E293B]/60 flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#205493]" /> Querying catalogue...
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-1">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#205493]">
                  Catalogue Index ({searchResults.length})
                </div>
                {searchResults.map((book) => (
                  <Link
                    key={book.id}
                    href={`/products/${book.id}`}
                    onClick={() => {
                      setIsSearchFocused(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-3 p-2 hover:bg-[#F1F3F5] rounded-xl transition-colors group"
                  >
                    <div className="w-9 h-12 bg-[#1E293B] rounded overflow-hidden flex-shrink-0 border border-[#205493]/20">
                      {book.cover_url && <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="text-xs font-bold text-[#1E293B] truncate group-hover:text-[#205493]">
                        {book.title}
                      </div>
                      <div className="text-[11px] text-[#1E293B]/60 truncate">by {book.author}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-[#1E293B]/50">No corporate items found.</div>
            )}
          </div>
        )}
      </div>

      {/* Nav Links & Commercial Cart */}
      <div className="flex items-center gap-4 sm:gap-6 font-sans">
        <div className="hidden md:flex items-center gap-6 text-xs font-bold text-[#1E293B]/80 uppercase tracking-wider">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-[#205493] transition-colors py-1 ${
                pathname === item.href ? "text-[#205493] border-b-2 border-[#205493]" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/cart"
          className="bg-[#205493] hover:bg-[#1E293B] text-white p-2.5 sm:px-4 sm:py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all duration-300 shadow-md hover:scale-105"
        >
          <ShoppingBag className="w-4 h-4 text-white" />
          <span className="hidden sm:inline">Order Cart</span>
          {isMounted && (
            <span className="bg-white text-[#205493] text-[10px] font-black px-2 py-0.5 rounded">
              ${cartTotal.toFixed(2)} ({cartCount})
            </span>
          )}
        </Link>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[#1E293B]"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </nav>
  );
}
