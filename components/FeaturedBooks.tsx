import { getBooks } from "@/lib/api";
import Link from "next/link";
import { Building2, Plus, Star, ShieldCheck, FileText } from "lucide-react";

export default async function FeaturedBooks() {
  const books = await getBooks();

  return (
    <section className="py-12 bg-[#F1F3F5] text-[#1E293B] font-sans">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl space-y-6">
        
        {/* Corporate Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-[#205493]/20 shadow-xs">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#205493]/10 text-[#205493] text-xs font-bold rounded uppercase tracking-widest mb-1">
              <Building2 className="w-4 h-4" /> US Corporate Catalogue Table
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1E293B]">
              Streamlined Inventory Table Matrix ({books.length} SKUs)
            </h2>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 uppercase">
            100% Verified Corporate EPUB
          </span>
        </div>

        {/* Real Corporate HTML Data Table (<table>) */}
        <div className="bg-white rounded-2xl border border-[#205493]/20 shadow-md overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#1E293B] text-white uppercase text-[10px] font-bold tracking-widest border-b border-[#205493]">
                <th className="py-4 px-6">SKU_ID</th>
                <th className="py-4 px-6">COVER</th>
                <th className="py-4 px-6">BOOK TITLE & AUTHOR</th>
                <th className="py-4 px-6">CATEGORY</th>
                <th className="py-4 px-6">DRM STATUS</th>
                <th className="py-4 px-6">UNIT PRICE</th>
                <th className="py-4 px-6 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-[#F1F3F5] transition-colors group">
                  <td className="py-4 px-6 font-mono text-gray-500 font-bold">
                    #SKU-{book.id.slice(0, 5)}
                  </td>
                  <td className="py-4 px-6">
                    <Link href={`/products/${book.id}`} className="w-10 h-14 bg-gray-200 rounded overflow-hidden border border-gray-300 block">
                      {book.cover_url && <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />}
                    </Link>
                  </td>
                  <td className="py-4 px-6">
                    <Link href={`/products/${book.id}`} className="font-bold text-sm text-[#1E293B] group-hover:text-[#205493] transition-colors block line-clamp-1">
                      {book.title}
                    </Link>
                    <span className="text-gray-500 italic">by {book.author}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-[#205493]/10 text-[#205493] font-bold px-2.5 py-1 rounded text-[10px] uppercase">
                      {book.category || "GENERAL"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-emerald-700 font-bold flex items-center gap-1 text-[10px] uppercase">
                      <ShieldCheck className="w-3.5 h-3.5" /> DRM FREE
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-sm text-[#205493]">
                    {book.price && book.price.startsWith('$') ? book.price : `$${book.price || '0.00'}`}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/products/${book.id}`}
                      className="bg-[#205493] hover:bg-[#1E293B] text-white px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all inline-flex items-center gap-1 shadow-xs"
                    >
                      <FileText className="w-3 h-3" /> View Specs
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
