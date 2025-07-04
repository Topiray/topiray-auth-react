import React, { useState } from 'react'
import { BackArrow } from '../common/BackArrow'
import { Button } from '../common/Button'
import { ForgottenPasswordFormProps } from './types'
import { useTheme } from '../../theme/ThemeProvider'
import styles from './ForgottenPasswordForm.module.css'

export const ForgottenPasswordForm: React.FC<ForgottenPasswordFormProps> = ({
  onSubmit,
  isLoading = false,
  className
}) => {
  const { theme } = useTheme()
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(email)
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
        <b className={styles.title}>Forgot your password?</b>
      </div>
      
      <div className={styles.description}>
        <div className={styles.descriptionText}>
          Enter your email address associated to your account and we will send
          you a one time link to reset your password.
        </div>
      </div>
      
      <input 
        required 
        className={styles.emailInput} 
        type="email" 
        placeholder="Email"
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading} 
      />
      
      <Button
        type="submit"
        isLoading={isLoading}
        loadingText="Sending..."
        fullWidth
      >
        Reset Password
      </Button>
    </form>
  )
} 