import React, { createContext, useContext } from 'react'
import { TranslationDictionary } from './types'
import en from './en.json'

interface I18nContextType {
  t: (key: string) => string
  translations: TranslationDictionary
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

function getNestedValue(obj: unknown, path: string): string {
  const keys = path.split('.')
  let current: unknown = obj
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return path
    }
    current = (current as Record<string, unknown>)[key]
  }
  return typeof current === 'string' ? current : path
}

export const useTranslation = () => {
  const context = useContext(I18nContext)
  if (!context) {
    // Fallback to English when no provider is present
    return {
      t: (key: string) => getNestedValue(en, key),
      translations: en as TranslationDictionary
    }
  }
  return context
}

interface I18nProviderProps {
  children: React.ReactNode
  translations: TranslationDictionary
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children, translations }) => {
  const t = (key: string): string => {
    const value = getNestedValue(translations, key)
    if (value !== key) return value
    // Fallback to English
    return getNestedValue(en, key)
  }

  return (
    <I18nContext.Provider value={{ t, translations }}>
      {children}
    </I18nContext.Provider>
  )
}
