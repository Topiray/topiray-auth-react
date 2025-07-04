import React from 'react'
import { CircularProgress } from '@mui/material'
import { ButtonProps } from './types'
import { useTheme } from '../../theme/ThemeProvider'
import styles from './Button.module.css'

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  loadingText = 'Loading...',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className,
  disabled,
  ...props
}) => {
  const { theme } = useTheme()

  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className
  ].filter(Boolean).join(' ')

  const isDisabled = disabled || isLoading

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={styles.loading}>
          <CircularProgress 
            size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} 
            thickness={4}
            style={{ 
              color: variant === 'primary' ? theme.colors.buttonPrimaryText : theme.colors.buttonSecondaryText 
            }}
          />
          <span className={styles.loadingText}>{loadingText}</span>
        </div>
      )
    }

    if (icon) {
      return (
        <div className={styles.content}>
          {iconPosition === 'left' && <span className={styles.icon}>{icon}</span>}
          <span className={styles.text}>{children}</span>
          {iconPosition === 'right' && <span className={styles.icon}>{icon}</span>}
        </div>
      )
    }

    return <span className={styles.text}>{children}</span>
  }

  return (
    <button
      className={buttonClasses}
      disabled={isDisabled}
      {...props}
    >
      {renderContent()}
    </button>
  )
} 