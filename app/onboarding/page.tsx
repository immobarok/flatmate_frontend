import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { User, Image as ImageIcon, MapPin, Upload } from "lucide-react"

export default function OnboardingPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-20">
      {/* Header Section */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-sm font-medium mb-2 border border-orange-500/20">
          <span className="flex h-2 w-2 rounded-full bg-orange-500"></span>
          Step 1 of 3
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 dark:text-stone-50">Profile Setup</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Let's get your profile set up. This helps us match you with the best flatmates and properties.
        </p>
      </div>

      <Separator className="bg-border/50" />

      {/* Main Content Form */}
      <div className="grid gap-8">
        
        {/* Avatar Upload Card */}
        <Card className="bg-stone-50/60 dark:bg-stone-900/60 backdrop-blur-xl border-stone-200 dark:border-stone-800 shadow-sm transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" />
              Profile Picture
            </CardTitle>
            <CardDescription>
              Upload a clear photo of yourself so others know who they are talking to.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center border-2 border-dashed border-stone-300 dark:border-stone-700">
                <User className="h-10 w-10 text-stone-400" />
              </div>
              <div className="space-y-3">
                <Button variant="outline" className="gap-2 border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800">
                  <Upload className="h-4 w-4" />
                  Upload Photo
                </Button>
                <p className="text-xs text-muted-foreground">
                  JPG, GIF or PNG. Max size of 5MB.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information Card */}
        <Card className="bg-stone-50/60 dark:bg-stone-900/60 backdrop-blur-xl border-stone-200 dark:border-stone-800 shadow-sm transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Basic Information
            </CardTitle>
            <CardDescription>
              Tell us a little bit about yourself.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first-name" className="text-sm font-medium">First name</Label>
                <Input 
                  id="first-name" 
                  placeholder="John" 
                  className="h-11 bg-background/50 focus-visible:ring-primary focus-visible:border-primary transition-all duration-200 shadow-sm" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name" className="text-sm font-medium">Last name</Label>
                <Input 
                  id="last-name" 
                  placeholder="Doe" 
                  className="h-11 bg-background/50 focus-visible:ring-primary focus-visible:border-primary transition-all duration-200 shadow-sm" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">Current Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="location" 
                  placeholder="City, Neighborhood" 
                  className="h-11 pl-10 bg-background/50 focus-visible:ring-primary focus-visible:border-primary transition-all duration-200 shadow-sm" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-sm font-medium">Bio (Optional)</Label>
              <textarea 
                id="bio"
                className="flex min-h-[120px] w-full rounded-xl border border-input bg-background/50 px-3 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none"
                placeholder="I'm a software engineer who loves cooking and weekend hikes..."
              />
              <p className="text-xs text-muted-foreground text-right">
                0 / 500 characters
              </p>
            </div>
            
          </CardContent>
        </Card>
        
        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4 border-t border-border/50">
          <Button variant="ghost" className="h-11 px-8 text-muted-foreground hover:text-foreground">
            Skip for now
          </Button>
          <Button className="h-11 px-8 bg-primary hover:bg-orange-500 text-white font-medium shadow-[0_0_15px_rgba(234,88,12,0.3)] hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] transition-all duration-300">
            Continue
          </Button>
        </div>

      </div>
    </div>
  )
}
