import React from 'react'
import { NavLinksLayoutProps } from './types'
import { useTheme } from '../theme/ThemeProvider'
import styles from './NavLinksLayout.module.css'

export const NavLinksLayout: React.FC<NavLinksLayoutProps> = ({ 
  middle, 
  right, 
  className 
}) => {
  const { theme } = useTheme()

  const containerClasses = [
    styles.container,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={containerClasses}>
      <div className={styles.contentWrapper}>
        <div className={styles.middle}>
          {middle}
        </div>
        {right && (
          <div className={styles.right}>
            {right}
          </div>
        )}
      </div>
    </div>
  )
} 