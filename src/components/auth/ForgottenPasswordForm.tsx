import React, { useState } from 'react'
import { BackArrow } from '../common/BackArrow'
import { Button } from '../common/Button'
import { ForgottenPasswordFormProps } from './types'
import { useTheme } from '../../theme/ThemeProvider'
import { useTranslation } from '../../i18n/I18nProvider'
import styles from './ForgottenPasswordForm.module.css'

export const ForgottenPasswordForm: React.FC<ForgottenPasswordFormProps> = ({
  onSubmit,
  isLoading = false,
  className,
  backArrowFallbackRoute = "/signin"
}) => {
  const { theme } = useTheme()
  const { t } = useTranslation()
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
            fallbackRoute={backArrowFallbackRoute}
            className={styles.backArrowIcon}
            disabled={isLoading}
          />
          <div className={styles.spacer} />
        </div>
      )}
      
      <div className={styles.titleContainer}>
        <b className={styles.title}>{t('topiray.auth.forgottenPassword.title')}</b>
      </div>
      
      <div className={styles.description}>
        <div className={styles.descriptionText}>
          {t('topiray.auth.forgottenPassword.description')}
        </div>
      </div>
      
      <input 
        required 
        className={styles.emailInput} 
        type="email" 
        placeholder={t('topiray.auth.forgottenPassword.emailPlaceholder')}
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading} 
      />
      
      <Button
        type="submit"
        isLoading={isLoading}
        loadingText={t('topiray.auth.forgottenPassword.submittingButton')}
        fullWidth
      >
        {t('topiray.auth.forgottenPassword.submitButton')}
      </Button>
    </form>
  )
} 