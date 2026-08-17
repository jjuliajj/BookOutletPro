"use client";

import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { Plus, Cpu } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: string;
  category: string;
  image: string;
  description?: string;
}

export default function BookCard({ id, title, author, price, category, image, description }: BookCardProps) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id, 1);
  };

  return (
    <Link href={`/products/${id}`} className="group cursor-pointer block h-full">
      <div className="bg-[#1E293B]/90 backdrop-blur-md border border-[#06B6D4]/30 rounded-2xl p-3.5 shadow-lg hover:border-[#06B6D4] hover:shadow-cyan-500/20 transition-all duration-300 flex flex-col h-full">
        
        <div className="relative aspect-[9/16] mb-3 overflow-hidden bg-[#0F172A] rounded-xl border border-[#06B6D4]/20">
          {image ? (
            <img src={image} alt={title} className="object-cover w-full h-full group-hover:scale-105 transition-transform" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#06B6D4] font-mono text-xs p-2 text-center">
              {title}
            </div>
          )}

          <div className="absolute top-2 left-2">
            <span className="bg-[#06B6D4] text-[#0F172A] text-[8px] font-mono font-bold px-2 py-0.5 rounded uppercase">
              {category || "PRO FILE"}
            </span>
          </div>

          <div className="absolute inset-0 bg-[#0F172A]/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              onClick={handleQuickAdd}
              className="bg-[#06B6D4] text-[#0F172A] font-mono font-bold text-[10px] px-4 py-2 rounded-lg uppercase tracking-wider shadow-lg hover:bg-[#8B5CF6] hover:text-white flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Download Pro
            </button>
          </div>
        </div>

        <div className="flex flex-col flex-grow justify-between space-y-2 font-mono">
          <div>
            <h3 className="font-bold text-base text-[#F8FAFC] group-hover:text-[#06B6D4] transition-colors line-clamp-1">
              {title}
            </h3>
            <p className="text-xs text-[#94A3B8]">by {author}</p>
          </div>

          <div className="pt-2 border-t border-[#06B6D4]/20 flex items-center justify-between text-xs font-bold">
            <span className="text-[#06B6D4]">{price}</span>
            <span className="text-[#8B5CF6] bg-[#8B5CF6]/10 px-2 py-0.5 rounded text-[9px] uppercase">EPUB PRO</span>
          </div>
        </div>

      </div>
    </Link>
  );
}
