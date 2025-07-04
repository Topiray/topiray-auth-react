import React from 'react'
import { TwoPanelLayoutProps } from './types'
import { useTheme } from '../theme/ThemeProvider'
import styles from './TwoPanelLayout.module.css'

export const TwoPanelLayout: React.FC<TwoPanelLayoutProps> = ({
  leftContent,
  rightContent,
  leftBackgroundImage,
  logoSrc,
  className
}) => {
  const { theme } = useTheme()

  const layoutClasses = [
    styles.layout,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={layoutClasses}>
      <div className={styles.leftPane}>
        <div 
          className={styles.leftBackground}
          style={{
            backgroundImage: leftBackgroundImage ? `url(${leftBackgroundImage})` : undefined
          }}
        >
          <div className={styles.leftContent}>
            {leftContent || (
              <>
                {(logoSrc || theme.brand.logo) && (
                  <img 
                    className={styles.logoIcon} 
                    alt={theme.brand.logoAlt || 'Logo'} 
                    src={logoSrc || theme.brand.logo} 
                  />
                )}
                {theme.customization.leftPanelContent}
              </>
            )}
            <div className={styles.backgroundBlur} />
          </div>
        </div>
      </div>
      <div className={styles.rightPane}>
        {rightContent}
      </div>
    </div>
  )
} 