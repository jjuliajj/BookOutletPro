import Link from "next/link";
import { ArrowRight, Cpu, Terminal, ShieldCheck, Zap, Server } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-32 pb-16 bg-[#0B0F19] text-[#F8FAFC] border-b border-[#06B6D4]/30 font-mono">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl">
        
        {/* Cyber Terminal Window Container */}
        <div className="bg-[#1E293B]/90 backdrop-blur-xl rounded-2xl border-2 border-[#06B6D4] shadow-2xl shadow-cyan-500/20 overflow-hidden">
          
          {/* Terminal Titlebar Header */}
          <div className="bg-[#0F172A] px-4 py-2.5 border-b border-[#06B6D4]/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="ml-2 font-bold text-[#06B6D4]">[ROOT@BOOKOUTLET-PRO ~]$ cat vault_manifest.log</span>
            </div>
            <div className="flex items-center gap-4 text-[#94A3B8] text-[10px] hidden sm:flex">
              <span>SYS_STATUS: ONLINE</span>
              <span>SHA256: VERIFIED</span>
            </div>
          </div>

          {/* Terminal Content Body */}
          <div className="p-8 sm:p-12 grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Code-style Terminal Features */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#06B6D4]/10 text-[#06B6D4] text-xs font-bold rounded border border-[#06B6D4]/30 uppercase">
                <Terminal className="w-4 h-4 text-[#8B5CF6]" /> Archival Pro Engine • Direct Binary Stream
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#F8FAFC] leading-none">
                CYBER ARCHIVE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] via-[#8B5CF6] to-[#EC4899]">
                  PRO DIGITAL VAULT v2.4
                </span>
              </h1>

              <div className="space-y-2 text-xs text-[#94A3B8] bg-[#0F172A] p-4 rounded-xl border border-[#06B6D4]/20 font-mono">
                <div>&gt; INITIALIZING EPUB_STREAM_MODULE... <span className="text-emerald-400">DONE</span></div>
                <div>&gt; DRM_RESTRICTION_STATUS: <span className="text-emerald-400">DISABLED (100% FREE)</span></div>
                <div>&gt; REPOSITORY_INDEX: <span className="text-[#06B6D4]">14,920 TECHNICAL & PHILOSOPHICAL MANIFESTS</span></div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link 
                  href="/collections" 
                  className="bg-[#06B6D4] hover:bg-[#0891B2] text-[#0F172A] px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg glow-cyan flex items-center gap-2"
                >
                  <span>Execute Vault Access</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Glowing 3D Tech Specs Box */}
            <div className="lg:col-span-5 bg-[#0F172A] p-6 rounded-2xl border-2 border-[#8B5CF6] shadow-xl space-y-4 text-center relative overflow-hidden">
              <span className="text-[10px] font-bold text-[#06B6D4] bg-[#06B6D4]/10 px-3 py-1 rounded border border-[#06B6D4]/30 inline-block uppercase">
                SYSTEM SPECIFICATIONS
              </span>

              <div className="py-3 space-y-2">
                <Server className="w-10 h-10 mx-auto text-[#8B5CF6] animate-pulse" />
                <h3 className="text-xl font-black text-[#F8FAFC]">100% DRM-FREE VAULT</h3>
                <p className="text-xs text-[#94A3B8]">High resolution digital reading formatted for e-ink, mobile, and web terminals.</p>
              </div>

              <div className="pt-3 border-t border-[#06B6D4]/30 flex justify-between text-[10px] text-[#06B6D4] font-bold">
                <span>FORMAT: EPUB 3.0</span>
                <span>DOWNLOAD: 1-SEC FIBER</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
