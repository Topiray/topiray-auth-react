import { ThemeConfig } from './types'

export const defaultTheme: ThemeConfig = {
  colors: {
    // Base colors - Modern neutral palette
    primary: '#3B82F6',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    background: '#FFFFFF',
    surface: '#F8FAFC',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    
    // State colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    
    // Interactive colors
    hover: '#F3F4F6',
    active: '#E5E7EB',
    disabled: '#D1D5DB',
    
    // Input colors
    inputBackground: '#FFFFFF',
    inputBorder: '#D1D5DB',
    inputText: '#1F2937',
    inputPlaceholder: '#9CA3AF',
    
    // Button variants
    buttonPrimary: '#3B82F6',
    buttonPrimaryText: '#FFFFFF',
    buttonSecondary: '#F3F4F6',
    buttonSecondaryText: '#1F2937',
    buttonSocial: '#4B5563',
    buttonSocialText: '#FFFFFF',
  },
  
  components: {
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
    
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
    },
    
    typography: {
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      fontSize: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '20px',
        xxl: '24px',
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      lineHeight: {
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.75',
      },
    },
    
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    
    transitions: {
      fast: '0.1s ease',
      normal: '0.2s ease',
      slow: '0.3s ease',
    },
  },
  
  brand: {
    logo: undefined,
    logoAlt: 'Logo',
    primaryLogo: undefined,
    secondaryLogo: undefined,
  },
  
  customization: {
    roundedCorners: true,
    animations: true,
    showFormHeader: true,
    showSocialLogin: true,
    showBackArrow: true,
    showLogo: true,
    backgroundImage: undefined,
    leftPanelContent: undefined,
  },
}

// Dark theme variant
export const darkTheme: ThemeConfig = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#60A5FA',
    secondary: '#9CA3AF',
    background: '#111827',
    surface: '#1F2937',
    text: '#F9FAFB',
    textSecondary: '#D1D5DB',
    border: '#374151',
    
    hover: '#374151',
    active: '#4B5563',
    disabled: '#6B7280',
    
    inputBackground: '#1F2937',
    inputBorder: '#4B5563',
    inputText: '#F9FAFB',
    inputPlaceholder: '#9CA3AF',
    
    buttonPrimary: '#60A5FA',
    buttonPrimaryText: '#111827',
    buttonSecondary: '#374151',
    buttonSecondaryText: '#F9FAFB',
    buttonSocial: '#4B5563',
    buttonSocialText: '#F9FAFB',
  },
}

// Helper function to create custom themes with deep merging
export const createCustomTheme = (overrides: Partial<ThemeConfig>): ThemeConfig => {
  const mergeDeep = (target: any, source: any): any => {
    const result = { ...target }
    
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = mergeDeep(target[key] || {}, source[key])
      } else {
        result[key] = source[key]
      }
    }
    
    return result
  }
  
  return mergeDeep(defaultTheme, overrides)
} 