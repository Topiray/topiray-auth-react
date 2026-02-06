import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { 
  ThemeProvider, 
  defaultTheme, 
  darkTheme, 
  createCustomTheme,
  // Layout components
  TwoPanelLayout,
  NavLinksLayout,
  // Common components
  Button, 
  AlertMessage, 
  BackArrow, 
  SocialLoginButtons,
  // Auth components
  AuthCard,
  SignInForm,
  SignUpForm,
  ForgottenPasswordForm,
  ResetPasswordForm,
  VerifyEmailForm,
  TwoFactorSetupForm,
  TwoFactorSetupEnterVerificationForm,
  TwoFactorSetupCompleteForm
} from './index'
import type { ThemeConfig } from './index'

// Create a custom theme for demonstration
const customTheme = createCustomTheme({
  colors: {
    primary: '#9333ea',
    secondary: '#64748b',
    tertiary: '#94a3b8',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#cbd5e1',
    border: '#334155',
    success: '#22c55e',
    warning: '#eab308',
    error: '#ef4444',
    info: '#3b82f6',
    hover: '#334155',
    active: '#475569',
    disabled: '#64748b',
    inputBackground: '#1e293b',
    inputBorder: '#334155',
    inputText: '#f1f5f9',
    inputPlaceholder: '#94a3b8',
    buttonPrimary: '#9333ea',
    buttonPrimaryText: '#ffffff',
    buttonSecondary: '#64748b',
    buttonSecondaryText: '#ffffff',
    buttonSocial: '#374151',
    buttonSocialText: '#ffffff'
  },
  brand: {
    logo: 'https://via.placeholder.com/34x34/9333ea/ffffff?text=P',
    logoAlt: 'Purple Logo',
  }
})

// Mock API functions to simulate real backend calls
const mockAPI = {
  signIn: (email: string, password: string) => 
    new Promise<{ succeeded: boolean; requiresTwoFactor?: boolean; isNotAllowed?: boolean; userId?: string; error?: string }>((resolve) => {
      setTimeout(() => {
        if (email === 'demo@example.com' && password === 'password') {
          resolve({ succeeded: true })
        } else if (email === '2fa@example.com' && password === 'password') {
          resolve({ succeeded: false, requiresTwoFactor: true, userId: '123' })
        } else if (email === 'unverified@example.com' && password === 'password') {
          resolve({ succeeded: false, isNotAllowed: true })
        } else {
          resolve({ succeeded: false, error: 'Invalid email or password' })
        }
      }, 1500)
    }),
    
  signUp: (email: string, password: string, accountType: string | null) =>
    new Promise<{ succeeded: boolean; error?: string }>((resolve) => {
      setTimeout(() => {
        if (email.includes('exists')) {
          resolve({ succeeded: false, error: 'Email already exists' })
        } else {
          resolve({ succeeded: true })
        }
      }, 2000)
    }),
    
  forgotPassword: (email: string) =>
    new Promise<{ succeeded: boolean }>((resolve) => {
      setTimeout(() => resolve({ succeeded: true }), 1000)
    }),
    
  resendEmail: (email: string) =>
    new Promise<{ succeeded: boolean }>((resolve) => {
      setTimeout(() => resolve({ succeeded: true }), 800)
    }),
    
  generateQRCode: () =>
    new Promise<{ authenticatorUri: string; sharedKey: string }>((resolve) => {
      setTimeout(() => resolve({
        authenticatorUri: 'otpauth://totp/Demo:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Demo',
        sharedKey: 'JBSWY3DPEHPK3PXP'
      }), 1200)
    }),
    
  verifyTwoFactor: (code: string) =>
    new Promise<{ succeeded: boolean; recoveryCodes?: string[] }>((resolve) => {
      setTimeout(() => {
        if (code === '123456') {
          resolve({ 
            succeeded: true, 
            recoveryCodes: ['1337gd', '298edg', '388hd3', 'a1b2c3', 'x4y5z6', 'm7n8o9', 'z1x2c3', 'v4b5n6', 'm7k8j9', '4b5c6a', '2d3e4f', '9g8h7j']
          })
        } else {
          resolve({ succeeded: false })
        }
      }, 1000)
    })
}

// Application state management
interface AppState {
  user: { email: string } | null
  currentPage: string
  authFlow: {
    email?: string
    userId?: string
    recoveryCodes?: string[]
    qrCodeUri?: string
    sharedKey?: string
  }
  notifications: {
    success?: string
    error?: string
    info?: string
  }
}

const Demo: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(defaultTheme)
  const [appState, setAppState] = useState<AppState>({
    user: null,
    currentPage: 'signin',
    authFlow: {},
    notifications: {}
  })
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const themes = [
    { name: 'Light', value: defaultTheme },
    { name: 'Dark', value: darkTheme },
    { name: 'Custom Purple', value: customTheme }
  ]

  const pages = [
    { id: 'signin', name: 'Sign In', category: 'auth' },
    { id: 'signup', name: 'Sign Up', category: 'auth' },
    { id: 'forgot', name: 'Forgot Password', category: 'auth' },
    { id: 'reset', name: 'Reset Password', category: 'auth' },
    { id: 'verify', name: 'Verify Email', category: 'auth' },
    { id: 'twofactor-setup', name: '2FA Setup', category: '2fa' },
    { id: 'twofactor-verify', name: '2FA Verify', category: '2fa' },
    { id: 'twofactor-complete', name: '2FA Complete', category: '2fa' },
    { id: 'dashboard', name: 'Dashboard', category: 'app' },
    { id: 'common', name: 'Common Components', category: 'demo' },
    { id: 'layout', name: 'Layout Components', category: 'demo' }
  ]

  // Helper functions
  const setLoading = (key: string, value: boolean) => {
    setLoadingStates(prev => ({ ...prev, [key]: value }))
  }

  const setNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setAppState(prev => ({
      ...prev,
      notifications: { [type]: message }
    }))
    setTimeout(() => {
      setAppState(prev => ({
        ...prev,
        notifications: {}
      }))
    }, 5000)
  }

  const navigateTo = (page: string, flowData?: Partial<AppState['authFlow']>) => {
    setAppState(prev => ({
      ...prev,
      currentPage: page,
      authFlow: { ...prev.authFlow, ...flowData },
      notifications: {}
    }))
  }

  // Auth handlers
  const handleSignIn = async (email: string, password: string) => {
    setLoading('signin', true)
    try {
      const result = await mockAPI.signIn(email, password)
      
      if (result.succeeded) {
        setAppState(prev => ({ ...prev, user: { email } }))
        setNotification('success', 'Signed in successfully!')
        navigateTo('dashboard')
      } else if (result.requiresTwoFactor) {
        navigateTo('twofactor-signin', { email, userId: result.userId })
      } else if (result.isNotAllowed) {
        navigateTo('verify', { email })
      } else {
        setNotification('error', result.error || 'Sign in failed')
      }
    } catch (error) {
      setNotification('error', 'An error occurred during sign in')
    } finally {
      setLoading('signin', false)
    }
  }

  const handleSignUp = async (email: string, password: string, accountType: string | null) => {
    setLoading('signup', true)
    try {
      const result = await mockAPI.signUp(email, password, accountType)
      
      if (result.succeeded) {
        setNotification('success', 'Account created! Please verify your email.')
        navigateTo('verify', { email })
      } else {
        setNotification('error', result.error || 'Sign up failed')
      }
    } catch (error) {
      setNotification('error', 'An error occurred during sign up')
    } finally {
      setLoading('signup', false)
    }
  }

  const handleForgotPassword = async (email: string) => {
    setLoading('forgot', true)
    try {
      await mockAPI.forgotPassword(email)
      setNotification('success', 'Password reset email sent!')
      navigateTo('reset', { email })
    } catch (error) {
      setNotification('error', 'Failed to send reset email')
    } finally {
      setLoading('forgot', false)
    }
  }

  const handleResetPassword = async (newPassword: string) => {
    setLoading('reset', true)
    try {
      // Simulate API call to reset password
      await new Promise(resolve => setTimeout(resolve, 1500))
      setNotification('success', 'Password reset successfully!')
      navigateTo('signin')
    } catch (error) {
      setNotification('error', 'Failed to reset password')
    } finally {
      setLoading('reset', false)
    }
  }

  const handleResendEmail = async () => {
    if (!appState.authFlow.email) return
    
    setLoading('resend', true)
    try {
      await mockAPI.resendEmail(appState.authFlow.email)
      setNotification('success', 'Verification email sent!')
    } catch (error) {
      setNotification('error', 'Failed to resend email')
    } finally {
      setLoading('resend', false)
    }
  }

  const handleTwoFactorSetup = async () => {
    setLoading('qr', true)
    try {
      const result = await mockAPI.generateQRCode()
      setAppState(prev => ({
        ...prev,
        authFlow: {
          ...prev.authFlow,
          qrCodeUri: result.authenticatorUri,
          sharedKey: result.sharedKey
        }
      }))
      
      // Simulate QR code rendering
      setTimeout(() => {
        const container = document.getElementById('qr-code-container')
        if (container && result.authenticatorUri) {
          import('qrcode').then(QRCode => {
            QRCode.toCanvas(container, result.authenticatorUri, {
              width: 193,
              margin: 1
            }).catch(() => {
              container.innerHTML = `<div style="padding: 2rem; text-align: center; color: var(--topiray-color-text-secondary);">QR Code: ${result.authenticatorUri}</div>`
            })
          }).catch(() => {
            container.innerHTML = `<div style="padding: 2rem; text-align: center; color: var(--topiray-color-text-secondary);">QR Code: ${result.authenticatorUri}</div>`
          })
        }
      }, 100)
    } catch (error) {
      setNotification('error', 'Failed to generate QR code')
    } finally {
      setLoading('qr', false)
    }
  }

  const handleTwoFactorVerify = async (code: string) => {
    setLoading('verify2fa', true)
    try {
      const result = await mockAPI.verifyTwoFactor(code)
      
      if (result.succeeded && result.recoveryCodes) {
        navigateTo('twofactor-complete', { recoveryCodes: result.recoveryCodes })
      } else {
        setNotification('error', 'Invalid verification code')
      }
    } catch (error) {
      setNotification('error', 'Verification failed')
    } finally {
      setLoading('verify2fa', false)
    }
  }

  const handleSocialLogin = (provider: 'apple' | 'google' | 'facebook') => {
    setNotification('info', `${provider} login would be handled by your authentication provider`)
  }

  const handleSignOut = () => {
    setAppState(prev => ({ ...prev, user: null, authFlow: {} }))
    setNotification('success', 'Signed out successfully')
    navigateTo('signin')
  }

  // Initialize 2FA setup on page load
  useEffect(() => {
    if (appState.currentPage === 'twofactor-setup' && !appState.authFlow.qrCodeUri) {
      handleTwoFactorSetup()
    }
  }, [appState.currentPage])

  const renderPage = () => {
    const { currentPage, authFlow, notifications } = appState

    // Common layout wrapper
    const renderWithLayout = (content: React.ReactNode) => (
      <TwoPanelLayout
        leftContent={
          <div style={{ 
            padding: '2rem', 
            textAlign: 'center',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            <img 
              src={currentTheme.brand.logo} 
              alt={currentTheme.brand.logoAlt}
              style={{ width: '80px', height: '80px', borderRadius: '50%' }}
            />
            <h1 style={{ margin: 0, fontSize: '2rem' }}>Topiray Auth</h1>
            <p style={{ margin: 0, opacity: 0.8 }}>Secure authentication for modern apps</p>
          </div>
        }
        rightContent={
          <AuthCard>
            {notifications.success && (
              <AlertMessage 
                message={notifications.success} 
                type="success" 
                dismissible
                onClose={() => setAppState(prev => ({ ...prev, notifications: {} }))}
              />
            )}
            {notifications.error && (
              <AlertMessage 
                message={notifications.error} 
                type="error" 
                dismissible
                onClose={() => setAppState(prev => ({ ...prev, notifications: {} }))}
              />
            )}
            {notifications.info && (
              <AlertMessage 
                message={notifications.info} 
                type="info" 
                dismissible
                onClose={() => setAppState(prev => ({ ...prev, notifications: {} }))}
              />
            )}
            {content}
          </AuthCard>
        }
      />
    )

    switch (currentPage) {
      case 'signin':
        return renderWithLayout(
          <SignInForm
            onSubmit={handleSignIn}
            onForgotPassword={() => navigateTo('forgot')}
            onSignUp={() => navigateTo('signup')}
            onSocialLogin={handleSocialLogin}
            isLoading={loadingStates.signin}
            logoSrc={currentTheme.brand.logo}
          />
        )

      case 'signup':
        return renderWithLayout(
          <SignUpForm
            onSubmit={handleSignUp}
            onSignIn={() => navigateTo('signin')}
            onSocialLogin={handleSocialLogin}
            isLoading={loadingStates.signup}
            logoSrc={currentTheme.brand.logo}
          />
        )

      case 'forgot':
        return renderWithLayout(
          <ForgottenPasswordForm
            onSubmit={handleForgotPassword}
            isLoading={loadingStates.forgot}
          />
        )

      case 'reset':
        return renderWithLayout(
          <ResetPasswordForm
            onSubmit={handleResetPassword}
            isLoading={loadingStates.reset}
          />
        )

      case 'verify':
        return renderWithLayout(
          <VerifyEmailForm
            onSubmit={() => navigateTo('signin')}
            onResendEmail={handleResendEmail}
            email={authFlow.email || 'demo@example.com'}
            isLoading={loadingStates.resend}
          />
        )

      case 'twofactor-setup':
        return renderWithLayout(
          <TwoFactorSetupForm
            onNext={() => navigateTo('twofactor-verify')}
            onCancel={() => navigateTo('dashboard')}
            qrCodeUri={authFlow.qrCodeUri}
            sharedKey={authFlow.sharedKey}
            isLoading={loadingStates.qr}
          />
        )

      case 'twofactor-verify':
      case 'twofactor-signin':
        return renderWithLayout(
          <TwoFactorSetupEnterVerificationForm
            onVerify={handleTwoFactorVerify}
            isLoading={loadingStates.verify2fa}
            error={notifications.error}
            backRoute={currentPage === 'twofactor-signin' ? '/signin' : '/twofactor-setup'}
          />
        )

      case 'twofactor-complete':
        return renderWithLayout(
          <TwoFactorSetupCompleteForm
            onDone={() => navigateTo('dashboard')}
            backupCodes={authFlow.recoveryCodes}
            isLoading={false}
          />
        )

      case 'dashboard':
        return (
          <NavLinksLayout
            middle={
              <div style={{ padding: '2rem' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '2rem'
                }}>
                  <h1 style={{ margin: 0, color: 'var(--topiray-color-text)' }}>
                    Welcome, {appState.user?.email}!
                  </h1>
                  <Button variant="secondary" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </div>
                
                <div style={{ 
                  backgroundColor: 'var(--topiray-color-surface)', 
                  padding: '2rem', 
                  borderRadius: 'var(--topiray-radius-lg)',
                  border: '1px solid var(--topiray-color-border)'
                }}>
                  <h2 style={{ marginTop: 0, color: 'var(--topiray-color-text)' }}>Dashboard</h2>
                  <p style={{ color: 'var(--topiray-color-text-secondary)' }}>
                    You have successfully authenticated! This is what your protected content would look like.
                  </p>
                  
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    <Button onClick={() => navigateTo('twofactor-setup')}>
                      Setup 2FA
                    </Button>
                    <Button variant="secondary" onClick={() => navigateTo('signin')}>
                      Back to Demo
                    </Button>
                  </div>
                </div>
              </div>
            }
            right={
              <div style={{ padding: '2rem' }}>
                <h3 style={{ marginTop: 0, color: 'var(--topiray-color-text)' }}>Quick Actions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Button fullWidth onClick={() => navigateTo('twofactor-setup')}>
                    Enable 2FA
                  </Button>
                  <Button variant="secondary" fullWidth onClick={() => navigateTo('forgot')}>
                    Change Password
                  </Button>
                  <Button variant="secondary" fullWidth onClick={() => navigateTo('verify')}>
                    Email Settings
                  </Button>
                </div>
              </div>
            }
          />
        )

      case 'common':
        return (
          <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ color: 'var(--topiray-color-text)' }}>Common Components</h2>
            
            <section style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: 'var(--topiray-color-text)' }}>Buttons</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button isLoading>Loading Button</Button>
              </div>
            </section>
            
            <section style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: 'var(--topiray-color-text)' }}>Alert Messages</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <AlertMessage type="success" message="Success message" />
                <AlertMessage type="error" message="Error message" />
                <AlertMessage type="warning" message="Warning message" />
                <AlertMessage type="info" message="Info message" />
              </div>
            </section>
            
            <section style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: 'var(--topiray-color-text)' }}>Social Login Buttons</h3>
              <SocialLoginButtons 
                onSocialLogin={handleSocialLogin}
                providers={['google', 'apple', 'facebook']}
                orientation="horizontal"
              />
            </section>
            
            <section>
              <h3 style={{ color: 'var(--topiray-color-text)' }}>Back Arrow</h3>
              <BackArrow fallbackRoute="/" onBack={() => navigateTo('signin')} />
            </section>
          </div>
        )

      case 'layout':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem', height: '100%' }}>
            <h2 style={{ color: 'var(--topiray-color-text)' }}>Layout Components</h2>
            
            <section>
              <h3 style={{ color: 'var(--topiray-color-text)' }}>Two Panel Layout</h3>
              <div style={{ border: '1px solid var(--topiray-color-border)', borderRadius: 'var(--topiray-radius-md)' }}>
                <TwoPanelLayout
                  leftContent={
                    <div style={{ padding: '2rem', background: 'var(--topiray-color-primary)', color: 'white', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ textAlign: 'center' }}>
                        <h2 style={{ margin: 0 }}>Brand Panel</h2>
                        <p style={{ margin: '0.5rem 0 0 0' }}>Left side branding content</p>
                      </div>
                    </div>
                  }
                  rightContent={
                    <div style={{ padding: '2rem', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ textAlign: 'center' }}>
                        <h2 style={{ margin: 0, color: 'var(--topiray-color-text)' }}>Content Panel</h2>
                        <p style={{ margin: '0.5rem 0 0 0', color: 'var(--topiray-color-text-secondary)' }}>Right side main content</p>
                      </div>
                    </div>
                  }
                />
              </div>
            </section>
            
            <section>
              <h3 style={{ color: 'var(--topiray-color-text)' }}>Nav Links Layout</h3>
              <NavLinksLayout
                middle={
                  <div style={{ padding: '2rem', backgroundColor: 'var(--topiray-color-surface)', borderRadius: 'var(--topiray-radius-md)', border: '1px solid var(--topiray-color-border)' }}>
                    <h3 style={{ margin: '0 0 1rem 0', color: 'var(--topiray-color-text)' }}>Main Content Area</h3>
                    <p style={{ margin: 0, color: 'var(--topiray-color-text-secondary)' }}>This is the flexible middle content area that adapts to different screen sizes.</p>
                  </div>
                }
                right={
                  <div style={{ padding: '1.5rem', backgroundColor: 'var(--topiray-color-surface)', borderRadius: 'var(--topiray-radius-md)', border: '1px solid var(--topiray-color-border)' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: 'var(--topiray-color-text)' }}>Sidebar</h4>
                    <Button variant="secondary" fullWidth>Action Button</Button>
                  </div>
                }
              />
            </section>
          </div>
        )

      default:
        return <div>Page not found</div>
    }
  }

  const categorizedPages = pages.reduce((acc, page) => {
    if (!acc[page.category]) acc[page.category] = []
    acc[page.category].push(page)
    return acc
  }, {} as Record<string, typeof pages>)

  return (
    <ThemeProvider theme={currentTheme}>
      <div style={{ 
        display: 'flex', 
        minHeight: '100vh',
        fontFamily: 'var(--topiray-font-family)',
        backgroundColor: 'var(--topiray-color-background)',
        color: 'var(--topiray-color-text)'
      }}>
        {/* Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: 'fixed',
            top: '1rem',
            left: sidebarOpen ? '280px' : '1rem',
            zIndex: 999,
            padding: '0.5rem 0.75rem',
            backgroundColor: 'var(--topiray-color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--topiray-radius-md)',
            cursor: 'pointer',
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.5rem',
            height: '2.5rem',
            transition: 'all var(--topiray-transition-normal)'
          }}
          title={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>

        {/* Sidebar */}
        <div style={{ 
          width: sidebarOpen ? '280px' : '0px',
          backgroundColor: 'var(--topiray-color-surface)', 
          padding: sidebarOpen ? '1.5rem' : '0',
          borderRight: sidebarOpen ? '1px solid var(--topiray-color-border)' : 'none',
          overflowY: 'auto',
          transition: 'all var(--topiray-transition-normal)',
          position: 'relative'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>Topiray Auth Demo</h2>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--topiray-color-text-secondary)' }}>
              Interactive component library showcase
            </p>
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--topiray-color-text-secondary)' }}>
              Theme
            </h3>
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => setCurrentTheme(theme.value)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.75rem',
                  margin: '0.25rem 0',
                  backgroundColor: currentTheme === theme.value ? 'var(--topiray-color-primary)' : 'transparent',
                  color: currentTheme === theme.value ? 'var(--topiray-button-primary-text)' : 'var(--topiray-color-text)',
                  border: '1px solid var(--topiray-color-border)',
                  borderRadius: 'var(--topiray-radius-md)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  transition: 'all var(--topiray-transition-normal)',
                  textAlign: 'left'
                }}
              >
                {theme.name}
              </button>
            ))}
          </div>

          {Object.entries(categorizedPages).map(([category, categoryPages]) => (
            <div key={category} style={{ marginBottom: '2rem' }}>
              <h3 style={{ 
                margin: '0 0 1rem 0', 
                fontSize: '0.875rem', 
                fontWeight: 600, 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em',
                color: 'var(--topiray-color-text-secondary)' 
              }}>
                {category === 'auth' ? 'Authentication' : 
                 category === '2fa' ? 'Two-Factor Auth' :
                 category === 'app' ? 'Application' : 
                 category === 'demo' ? 'Demo Pages' : category}
              </h3>
              {categoryPages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => navigateTo(page.id)}
                  disabled={page.id === 'dashboard' && !appState.user}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '0.75rem',
                    margin: '0.25rem 0',
                    backgroundColor: appState.currentPage === page.id ? 'var(--topiray-color-primary)' : 'transparent',
                    color: appState.currentPage === page.id ? 'var(--topiray-button-primary-text)' : 'var(--topiray-color-text)',
                    border: '1px solid var(--topiray-color-border)',
                    borderRadius: 'var(--topiray-radius-md)',
                    cursor: page.id === 'dashboard' && !appState.user ? 'not-allowed' : 'pointer',
                    fontSize: '0.875rem',
                    transition: 'all var(--topiray-transition-normal)',
                    textAlign: 'left',
                    opacity: page.id === 'dashboard' && !appState.user ? 0.5 : 1
                  }}
                >
                  {page.name}
                  {page.id === 'dashboard' && !appState.user && (
                    <span style={{ fontSize: '0.75rem', marginLeft: '0.5rem', opacity: 0.7 }}>
                      (Sign in required)
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}

          {/* Demo credentials */}
          <div style={{ 
            marginTop: '2rem', 
            padding: '1rem', 
            backgroundColor: 'var(--topiray-color-background)', 
            border: '1px solid var(--topiray-color-border)',
            borderRadius: 'var(--topiray-radius-md)',
            fontSize: '0.75rem'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: 'var(--topiray-color-text)' }}>
              Demo Credentials
            </h4>
            <div style={{ color: 'var(--topiray-color-text-secondary)', lineHeight: 1.4 }}>
              <div><strong>Standard:</strong> demo@example.com / password</div>
              <div><strong>2FA:</strong> 2fa@example.com / password</div>
              <div><strong>Unverified:</strong> unverified@example.com / password</div>
              <div><strong>2FA Code:</strong> 123456</div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, overflow: 'auto', marginTop: '0' }}>
          {renderPage()}
        </div>
      </div>
    </ThemeProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<Demo />) 