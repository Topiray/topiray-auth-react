import React from 'react'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { AlertMessageProps } from './types'
import { useTheme } from '../../theme/ThemeProvider'
import styles from './AlertMessage.module.css'

export const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  type,
  onClose,
  dismissible = false,
  className
}) => {
  const { theme } = useTheme()

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className={styles.icon} />
      case 'error':
        return <AlertCircle className={styles.icon} />
      case 'warning':
        return <AlertTriangle className={styles.icon} />
      case 'info':
        return <Info className={styles.icon} />
      default:
        return null
    }
  }

  const alertClasses = [
    styles.alert,
    styles[type],
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={alertClasses} role="alert">
      <div className={styles.content}>
        {getIcon()}
        <span className={styles.message}>{message}</span>
      </div>
      {dismissible && onClose && (
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close alert"
        >
          <X className={styles.closeIcon} />
        </button>
      )}
    </div>
  )
} 