import { Utensils, ArrowLeft, PlusCircle, Calendar, UserPlus } from "lucide-react"
import Link from "next/link"

export default function AddMealPage() {
  return (
    <div className="space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/meals" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 dark:bg-stone-900/60 backdrop-blur-xl border border-white/20 hover:bg-white/90 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex flex-col">
          <h1 className="text-xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <Utensils className="h-5 w-5 text-orange-500" />
            Add Guest Meal
          </h1>
          <p className="text-xs text-muted-foreground">Request extra meals for guests</p>
        </div>
      </div>

      <form className="space-y-6">
        
        {/* Date */}
        <div className="rounded-2xl bg-white/70 dark:bg-stone-900/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 dark:border-white/10 shadow-sm p-5 space-y-3">
          <label className="text-sm font-bold flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Select Date
          </label>
          <input 
            type="date" 
            className="w-full bg-black/5 dark:bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            defaultValue={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Guest Details */}
        <div className="rounded-2xl bg-white/70 dark:bg-stone-900/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 dark:border-white/10 shadow-sm p-5 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold flex items-center gap-2">
              <UserPlus className="h-4 w-4" /> Guest Name / Note (Optional)
            </label>
            <input 
              type="text" 
              placeholder="e.g. Friend from university" 
              className="w-full bg-black/5 dark:bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" 
            />
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2">
            <label className="text-sm font-bold">Number of Meals</label>
            <div className="flex items-center gap-4">
              <input 
                type="number" 
                defaultValue={1}
                min={1}
                max={5}
                className="w-24 bg-black/5 dark:bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-center font-bold" 
              />
              <span className="text-sm text-muted-foreground">Standard meals</span>
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="rounded-xl bg-orange-500/10 border border-orange-500/20 p-4">
          <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">
            <strong>Note:</strong> Guest meals are charged at the standard daily meal rate. You must add guest meals before the daily cutoff time (e.g., 9:00 AM).
          </p>
        </div>

        {/* Submit */}
        <button className="w-full rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 shadow-xl hover:shadow-orange-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
          <PlusCircle className="h-5 w-5" /> Confirm Guest Meal
        </button>

      </form>
    </div>
  )
}
