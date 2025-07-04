import React, { createContext, useContext, useEffect } from 'react'
import { ThemeConfig, ThemeProviderProps } from './types'
import { defaultTheme } from './defaultTheme'

interface ThemeContextType {
  theme: ThemeConfig
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme = defaultTheme }) => {
  useEffect(() => {
    // Inject CSS custom properties into the document
    const root = document.documentElement
    
    // Colors
    root.style.setProperty('--topiray-color-primary', theme.colors.primary)
    root.style.setProperty('--topiray-color-secondary', theme.colors.secondary)
    root.style.setProperty('--topiray-color-background', theme.colors.background)
    root.style.setProperty('--topiray-color-surface', theme.colors.surface)
    root.style.setProperty('--topiray-color-text', theme.colors.text)
    root.style.setProperty('--topiray-color-text-secondary', theme.colors.textSecondary)
    root.style.setProperty('--topiray-color-border', theme.colors.border)
    root.style.setProperty('--topiray-color-success', theme.colors.success)
    root.style.setProperty('--topiray-color-warning', theme.colors.warning)
    root.style.setProperty('--topiray-color-error', theme.colors.error)
    root.style.setProperty('--topiray-color-info', theme.colors.info)
    root.style.setProperty('--topiray-color-hover', theme.colors.hover)
    root.style.setProperty('--topiray-color-active', theme.colors.active)
    root.style.setProperty('--topiray-color-disabled', theme.colors.disabled)
    
    // Input colors
    root.style.setProperty('--topiray-input-background', theme.colors.inputBackground)
    root.style.setProperty('--topiray-input-border', theme.colors.inputBorder)
    root.style.setProperty('--topiray-input-text', theme.colors.inputText)
    root.style.setProperty('--topiray-input-placeholder', theme.colors.inputPlaceholder)
    
    // Button colors
    root.style.setProperty('--topiray-button-primary', theme.colors.buttonPrimary)
    root.style.setProperty('--topiray-button-primary-text', theme.colors.buttonPrimaryText)
    root.style.setProperty('--topiray-button-secondary', theme.colors.buttonSecondary)
    root.style.setProperty('--topiray-button-secondary-text', theme.colors.buttonSecondaryText)
    root.style.setProperty('--topiray-button-social', theme.colors.buttonSocial)
    root.style.setProperty('--topiray-button-social-text', theme.colors.buttonSocialText)
    
    // Spacing
    root.style.setProperty('--topiray-spacing-xs', theme.components.spacing.xs)
    root.style.setProperty('--topiray-spacing-sm', theme.components.spacing.sm)
    root.style.setProperty('--topiray-spacing-md', theme.components.spacing.md)
    root.style.setProperty('--topiray-spacing-lg', theme.components.spacing.lg)
    root.style.setProperty('--topiray-spacing-xl', theme.components.spacing.xl)
    
    // Border radius
    root.style.setProperty('--topiray-radius-sm', theme.components.borderRadius.sm)
    root.style.setProperty('--topiray-radius-md', theme.components.borderRadius.md)
    root.style.setProperty('--topiray-radius-lg', theme.components.borderRadius.lg)
    root.style.setProperty('--topiray-radius-xl', theme.components.borderRadius.xl)
    
    // Typography
    root.style.setProperty('--topiray-font-family', theme.components.typography.fontFamily)
    root.style.setProperty('--topiray-font-size-xs', theme.components.typography.fontSize.xs)
    root.style.setProperty('--topiray-font-size-sm', theme.components.typography.fontSize.sm)
    root.style.setProperty('--topiray-font-size-md', theme.components.typography.fontSize.md)
    root.style.setProperty('--topiray-font-size-lg', theme.components.typography.fontSize.lg)
    root.style.setProperty('--topiray-font-size-xl', theme.components.typography.fontSize.xl)
    root.style.setProperty('--topiray-font-size-xxl', theme.components.typography.fontSize.xxl)
    root.style.setProperty('--topiray-font-weight-normal', theme.components.typography.fontWeight.normal)
    root.style.setProperty('--topiray-font-weight-medium', theme.components.typography.fontWeight.medium)
    root.style.setProperty('--topiray-font-weight-semibold', theme.components.typography.fontWeight.semibold)
    root.style.setProperty('--topiray-font-weight-bold', theme.components.typography.fontWeight.bold)
    root.style.setProperty('--topiray-line-height-tight', theme.components.typography.lineHeight.tight)
    root.style.setProperty('--topiray-line-height-normal', theme.components.typography.lineHeight.normal)
    root.style.setProperty('--topiray-line-height-relaxed', theme.components.typography.lineHeight.relaxed)
    
    // Shadows
    root.style.setProperty('--topiray-shadow-sm', theme.components.shadows.sm)
    root.style.setProperty('--topiray-shadow-md', theme.components.shadows.md)
    root.style.setProperty('--topiray-shadow-lg', theme.components.shadows.lg)
    root.style.setProperty('--topiray-shadow-xl', theme.components.shadows.xl)
    
    // Transitions
    root.style.setProperty('--topiray-transition-fast', theme.components.transitions.fast)
    root.style.setProperty('--topiray-transition-normal', theme.components.transitions.normal)
    root.style.setProperty('--topiray-transition-slow', theme.components.transitions.slow)
    
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  )
} 