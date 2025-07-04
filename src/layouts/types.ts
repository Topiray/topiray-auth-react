import { ReactNode } from 'react'

export interface TwoPanelLayoutProps {
  leftContent?: ReactNode
  rightContent: ReactNode
  leftBackgroundImage?: string
  logoSrc?: string
  className?: string
}

export interface NavLinksLayoutProps {
  middle?: ReactNode
  right?: ReactNode
  className?: string
} 