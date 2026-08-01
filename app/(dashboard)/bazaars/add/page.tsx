import { ShoppingBasket, ArrowLeft, Receipt, PlusCircle, Trash2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function AddBazaarPage() {
  return (
    <div className="space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/bazaars" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 dark:bg-stone-900/60 backdrop-blur-xl border border-white/20 hover:bg-white/90 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex flex-col">
          <h1 className="text-xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <ShoppingBasket className="h-5 w-5 text-orange-500" />
            Submit Expense
          </h1>
          <p className="text-xs text-muted-foreground">Add items and upload receipt</p>
        </div>
      </div>

      <form className="space-y-6">
        
        {/* Receipt Upload */}
        <div className="rounded-2xl bg-white/70 dark:bg-stone-900/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 dark:border-white/10 shadow-sm p-6 text-center border-dashed group cursor-pointer hover:border-orange-600/50 transition-colors">
          <Receipt className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3 group-hover:text-orange-500 transition-colors" />
          <h3 className="font-semibold mb-1">Upload Receipt Image</h3>
          <p className="text-xs text-muted-foreground mb-4">Click to browse or take a photo</p>
          <input type="file" accept="image/*" className="hidden" id="receipt" />
          <label htmlFor="receipt" className="inline-block px-5 py-2 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 text-sm font-bold cursor-pointer">
            Select File
          </label>
        </div>

        {/* Date */}
        <div className="rounded-2xl bg-white/70 dark:bg-stone-900/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 dark:border-white/10 shadow-sm p-5 space-y-3">
          <label className="text-sm font-bold">Shopping Date</label>
          <input 
            type="date" 
            className="w-full bg-black/5 dark:bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            defaultValue={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Items */}
        <div className="rounded-2xl bg-white/70 dark:bg-stone-900/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 dark:border-white/10 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold">Items</label>
            <button type="button" className="text-xs font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1">
              <PlusCircle className="h-3 w-3" /> Add Item
            </button>
          </div>
          
          <div className="space-y-3">
            {/* Single Item Row */}
            <div className="flex gap-2 items-center">
              <input type="text" placeholder="Item name" className="flex-1 bg-black/5 dark:bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
              <input type="number" placeholder="৳ Price" className="w-24 bg-black/5 dark:bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
              <button type="button" className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex gap-2 items-center">
              <input type="text" placeholder="Item name" className="flex-1 bg-black/5 dark:bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
              <input type="number" placeholder="৳ Price" className="w-24 bg-black/5 dark:bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
              <button type="button" className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="pt-4 border-t border-white/10 flex justify-between items-center">
            <span className="font-semibold text-muted-foreground">Total Amount</span>
            <span className="text-xl font-bold text-orange-600 dark:text-orange-400">৳ 0.00</span>
          </div>
        </div>

        {/* Submit */}
        <button className="w-full rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 shadow-xl hover:shadow-orange-500/25 transition-all active:scale-[0.98]">
          Submit for Approval
        </button>

      </form>
    </div>
  )
}
