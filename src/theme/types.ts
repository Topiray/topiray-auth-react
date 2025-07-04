export interface ThemeColors {
  // Base colors
  primary: string
  secondary: string
  tertiary: string
  background: string
  surface: string
  text: string
  textSecondary: string
  border: string
  
  // State colors
  success: string
  warning: string
  error: string
  info: string
  
  // Interactive colors
  hover: string
  active: string
  disabled: string
  
  // Specific component colors
  inputBackground: string
  inputBorder: string
  inputText: string
  inputPlaceholder: string
  
  // Button variants
  buttonPrimary: string
  buttonPrimaryText: string
  buttonSecondary: string
  buttonSecondaryText: string
  buttonSocial: string
  buttonSocialText: string
}

export interface ComponentTheme {
  // Spacing
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  
  // Border radius
  borderRadius: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  
  // Typography
  typography: {
    fontFamily: string
    fontSize: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      xxl: string
    }
    fontWeight: {
      normal: string
      medium: string
      semibold: string
      bold: string
    }
    lineHeight: {
      tight: string
      normal: string
      relaxed: string
    }
  }
  
  // Shadows
  shadows: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  
  // Transitions
  transitions: {
    fast: string
    normal: string
    slow: string
  }
}

export interface ThemeConfig {
  colors: ThemeColors
  components: ComponentTheme
  
  // Brand assets
  brand: {
    logo?: string
    logoAlt?: string
    primaryLogo?: string
    secondaryLogo?: string
  }
  
  // Component customization
  customization: {
    // Global
    roundedCorners: boolean
    animations: boolean
    
    // Forms
    showFormHeader: boolean
    showSocialLogin: boolean
    showBackArrow: boolean
    
    // Layout
    showLogo: boolean
    backgroundImage?: string
    leftPanelContent?: React.ReactNode
  }
}

export interface ThemeProviderProps {
  children: React.ReactNode
  theme: ThemeConfig
}

export type ThemeVariant = 'light' | 'dark' | 'custom' 