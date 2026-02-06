import React, { useState } from 'react'
import { BackArrow } from '../common/BackArrow'
import { Button } from '../common/Button'
import { AlertMessage } from '../common/AlertMessage'
import { ResetPasswordFormProps } from './types'
import { useTheme } from '../../theme/ThemeProvider'
import styles from './ResetPasswordForm.module.css'

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSubmit,
  isLoading = false,
  className,
  description = "Enter your new password below. Make sure it's secure and at least 8 characters long."
}) => {
  const { theme } = useTheme()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!password) {
      setError('Password is required')
      return
    }

    if (!confirmPassword) {
      setError('Confirm password is required')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    onSubmit(password)
  }

  const containerClasses = [
    styles.container,
    className
  ].filter(Boolean).join(' ')

  return (
    <form onSubmit={handleSubmit} className={containerClasses}>
      {theme.customization.showBackArrow && (
        <div className={styles.backArrow}>
          <BackArrow 
            fallbackRoute="/signin"
            className={styles.backArrowIcon}
            disabled={isLoading}
          />
          <div className={styles.spacer} />
        </div>
      )}
      
      <div className={styles.titleContainer}>
        <b className={styles.title}>Reset your password</b>
      </div>
      
      <div className={styles.description}>
        <div className={styles.descriptionText}>
          {description}
        </div>
      </div>

      {error && (
        <AlertMessage
          type="error"
          message={error}
          className={styles.alert}
        />
      )}
      
      <input 
        required 
        className={styles.passwordInput} 
        type="password" 
        placeholder="New Password"
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading} 
      />

      <input 
        required 
        className={styles.passwordInput} 
        type="password" 
        placeholder="Confirm Password"
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={isLoading} 
      />
      
      <Button
        type="submit"
        isLoading={isLoading}
        loadingText="Resetting..."
        fullWidth
      >
        Reset Password
      </Button>
    </form>
  )
}
