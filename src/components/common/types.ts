import { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isLoading?: boolean
  loadingText?: string
  variant?: 'primary' | 'secondary' | 'social'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

export interface AlertMessageProps {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  onClose?: () => void
  dismissible?: boolean
  className?: string
}

export interface BackArrowProps {
  fallbackRoute?: string
  disabled?: boolean
  className?: string
  iconClassName?: string
  onBack?: () => void
}

export interface SocialLoginButtonsProps {
  onSocialLogin?: (provider: 'apple' | 'google' | 'facebook') => void
  isLoading?: boolean
  providers?: ('apple' | 'google' | 'facebook')[]
  showLabels?: boolean
  orientation?: 'horizontal' | 'vertical'
  className?: string
} 