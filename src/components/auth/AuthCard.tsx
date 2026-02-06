import React from 'react'
import { AuthCardProps } from './types'
import { useTheme } from '../../theme/ThemeProvider'
import styles from './AuthCard.module.css'

export const AuthCard: React.FC<AuthCardProps> = ({
  children,
  className
}) => {
  useTheme()

  const cardClasses = [
    styles.authCard,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={cardClasses}>
      {children}
    </div>
  )
} 