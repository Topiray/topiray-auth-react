import React from 'react'
import { Button } from '../common/Button'
import { BackArrow } from '../common/BackArrow'
import { VerifyEmailFormProps } from './types'
import { useTheme } from '../../theme/ThemeProvider'
import styles from './VerifyEmailForm.module.css'

export const VerifyEmailForm: React.FC<VerifyEmailFormProps> = ({
  onSubmit,
  onResendEmail,
  email,
  isLoading = false,
  className,
  backArrowFallbackRoute = "/signup"
}) => {
  const { theme } = useTheme()

  const containerClasses = [
    styles.container,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={containerClasses}>
      {theme.customization.showBackArrow && (
        <div className={styles.backArrow}>
          <BackArrow 
            disabled={isLoading}
            className={styles.backArrowIcon}
            fallbackRoute={backArrowFallbackRoute}
          />
          <div className={styles.progressContainer}>
            <div className={styles.progressBar} />
            <div className={styles.progressBarEmpty} />
            <div className={styles.progressBarEmpty} />
          </div>
          <div className={styles.spacer} />
        </div>
      )}

      <div className={styles.imageContainer}>
        <img className={styles.image} alt="Email verification" src="/images/email-verification.png" />
      </div>

      <div className={styles.titleContainer}>
        <div className={styles.title}>
          <b className={styles.titleText}>Verify your email</b>
        </div>
      </div>

      <div className={styles.description}>
        <div className={styles.descriptionText}>
          <span>We sent a verification email to </span>
          <b>{email || '[your email]'}</b>
          <span>. Please tap the link inside that email to continue.</span>
        </div>
      </div>

      <Button 
        onClick={onSubmit} 
        disabled={isLoading}
        fullWidth
      >
        Check my inbox
      </Button>

      <Button 
        variant="secondary" 
        onClick={onResendEmail} 
        isLoading={isLoading}
        loadingText="Sending..."
        fullWidth
      >
        Resend Email
      </Button>
    </div>
  )
} 