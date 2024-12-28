'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface SiteSettings {
  siteName: string
  siteSubtitle: string
  primaryColor: string
  secondaryColor: string
  // Add other relevant settings here
}

const SiteSettingsContext = createContext<SiteSettings | null>(null)

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext)
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider')
  }
  return context
}

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      const response = await fetch('/api/settings')
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    }
    fetchSettings()
  }, [])

  if (!settings) {
    return <div>Loading...</div>
  }

  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

