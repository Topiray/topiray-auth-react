import React, { useEffect, useState } from 'react'
import { BackArrow } from '../common/BackArrow'
import { Button } from '../common/Button'
import { AlertMessage } from '../common/AlertMessage'
import { ResetPasswordFormProps } from './types'
import { useTheme } from '../../theme/ThemeProvider'
import { useTranslation } from '../../i18n/I18nProvider'
import styles from './ResetPasswordForm.module.css'

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSubmit,
  isLoading = false,
  className,
  description = "Enter your new password below. Make sure it's secure and at least 8 characters long.",
  errorStr = null,
  backArrowFallbackRoute = "/signin"
}) => {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(errorStr || '')

  useEffect(() => {
    setError(errorStr || '')
  }, [errorStr])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!password) {
      setError(t('topiray.auth.resetPassword.errors.passwordRequired'))
      return
    }

    if (!confirmPassword) {
      setError(t('topiray.auth.resetPassword.errors.confirmPasswordRequired'))
      return
    }

    if (password !== confirmPassword) {
      setError(t('topiray.auth.resetPassword.errors.passwordsMismatch'))
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
            fallbackRoute={backArrowFallbackRoute}
            className={styles.backArrowIcon}
            disabled={isLoading}
          />
          <div className={styles.spacer} />
        </div>
      )}
      
      <div className={styles.titleContainer}>
        <b className={styles.title}>{t('topiray.auth.resetPassword.title')}</b>
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
        placeholder={t('topiray.auth.resetPassword.newPasswordPlaceholder')}
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading} 
      />

      <input 
        required 
        className={styles.passwordInput} 
        type="password" 
        placeholder={t('topiray.auth.resetPassword.confirmPasswordPlaceholder')}
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={isLoading} 
      />
      
      <Button
        type="submit"
        isLoading={isLoading}
        loadingText={t('topiray.auth.resetPassword.submittingButton')}
        fullWidth
      >
        {t('topiray.auth.resetPassword.submitButton')}
      </Button>
    </form>
  )
}
