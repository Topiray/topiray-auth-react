import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { BackArrowProps } from './types'
import { useTheme } from '../../theme/ThemeProvider'
import styles from './BackArrow.module.css'

export const BackArrow: React.FC<BackArrowProps> = ({ 
  fallbackRoute = '/signup',
  disabled = false,
  className = '',
  iconClassName = '',
  onBack
}) => {
  useTheme()

  const handleBack = () => {
    if (disabled) return
    
    if (onBack) {
      onBack()
    } else if (typeof window !== 'undefined') {
      // Check if there's history to go back to
      if (window.history.length > 1) {
        window.history.back()
      } else {
        // No history, navigate to fallback route
        window.location.href = fallbackRoute
      }
    }
  }

  const buttonClasses = [
    styles.button,
    disabled && styles.disabled,
    className
  ].filter(Boolean).join(' ')

  const iconClasses = [
    styles.icon,
    iconClassName
  ].filter(Boolean).join(' ')

  return (
    <button 
      type="button"
      onClick={handleBack}
      disabled={disabled}
      className={buttonClasses}
      aria-label="Go back"
    >
      <ArrowLeft className={iconClasses} />
    </button>
  )
} 