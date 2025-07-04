import React, { useState } from 'react'
import { Button } from '../common/Button'
import { SocialLoginButtons } from '../common/SocialLoginButtons'
import { SignInFormProps } from './types'
import { useTheme } from '../../theme/ThemeProvider'
import styles from './SignInForm.module.css'

export const SignInForm: React.FC<SignInFormProps> = ({
  onSubmit,
  onForgotPassword,
  onSignUp,
  onSocialLogin,
  logoSrc,
  isLoading = false,
  className
}) => {
  const { theme } = useTheme()
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
            <b className={styles.title}>Sign in</b>
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
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />

        <input
          className={styles.inputField}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />

        <Button
          type="submit"
          isLoading={isLoading}
          loadingText="Signing in..."
          fullWidth
        >
          Continue
        </Button>
      </form>

      {theme.customization.showSocialLogin && (
        <>
          <div className={styles.divider}>
            <div className={styles.dividerLine} />
            <div className={styles.dividerText}>
              <div className={styles.caption}>or sign in with</div>
            </div>
            <div className={styles.dividerLine} />
          </div>

          <SocialLoginButtons onSocialLogin={onSocialLogin} isLoading={isLoading} />
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
            Forgot Password?
          </button>
        </div>
        <div className={styles.footerRow}>
          <span className={styles.caption}>Don't have an account? </span>
          <button
            type="button"
            className={styles.linkButton}
            onClick={onSignUp}
            disabled={isLoading}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  )
} 