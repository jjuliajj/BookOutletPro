"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ShieldCheck, 
  Cpu,
  ArrowRight
} from "lucide-react";

export default function CartPage() {
  const { cartItems, allBooks, updateQuantity, removeFromCart, cartTotal, isMounted } = useCart();

  const fullCartItems = cartItems.map(item => {
    const book = allBooks.find(b => b.id === item.id);
    return { ...book, quantity: item.quantity, id: item.id };
  }).filter(item => item.title);

  if (!isMounted) return null;

  return (
    <main className="flex min-h-screen flex-col bg-[#0F172A] text-[#F8FAFC] font-mono">
      <Navbar />
      
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <Link href="/collections" className="inline-flex items-center text-xs font-bold text-[#06B6D4] hover:text-[#8B5CF6] transition-colors mb-2 uppercase tracking-widest gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Cyber Vault
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] flex items-center gap-3">
                <Cpu className="w-8 h-8 text-[#06B6D4]" />
                Pro Vault Order Queue
              </h1>
            </div>
            <span className="text-xs font-bold text-[#06B6D4] bg-[#1E293B] px-4 py-2 rounded-xl border border-[#06B6D4]/30 w-fit">
              {fullCartItems.length} {fullCartItems.length === 1 ? 'Pro File' : 'Pro Files'} Loaded
            </span>
          </div>

          {fullCartItems.length === 0 ? (
            <div className="bg-[#1E293B] rounded-3xl p-12 text-center border border-[#06B6D4]/30 shadow-2xl max-w-lg mx-auto my-8">
              <div className="w-16 h-16 bg-[#0F172A] text-[#06B6D4] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#06B6D4]/40">
                <Cpu className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#F8FAFC] mb-2">Pro Vault Queue is Empty</h3>
              <p className="text-xs text-[#94A3B8] mb-6 font-sans">Access technical, philosophical, and archival digital EPUB files.</p>
              <Link 
                href="/collections" 
                className="inline-flex items-center gap-2 bg-[#06B6D4] hover:bg-[#8B5CF6] text-[#0F172A] hover:text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
              >
                <span>Access Cyber Vault</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-4">
                {fullCartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-[#1E293B] rounded-2xl p-4 border border-[#06B6D4]/30 shadow-lg hover:border-[#06B6D4] transition-all flex gap-4 items-center"
                  >
                    <Link href={`/products/${item.id}`} className="w-16 md:w-20 aspect-[9/16] bg-[#0F172A] rounded-xl overflow-hidden flex-shrink-0 border border-[#06B6D4]/20 block">
                      {item.cover_url ? (
                        <img src={item.cover_url} alt={item.title} className="object-cover w-full h-full" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#06B6D4] text-[9px]">
                          {item.title}
                        </div>
                      )}
                    </Link>

                    <div className="flex-grow min-w-0 space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <Link href={`/products/${item.id}`} className="text-base md:text-lg font-bold text-[#F8FAFC] hover:text-[#06B6D4] transition-colors line-clamp-1">
                          {item.title}
                        </Link>
                        <span className="font-bold text-[#06B6D4] text-sm whitespace-nowrap">
                          {item.price && item.price.startsWith('$') ? item.price : `$${item.price || '0.00'}`}
                        </span>
                      </div>

                      <p className="text-xs text-[#94A3B8]">by {item.author}</p>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-3 bg-[#0F172A] border border-[#06B6D4]/30 rounded-lg px-3 py-1">
                          <button className="text-[#94A3B8] hover:text-[#06B6D4]" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#F8FAFC] w-4 text-center">{item.quantity}</span>
                          <button className="text-[#94A3B8] hover:text-[#06B6D4]" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button className="text-rose-400 hover:bg-rose-900/30 p-2 rounded-lg transition-all" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary - High Contrast Cyber Window */}
              <div className="lg:col-span-5">
                <div className="bg-[#1E293B] text-white rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-[#06B6D4] space-y-6 sticky top-28">
                  <div className="flex items-center justify-between border-b border-[#06B6D4]/30 pb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-[#F8FAFC]">
                      <Cpu className="w-5 h-5 text-[#06B6D4]" /> Pro Order Summary
                    </h2>
                    <span className="text-xs font-bold text-[#06B6D4] bg-[#06B6D4]/10 px-3 py-1 rounded-full border border-[#06B6D4]/30 uppercase">SHA-256</span>
                  </div>

                  <div className="space-y-3 text-xs text-white">
                    <div className="flex justify-between text-[#94A3B8]">
                      <span>Subtotal ({fullCartItems.length} items)</span>
                      <span className="font-bold text-[#F8FAFC] text-sm">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#94A3B8]">
                      <span>Digital Fiber Transfer</span>
                      <span className="text-[#06B6D4] font-bold uppercase text-[10px]">Zero-Latency Stream</span>
                    </div>
                    <div className="flex justify-between text-[#94A3B8]">
                      <span>Protocol Tax</span>
                      <span className="font-bold text-[#F8FAFC]">$0.00</span>
                    </div>

                    <div className="flex justify-between items-baseline pt-4 border-t border-[#06B6D4]/30">
                      <span className="text-base font-bold text-[#F8FAFC]">Total Amount</span>
                      <span className="text-3xl font-black text-[#06B6D4]">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link 
                    href="/checkout" 
                    className="w-full bg-[#06B6D4] hover:bg-[#8B5CF6] text-[#0F172A] hover:text-white py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group"
                  >
                    <span>Execute Pro Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="pt-2 border-t border-[#06B6D4]/20 flex items-center justify-center gap-2 text-[10px] text-[#94A3B8] uppercase text-center">
                    <ShieldCheck className="w-4 h-4 text-[#8B5CF6] flex-shrink-0" />
                    <span>Cryptographically Verified EPUB Vault</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
