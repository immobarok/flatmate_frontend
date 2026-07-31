"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="bottom-right"
      expand
      richColors={false}
      icons={{
        success: <CircleCheckIcon className="size-4 text-primary" />,
        info: <InfoIcon className="size-4 text-blue-400" />,
        warning: <TriangleAlertIcon className="size-4 text-yellow-400" />,
        error: <OctagonXIcon className="size-4 text-destructive" />,
        loading: (
          <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
        ),
      }}
      style={
        {
          "--normal-bg": "rgba(28, 25, 23, 0.85)",
          "--normal-text": "#FAFAF9",
          "--normal-border": "rgba(68, 64, 60, 0.5)",
          "--success-bg": "rgba(28, 25, 23, 0.85)",
          "--success-text": "#FAFAF9",
          "--success-border": "rgba(234, 88, 12, 0.4)",
          "--error-bg": "rgba(28, 25, 23, 0.85)",
          "--error-text": "#FAFAF9",
          "--error-border": "rgba(220, 38, 38, 0.4)",
          "--border-radius": "1rem",
          "--width": "360px",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group/toast backdrop-blur-2xl backdrop-saturate-150 border font-medium shadow-2xl shadow-black/20 px-4 py-3",
          title: "font-semibold text-sm",
          description: "text-xs text-muted-foreground mt-0.5",
          actionButton:
            "bg-primary text-white text-xs rounded-lg px-3 py-1.5 font-semibold hover:bg-orange-500 transition-colors",
          cancelButton:
            "text-muted-foreground text-xs rounded-lg px-3 py-1.5 font-semibold hover:text-foreground transition-colors",
          closeButton:
            "text-muted-foreground hover:text-foreground transition-colors",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
