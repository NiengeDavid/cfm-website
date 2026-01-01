"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "blue",
          "--normal-text": "white",
          "--normal-border": "rgba(0,0,0,0.1)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
