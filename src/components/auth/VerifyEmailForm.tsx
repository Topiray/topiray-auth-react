import React from 'react'
import { Button } from '../common/Button'
import { BackArrow } from '../common/BackArrow'
import { VerifyEmailFormProps } from './types'
import { useTheme } from '../../theme/ThemeProvider'
import { useTranslation } from '../../i18n/I18nProvider'
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
  const { t } = useTranslation()

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
        <img className={styles.image} alt={t('topiray.auth.verifyEmail.imageAlt')} src="/images/email-verification.png" />
      </div>

      <div className={styles.titleContainer}>
        <div className={styles.title}>
          <b className={styles.titleText}>{t('topiray.auth.verifyEmail.title')}</b>
        </div>
      </div>

      <div className={styles.description}>
        <div className={styles.descriptionText}>
          <span>{t('topiray.auth.verifyEmail.descriptionPrefix')} </span>
          <b>{email || t('topiray.auth.verifyEmail.emailFallback')}</b>
          <span>{t('topiray.auth.verifyEmail.descriptionSuffix')}</span>
        </div>
      </div>

      <Button 
        onClick={onSubmit} 
        disabled={isLoading}
        fullWidth
      >
        {t('topiray.auth.verifyEmail.checkInbox')}
      </Button>

      <Button 
        variant="secondary" 
        onClick={onResendEmail} 
        isLoading={isLoading}
        loadingText={t('topiray.auth.verifyEmail.resendingEmail')}
        fullWidth
      >
        {t('topiray.auth.verifyEmail.resendEmail')}
      </Button>
    </div>
  )
} 