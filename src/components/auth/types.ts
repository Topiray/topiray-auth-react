import { ReactNode } from 'react'

export interface AuthCardProps {
  children: ReactNode
  className?: string
}

export interface SignInFormProps {
  onSubmit?: (email: string, password: string) => void
  onForgotPassword?: () => void
  onSignUp?: () => void
  onSocialLogin?: (provider: 'apple' | 'google' | 'facebook') => void
  logoSrc?: string
  isLoading?: boolean
  className?: string
}

export interface SignUpFormProps {
  onSubmit?: (email: string, password: string, accountType: 'business' | 'individual') => void
  onSignIn?: () => void
  onSocialLogin?: (provider: 'apple' | 'google' | 'facebook') => void
  logoSrc?: string
  isLoading?: boolean
  className?: string
}

export interface ForgottenPasswordFormProps {
  onSubmit: (email: string) => void
  isLoading?: boolean
  className?: string
}

export interface VerifyEmailFormProps {
  onSubmit: () => void
  onResendEmail: () => void
  email?: string | null
  isLoading?: boolean
  className?: string
}

export interface TwoFactorSetupFormProps {
  onNext?: () => void
  onCancel?: () => void
  qrCodeUri?: string | null
  sharedKey?: string | null
  isLoading?: boolean
  className?: string
}

export interface TwoFactorSetupEnterVerificationFormProps {
  onVerify?: (code: string) => void
  isLoading?: boolean
  error?: string | null
  backRoute?: string
  className?: string
}

export interface TwoFactorSetupCompleteFormProps {
  onDone?: () => void
  backupCodes?: string[]
  isLoading?: boolean
  className?: string
} 