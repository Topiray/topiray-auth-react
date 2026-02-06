import React, { useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from '../common/Button'
import { TwoFactorSetupCompleteFormProps } from './types'
import { useTheme } from '../../theme/ThemeProvider'
import styles from './TwoFactorSetupCompleteForm.module.css'

export const TwoFactorSetupCompleteForm: React.FC<TwoFactorSetupCompleteFormProps> = ({
  onDone,
  backupCodes = [
    '1337gd', '298edg', '388hd3', 'a1b2c3',
    'x4y5z6', 'm7n8o9', 'z1x2c3', 'v4b5n6',
    'm7k8j9', '4b5c6a', '2d3e4f', '9g8h7j'
  ],
  isLoading = false,
  className
}) => {
  useTheme()
  const [copied, setCopied] = useState(false)

  const handleDone = () => {
    if (!isLoading) {
      onDone?.()
    }
  }

  const handleCopy = async () => {
    try {
      const codesText = backupCodes.join('\n')
      await navigator.clipboard.writeText(codesText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy backup codes:', error)
    }
  }

  const handleDownload = () => {
    const codesText = backupCodes.join('\n')
    const blob = new Blob([codesText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'backup-codes.txt'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Group backup codes into columns of 3
  const groupedCodes = []
  for (let i = 0; i < backupCodes.length; i += 3) {
    groupedCodes.push(backupCodes.slice(i, i + 3))
  }

  const containerClasses = [
    styles.container,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={containerClasses}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <b className={styles.title}>You're all set</b>
        </div>
        <Check className={styles.checkIcon} />
      </div>

      <div className={styles.description}>
        <div className={styles.descriptionText}>
          <p>
            Now you can use the mobile authenticator app to get an authentication code any time you log in.
          </p>
          <p>
            Save these single-use backup codes in a safe place.
          </p>
        </div>
      </div>

      <div className={styles.codesContainer}>
        <div className={styles.backupCodesContainer}>
          {groupedCodes.map((group, groupIndex) => (
            <div key={groupIndex} className={styles.codeGroup}>
              <div className={styles.codeColumn}>
                {group.map((code, codeIndex) => (
                  <p key={codeIndex} className={styles.codeText}>
                    {code}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.buttonContainer}>
          <button 
            className={styles.pillButton}
            onClick={handleCopy}
            disabled={isLoading}
            type="button"
          >
            <div className={styles.pillTag}>
              {copied ? 'Copied!' : 'Copy'}
            </div>
          </button>
          <button 
            className={styles.pillButton}
            onClick={handleDownload}
            disabled={isLoading}
            type="button"
          >
            <div className={styles.pillTag}>Download</div>
          </button>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerText}>
          These backup codes let you log in if you can't receive a text message
          or don't have access to any of your other two-factor authentication
          methods.
        </div>
      </div>

      <div className={styles.actions}>
        <Button 
          onClick={handleDone}
          disabled={isLoading}
          type="button"
          isLoading={isLoading}
          loadingText="Loading..."
          fullWidth
        >
          Done
        </Button>
        <Button 
          variant="secondary"
          onClick={handleCopy}
          disabled={isLoading}
          type="button"
          fullWidth
        >
          {copied ? 'Copied!' : 'Copy Codes'}
        </Button>
      </div>
    </div>
  )
} 