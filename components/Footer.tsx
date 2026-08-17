import Link from "next/link";
import { Cpu } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-[#F8FAFC] pt-14 pb-10 border-t border-[#06B6D4]/30 font-mono">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#1E293B]">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-6 h-6 text-[#06B6D4]" />
              <span className="font-mono font-black text-2xl tracking-tight text-[#F8FAFC]">BookOutlet <span className="text-[#06B6D4]">PRO</span></span>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-md font-sans">
              Cyberpunk high-performance digital library. Archival grade EPUB downloads, DRM-free reading, and encrypted direct delivery.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#06B6D4] uppercase tracking-widest mb-3">System Directory</h4>
            <ul className="space-y-1.5 text-xs text-[#94A3B8]">
              <li><Link href="/collections" className="hover:text-[#06B6D4]">Archival Vaults</Link></li>
              <li><Link href="/genres" className="hover:text-[#06B6D4]">Categories</Link></li>
              <li><Link href="/authors" className="hover:text-[#06B6D4]">Pro Authors</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#06B6D4] uppercase tracking-widest mb-3">Protocol</h4>
            <ul className="space-y-1.5 text-xs text-[#94A3B8]">
              <li><Link href="/privacy" className="hover:text-[#06B6D4]">Privacy Spec</Link></li>
              <li><Link href="/terms" className="hover:text-[#06B6D4]">Terms & Encryption</Link></li>
              <li><Link href="/contact" className="hover:text-[#06B6D4]">Support Node</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 text-center text-xs text-[#64748B]">
          © {new Date().getFullYear()} BookOutlet PRO Systems. All Rights Reserved. Cyber Digital Archive.
        </div>
      </div>
    </footer>
  );
}
