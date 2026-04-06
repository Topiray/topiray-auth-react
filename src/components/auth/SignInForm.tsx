import React, { useState } from 'react'
import { Button } from '../common/Button'
import { SocialLoginButtons } from '../common/SocialLoginButtons'
import { SignInFormProps } from './types'
import { useTheme } from '../../theme/ThemeProvider'
import { useTranslation } from '../../i18n/I18nProvider'
import styles from './SignInForm.module.css'

export const SignInForm: React.FC<SignInFormProps> = ({
  onSubmit,
  onForgotPassword,
  onSignUp,
  onSocialLogin,
  authProviders = ['apple', 'google', 'facebook'],
  logoSrc,
  isLoading = false,
  className
}) => {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(email, password)
  }

  const containerClasses = [
    styles.container,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={containerClasses}>
      {theme.customization.showFormHeader && (
        <div className={styles.formHeader}>
          <div className={styles.titleContainer}>
            <b className={styles.title}>{t('topiray.auth.signIn.title')}</b>
          </div>
          {(logoSrc || theme.brand.secondaryLogo) && theme.customization.showLogo && (
            <img 
              className={styles.logoIcon} 
              alt={theme.brand.logoAlt || 'Logo'} 
              src={logoSrc || theme.brand.secondaryLogo} 
            />
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.inputField}
          placeholder={t('topiray.auth.signIn.emailPlaceholder')}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />

        <input
          className={styles.inputField}
          placeholder={t('topiray.auth.signIn.passwordPlaceholder')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />

        <Button
          type="submit"
          isLoading={isLoading}
          loadingText={t('topiray.auth.signIn.submittingButton')}
          fullWidth
        >
          {t('topiray.auth.signIn.submitButton')}
        </Button>
      </form>

      {theme.customization.showSocialLogin && (
        <>
          <div className={styles.divider}>
            <div className={styles.dividerLine} />
            <div className={styles.dividerText}>
              <div className={styles.caption}>{t('topiray.auth.signIn.dividerText')}</div>
            </div>
            <div className={styles.dividerLine} />
          </div>

          <SocialLoginButtons providers={authProviders} onSocialLogin={onSocialLogin} isLoading={isLoading} />
        </>
      )}

      <div className={styles.footerContainer}>
        <div className={styles.footerRow}>
          <button
            type="button"
            className={styles.linkButton}
            onClick={onForgotPassword}
            disabled={isLoading}
          >
            {t('topiray.auth.signIn.forgotPassword')}
          </button>
        </div>
        <div className={styles.footerRow}>
          <span className={styles.caption}>{t('topiray.auth.signIn.noAccount')} </span>
          <button
            type="button"
            className={styles.linkButton}
            onClick={onSignUp}
            disabled={isLoading}
          >
            {t('topiray.auth.signIn.signUpLink')}
          </button>
        </div>
      </div>
    </div>
  )
} 