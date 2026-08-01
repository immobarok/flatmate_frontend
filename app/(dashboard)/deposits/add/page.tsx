import { Wallet, ArrowLeft, Send, Hash, UploadCloud } from "lucide-react"
import Link from "next/link"

export default function AddDepositPage() {
  return (
    <div className="space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/deposits" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 dark:bg-stone-900/60 backdrop-blur-xl border border-white/20 hover:bg-white/90 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex flex-col">
          <h1 className="text-xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <Wallet className="h-5 w-5 text-orange-500" />
            Send Deposit
          </h1>
          <p className="text-xs text-muted-foreground">Submit money to manager</p>
        </div>
      </div>

      <form className="space-y-6">
        
        {/* Amount */}
        <div className="rounded-2xl bg-white/70 dark:bg-stone-900/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 dark:border-white/10 shadow-sm p-6 text-center space-y-4">
          <label className="text-sm font-bold text-muted-foreground">Deposit Amount</label>
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-extrabold text-orange-500">৳</span>
            <input 
              type="number" 
              placeholder="0.00"
              className="w-48 bg-transparent text-4xl font-extrabold text-foreground text-center focus:outline-none placeholder:text-muted-foreground/30"
            />
          </div>
        </div>

        {/* Method */}
        <div className="rounded-2xl bg-white/70 dark:bg-stone-900/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 dark:border-white/10 shadow-sm p-5 space-y-4">
          <label className="text-sm font-bold">Payment Method</label>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-3 p-4 rounded-xl border border-orange-500 bg-orange-500/10 cursor-pointer">
              <input type="radio" name="method" value="bkash" defaultChecked className="accent-orange-600" />
              <span className="font-semibold text-sm">bKash</span>
            </label>
            <label className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-black/5 dark:bg-white/5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
              <input type="radio" name="method" value="cash" className="accent-orange-600" />
              <span className="font-semibold text-sm">Cash</span>
            </label>
          </div>
        </div>

        {/* Reference / Screenshot */}
        <div className="rounded-2xl bg-white/70 dark:bg-stone-900/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 dark:border-white/10 shadow-sm p-5 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold flex items-center gap-2">
              <Hash className="h-4 w-4" /> Transaction ID
            </label>
            <input 
              type="text" 
              placeholder="e.g. 8A7X9QW2" 
              className="w-full bg-black/5 dark:bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" 
            />
          </div>

          <div className="border-t border-white/10 pt-4 space-y-2">
            <label className="text-sm font-bold flex items-center gap-2">
              <UploadCloud className="h-4 w-4" /> Screenshot (Optional)
            </label>
            <input type="file" accept="image/*" className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-orange-50 file:text-orange-700
              hover:file:bg-orange-100
              dark:file:bg-orange-500/10 dark:file:text-orange-400 dark:hover:file:bg-orange-500/20 transition-colors
            " />
          </div>
        </div>

        {/* Submit */}
        <button className="w-full rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 shadow-xl hover:shadow-orange-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
          <Send className="h-5 w-5" /> Submit Request
        </button>

      </form>
    </div>
  )
}
