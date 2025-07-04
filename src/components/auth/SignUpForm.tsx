import React, { useState } from 'react'
import { Building2, User } from 'lucide-react'
import { Button } from '../common/Button'
import { SocialLoginButtons } from '../common/SocialLoginButtons'
import { SignUpFormProps } from './types'
import { useTheme } from '../../theme/ThemeProvider'
import styles from './SignUpForm.module.css'

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit,
  onSignIn,
  onSocialLogin,
  logoSrc,
  isLoading = false,
  className
}) => {
  const { theme } = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accountType, setAccountType] = useState<'business' | 'individual'>('individual')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(email, password, accountType)
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
            <b className={styles.title}>Create your account</b>
          </div>
          {(logoSrc || theme.brand.logo) && theme.customization.showLogo && (
            <img 
              className={styles.logoIcon} 
              alt={theme.brand.logoAlt || 'Logo'} 
              src={logoSrc || theme.brand.logo} 
            />
          )}
        </div>
      )}

      <div className={styles.accountTypeContainer}>
        <button
          type="button"
          className={`${styles.accountTypeButton} ${accountType === 'business' ? styles.selected : ''}`}
          onClick={() => setAccountType('business')}
          disabled={isLoading}
        >
          <Building2 className={styles.accountTypeIcon} />
          <b className={styles.accountTypeText}>Business</b>
        </button>
        <button
          type="button"
          className={`${styles.accountTypeButton} ${accountType === 'individual' ? styles.selected : ''}`}
          onClick={() => setAccountType('individual')}
          disabled={isLoading}
        >
          <User className={styles.accountTypeIcon} />
          <b className={styles.accountTypeText}>Individual</b>
        </button>
      </div>

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
          loadingText="Creating account..."
          fullWidth
        >
          Create Account
        </Button>
      </form>

      {theme.customization.showSocialLogin && (
        <>
          <div className={styles.divider}>
            <div className={styles.dividerLine} />
            <div className={styles.dividerText}>
              <div className={styles.caption}>or sign up with</div>
            </div>
            <div className={styles.dividerLine} />
          </div>

          <SocialLoginButtons onSocialLogin={onSocialLogin} isLoading={isLoading} />
        </>
      )}

      <div className={styles.footerContainer}>
        <div className={styles.footerRow}>
          <span className={styles.caption}>Already have an account? </span>
          <button
            type="button"
            className={styles.linkButton}
            onClick={onSignIn}
            disabled={isLoading}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  )
} 