import { LucideProps } from 'lucide-react';
import { ReactNode } from 'react'

type AuthProvider = 'apple' | 'google' | 'facebook';

export interface AuthCardProps {
  children: ReactNode
  className?: string
}

export interface SignInFormProps {
  onSubmit?: (email: string, password: string) => void
  onForgotPassword?: () => void
  onSignUp?: () => void
  onSocialLogin?: (provider: AuthProvider) => void
  logoSrc?: string
  authProviders?: AuthProvider[]
  isLoading?: boolean
  className?: string
}

export interface AccountType {
  label: string
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

export interface SignUpFormProps {
  onSubmit?: (email: string, password: string, accountType: string | null) => void
  onSignIn?: () => void
  onSocialLogin?: (provider: AuthProvider) => void
  logoSrc?: string
  accountTypes?: AccountType[]
  authProviders?: AuthProvider[]
  isLoading?: boolean
  className?: string
}

export interface ForgottenPasswordFormProps {
  onSubmit: (email: string) => void
  isLoading?: boolean
  className?: string
}

export interface ResetPasswordFormProps {
  onSubmit: (newPassword: string) => void
  isLoading?: boolean
  className?: string
  description?: string
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