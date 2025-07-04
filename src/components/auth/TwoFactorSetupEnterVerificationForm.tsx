import React, { useState, useRef, useEffect } from 'react'
import { Button } from '../common/Button'
import { BackArrow } from '../common/BackArrow'
import { AlertMessage } from '../common/AlertMessage'
import { TwoFactorSetupEnterVerificationFormProps } from './types'
import { useTheme } from '../../theme/ThemeProvider'
import styles from './TwoFactorSetupEnterVerificationForm.module.css'

export const TwoFactorSetupEnterVerificationForm: React.FC<TwoFactorSetupEnterVerificationFormProps> = ({
  onVerify,
  isLoading = false,
  error,
  backRoute = '/twofactor',
  className
}) => {
  const { theme } = useTheme()
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleInputChange = (index: number, value: string) => {
    // Only allow digits and limit to 1 character
    if (value && !/^\d$/.test(value)) return
    
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input if value is entered
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-verify when all 6 digits are entered
    if (value && index === 5) {
      const fullCode = newCode.join('')
      if (fullCode.length === 6) {
        onVerify?.(fullCode)
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    // Handle paste
    else if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      navigator.clipboard.readText().then(text => {
        const digits = text.replace(/\D/g, '').slice(0, 6)
        if (digits.length === 6) {
          const newCode = digits.split('')
          setCode(newCode)
          onVerify?.(digits)
        }
      }).catch(() => {
        // Paste failed, ignore
      })
    }
  }

  const handleVerify = () => {
    const fullCode = code.join('')
    if (fullCode.length === 6 && !isLoading) {
      onVerify?.(fullCode)
    }
  }

  const isCodeComplete = code.every(digit => digit !== '')

  const containerClasses = [
    styles.container,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={containerClasses}>
      {theme.customization.showBackArrow && (
        <div className={styles.backArrow}>
          <BackArrow
            fallbackRoute={backRoute}
            className={styles.backArrowIcon}
            disabled={isLoading}
          />
          <div className={styles.progressContainer}>
            <div className={styles.progressBar} />
            <div className={styles.progressBarEmpty} />
          </div>
          <div className={styles.spacer} />
        </div>
      )}

      <div className={styles.titleContainer}>
        <b className={styles.title}>Enter your verification code</b>
      </div>

      <div className={styles.description}>
        <div className={styles.descriptionText}>
          Enter the code that you see in your authenticator app
        </div>
      </div>

      {error && (
        <AlertMessage type="error" message={error} className={styles.errorMessage} />
      )}

      <div className={styles.inputContainer}>
        <div className={styles.inputRow}>
          {code.map((digit, index) => (
            <input
              key={index}
              ref={el => { inputRefs.current[index] = el }}
              className={styles.digitInput}
              type="text"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength={1}
              disabled={isLoading}
            />
          ))}
        </div>
      </div>

      <Button 
        onClick={handleVerify}
        disabled={!isCodeComplete || isLoading}
        type="button"
        isLoading={isLoading}
        loadingText="Verifying..."
        fullWidth
      >
        Verify
      </Button>

      <div className={styles.helpText}>
        You can also paste your 6-digit code
      </div>
    </div>
  )
} 