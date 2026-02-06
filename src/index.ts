// Topiray Auth React Component Library
// This file will be populated with exports as we build the components

// Theme and Provider exports
export { ThemeProvider, useTheme } from './theme/ThemeProvider'
export type { ThemeConfig, ThemeColors, ComponentTheme } from './theme/types'
export { defaultTheme, darkTheme, createCustomTheme } from './theme/defaultTheme'

// Layout components
export { TwoPanelLayout } from './layouts/TwoPanelLayout'
export { NavLinksLayout } from './layouts/NavLinksLayout'
export type { TwoPanelLayoutProps, NavLinksLayoutProps } from './layouts/types'

// Common components
export { Button } from './components/common/Button'
export { AlertMessage } from './components/common/AlertMessage'
export { BackArrow } from './components/common/BackArrow'
export { SocialLoginButtons } from './components/common/SocialLoginButtons'
export type { ButtonProps, AlertMessageProps, BackArrowProps, SocialLoginButtonsProps } from './components/common/types'

// Auth components
export { AuthCard } from './components/auth/AuthCard'
export { SignInForm } from './components/auth/SignInForm'
export { SignUpForm } from './components/auth/SignUpForm'
export { ForgottenPasswordForm } from './components/auth/ForgottenPasswordForm'
export { VerifyEmailForm } from './components/auth/VerifyEmailForm'
export { TwoFactorSetupForm } from './components/auth/TwoFactorSetupForm'
export { TwoFactorSetupEnterVerificationForm } from './components/auth/TwoFactorSetupEnterVerificationForm'
export { TwoFactorSetupCompleteForm } from './components/auth/TwoFactorSetupCompleteForm'
export { ResetPasswordForm } from './components/auth/ResetPasswordForm'
export type { 
  AuthCardProps,
  SignInFormProps, 
  SignUpFormProps, 
  ForgottenPasswordFormProps, 
  VerifyEmailFormProps,
  TwoFactorSetupFormProps,
  TwoFactorSetupEnterVerificationFormProps,
  TwoFactorSetupCompleteFormProps,
  ResetPasswordFormProps
} from './components/auth/types'

export const placeholder = 'Building component library...'