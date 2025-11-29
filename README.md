# Topiray Auth React Component Library
![NPM Version](https://img.shields.io/npm/v/topiray-auth-react)
![NPM Downloads](https://img.shields.io/npm/dm/topiray-auth-react)
![NPM License](https://img.shields.io/npm/l/topiray-auth-react)

A comprehensive, themeable React component library for authentication flows. Built with TypeScript, CSS Modules, and designed for maximum customization and accessibility.

## Features

- 🎨 **Fully Themeable** - Customize colors, fonts, spacing, and more
- 🔧 **CSS Modules** - Strongly-typed, scoped styling
- 📱 **Responsive Design** - Mobile-first approach with breakpoint support
- ♿ **Accessible** - ARIA labels, keyboard navigation, focus management
- 🔐 **Complete Auth Flow** - Sign in/up, 2FA, email verification, password reset
- ⚡ **TypeScript** - Full type safety and IntelliSense support
- 🎯 **Tree Shakeable** - Import only what you need

## Installation

```bash
npm install topiray-auth-react
# or
yarn add topiray-auth-react
```

### Peer Dependencies

```bash
npm install react react-dom lucide-react @mui/material
```

### CSS Import

**Important**: You must import the CSS file for proper styling:

```tsx
// Import the CSS file in your main App component or index file
import 'topiray-auth-react/dist/topiray-auth-react.css'
```

Or if you're using a bundler that supports CSS imports:

```css
/* In your main CSS file */
@import 'topiray-auth-react/dist/topiray-auth-react.css';
```

## Quick Start

```tsx
import React from 'react'
import { 
  ThemeProvider, 
  defaultTheme, 
  TwoPanelLayout, 
  AuthCard, 
  SignInForm 
} from 'topiray-auth-react'

// Import the CSS file
import 'topiray-auth-react/dist/topiray-auth-react.css'

function App() {
  const handleSignIn = (email: string, password: string) => {
    console.log('Sign in:', { email, password })
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <TwoPanelLayout
        rightContent={
          <AuthCard>
            <SignInForm
              onSubmit={handleSignIn}
              onForgotPassword={() => console.log('Forgot password')}
              onSignUp={() => console.log('Sign up')}
              onSocialLogin={(provider) => console.log('Social:', provider)}
              authProviders={['google', 'apple', 'facebook']}
            />
          </AuthCard>
        }
      />
    </ThemeProvider>
  )
}
```

## Components

### Auth Components

#### AuthCard
Container wrapper for auth forms with consistent styling.

```tsx
import { AuthCard } from 'topiray-auth-react'

<AuthCard>
  {/* Your auth form content */}
</AuthCard>
```

#### SignInForm
Complete sign-in form with email/password and customizable social login options.

```tsx
import { SignInForm } from 'topiray-auth-react'

<SignInForm
  onSubmit={(email, password) => handleSignIn(email, password)}
  onForgotPassword={() => navigate('/forgot-password')}
  onSignUp={() => navigate('/sign-up')}
  onSocialLogin={(provider) => handleSocialLogin(provider)}
  authProviders={['google', 'apple', 'facebook']}
  isLoading={isSigningIn}
  logoSrc="/your-logo.png"
/>
```

#### SignUpForm
Account creation form with business/individual selection and customizable social login.

```tsx
import { SignUpForm } from 'topiray-auth-react'

<SignUpForm
  onSubmit={(email, password, accountType) => handleSignUp(email, password, accountType)}
  onSignIn={() => navigate('/sign-in')}
  onSocialLogin={(provider) => handleSocialLogin(provider)}
  authProviders={['google', 'apple', 'facebook']}
  isLoading={isSigningUp}
  logoSrc="/your-logo.png"
/>
```

#### ForgottenPasswordForm
Password reset request form.

```tsx
import { ForgottenPasswordForm } from 'topiray-auth-react'

<ForgottenPasswordForm
  onSubmit={(email) => handlePasswordReset(email)}
  isLoading={isLoading}
/>
```

#### VerifyEmailForm
Email verification flow with resend functionality.

```tsx
import { VerifyEmailForm } from 'topiray-auth-react'

<VerifyEmailForm
  onSubmit={() => navigate('/sign-in')}
  onResendEmail={() => handleResendEmail()}
  email="user@example.com"
  isLoading={isLoading}
/>
```

### Two-Factor Authentication

#### TwoFactorSetupForm
QR code setup for authenticator apps.

```tsx
import { TwoFactorSetupForm } from 'topiray-auth-react'

<TwoFactorSetupForm
  onNext={() => navigate('/2fa/verify')}
  onCancel={() => navigate('/dashboard')}
  qrCodeUri="otpauth://totp/App:user@example.com?secret=SECRET&issuer=App"
  sharedKey="JBSWY3DPEHPK3PXP"
  isLoading={isLoading}
/>
```

#### TwoFactorSetupEnterVerificationForm
6-digit code entry with auto-focus and paste support.

```tsx
import { TwoFactorSetupEnterVerificationForm } from 'topiray-auth-react'

<TwoFactorSetupEnterVerificationForm
  onVerify={(code) => handleVerification(code)}
  isLoading={isVerifying}
  error={error}
  backRoute="/2fa/setup"
/>
```

#### TwoFactorSetupCompleteForm
Backup codes display with copy/download functionality.

```tsx
import { TwoFactorSetupCompleteForm } from 'topiray-auth-react'

<TwoFactorSetupCompleteForm
  onDone={() => navigate('/dashboard')}
  backupCodes={recoveryCodes}
  isLoading={isLoading}
/>
```

### Layout Components

#### TwoPanelLayout
Responsive layout with left branding panel and right content area.

```tsx
import { TwoPanelLayout } from 'topiray-auth-react'

<TwoPanelLayout
  leftContent={<YourBrandingContent />}
  rightContent={<YourAuthForm />}
  leftBackgroundImage="/background.jpg"
  logoSrc="/logo.png"
/>
```

#### NavLinksLayout
Flexible content layout for pages with navigation.

```tsx
import { NavLinksLayout } from 'topiray-auth-react'

<NavLinksLayout
  middle={<MainContent />}
  right={<SidebarContent />}
/>
```

### Common Components

#### Button
Versatile button with loading states and variants.

```tsx
import { Button } from 'topiray-auth-react'

<Button variant="primary" isLoading={isLoading} fullWidth>
  Sign In
</Button>

<Button variant="secondary" icon="google">
  Sign in with Google
</Button>
```

#### AlertMessage
Dismissible alert messages for different states.

```tsx
import { AlertMessage } from 'topiray-auth-react'

<AlertMessage 
  type="error" 
  message="Invalid credentials" 
  dismissible
  onDismiss={() => setError(null)}
/>
```

#### SocialLoginButtons
Pre-configured social login buttons.

```tsx
import { SocialLoginButtons } from 'topiray-auth-react'

<SocialLoginButtons
  onSocialLogin={(provider) => handleSocialLogin(provider)}
  providers={['google', 'apple', 'facebook']}
  orientation="vertical"
  isLoading={isLoading}
/>
```

### Customizing Social Login Providers

You can customize which social login providers are displayed using the `authProviders` prop on both `SignInForm` and `SignUpForm`:

```tsx
// Show only Google and Apple
<SignInForm
  authProviders={['google', 'apple']}
  onSocialLogin={(provider) => handleSocialLogin(provider)}
  // ... other props
/>

// Show all available providers (default)
<SignUpForm
  authProviders={['apple', 'google', 'facebook']}
  onSocialLogin={(provider) => handleSocialLogin(provider)}
  // ... other props
/>

// Show only Google
<SignInForm
  authProviders={['google']}
  onSocialLogin={(provider) => handleSocialLogin(provider)}
  // ... other props
/>

// Hide social login entirely by setting empty array or omitting the prop
<SignInForm
  authProviders={[]}
  // ... other props (onSocialLogin not needed if no providers)
/>
```

**Available providers:**
- `'apple'` - Apple Sign In
- `'google'` - Google Sign In  
- `'facebook'` - Facebook Login

**Default behavior:** If `authProviders` is not specified, it defaults to `['apple', 'google', 'facebook']`.

## Real-World Usage Examples

### Complete Sign-In Page

```tsx
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  ThemeProvider,
  defaultTheme,
  TwoPanelLayout,
  AuthCard,
  SignInForm,
  AlertMessage
} from 'topiray-auth-react'

// Import the CSS file
import 'topiray-auth-react/dist/topiray-auth-react.css'

function SignInPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Get success message from registration
  const successMessage = location.state?.message

  const handleSignIn = async (email: string, password: string) => {
    try {
      setError(null)
      setIsLoading(true)
      
      const result = await signInAPI(email, password)
      
      if (result.succeeded) {
        navigate('/dashboard')
      } else if (result.requiresTwoFactor) {
        navigate('/2fa/signin', { state: { userId: result.userId } })
      } else if (result.isNotAllowed) {
        navigate(`/verify-email?email=${encodeURIComponent(email)}`)
      } else {
        setError('Invalid email or password.')
      }
    } catch (error) {
      setError('An error occurred during sign in.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'apple' | 'facebook') => {
    try {
      setError(null)
      setIsLoading(true)
      
      // Initiate social login flow
      await socialSignInAPI(provider)
    } catch (error) {
      setError(`Failed to sign in with ${provider}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <TwoPanelLayout
        rightContent={
          <AuthCard>
            {successMessage && (
              <AlertMessage message={successMessage} type="success" />
            )}
            {error && (
              <AlertMessage message={error} type="error" />
            )}
            <SignInForm
              onSubmit={handleSignIn}
              onForgotPassword={() => navigate('/forgot-password')}
              onSignUp={() => navigate('/sign-up')}
              onSocialLogin={handleSocialLogin}
              authProviders={['google', 'apple']} // Only show Google and Apple
              isLoading={isLoading}
            />
          </AuthCard>
        }
      />
    </ThemeProvider>
  )
}
```

### Two-Factor Setup with QR Code

```tsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import QRCode from 'qrcode'
import {
  TwoPanelLayout,
  AuthCard,
  TwoFactorSetupForm,
  AlertMessage
} from 'topiray-auth-react'

function TwoFactorSetupPage() {
  const navigate = useNavigate()
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null)
  const [sharedKey, setSharedKey] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    generateQRCode()
  }, [])

  const generateQRCode = async () => {
    try {
      setIsLoading(true)
      const result = await createAuthenticatorKeyAPI()
      
      if (result.authenticatorUri && result.sharedKey) {
        const qrDataUrl = await QRCode.toDataURL(result.authenticatorUri, {
          width: 200,
          margin: 2
        })
        
        setQrCodeDataUrl(qrDataUrl)
        setSharedKey(result.sharedKey)
        
        // Render QR code
        setTimeout(() => {
          const container = document.getElementById('qr-code-container')
          if (container && qrDataUrl) {
            container.innerHTML = `<img src="${qrDataUrl}" alt="QR Code" />`
          }
        }, 100)
      } else {
        setError('Failed to generate QR code.')
      }
    } catch (error) {
      setError('Failed to generate QR code.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <TwoPanelLayout
      rightContent={
        <AuthCard>
          {error && <AlertMessage message={error} type="error" />}
          <TwoFactorSetupForm
            onNext={() => navigate('/2fa/verify')}
            onCancel={() => navigate('/dashboard')}
            qrCodeUri={qrCodeDataUrl}
            sharedKey={sharedKey}
            isLoading={isLoading}
          />
        </AuthCard>
      }
    />
  )
}
```

## Theming

### Using Built-in Themes

```tsx
import { ThemeProvider, defaultTheme, darkTheme } from 'topiray-auth-react'

// Light theme
<ThemeProvider theme={defaultTheme}>
  <App />
</ThemeProvider>

// Dark theme
<ThemeProvider theme={darkTheme}>
  <App />
</ThemeProvider>
```

### Creating Custom Themes

```tsx
import { createCustomTheme } from 'topiray-auth-react'

const corporateTheme = createCustomTheme({
  colors: {
    primary: '#0066cc',
    secondary: '#6b7280',
    tertiary: "#f3f4f6",
    background: '#ffffff',
    surface: '#f9fafb',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#d1d5db',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    hover: '#f3f4f6',
    active: '#e5e7eb',
    disabled: '#9ca3af',
    inputBackground: '#ffffff',
    inputBorder: '#d1d5db',
    inputText: '#111827',
    inputPlaceholder: '#9ca3af',
    buttonPrimary: '#0066cc',
    buttonPrimaryText: '#ffffff',
    buttonSecondary: '#6b7280',
    buttonSecondaryText: '#ffffff',
    buttonSocial: '#374151',
    buttonSocialText: '#ffffff'
  },
  brand: {
    logo: '/corporate-logo.png',
    logoAlt: 'Corporate Logo'
  },
  customization: {
    showFormHeader: true,
    showSocialLogin: true,
    showBackArrow: true,
    showLogo: true,
    roundedCorners: true,
    animations: true
  }
})

<ThemeProvider theme={corporateTheme}>
  <App />
</ThemeProvider>
```

### Advanced Theme Customization

```tsx
const advancedTheme = createCustomTheme({
  colors: {
    // Custom color palette
    primary: '#7c3aed',
    secondary: '#64748b',
    // ... other colors
  },
  components: {
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem'
    },
    typography: {
      fontFamily: '"Inter", system-ui, sans-serif',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        xxl: '1.5rem'
      }
    }
  },
  customization: {
    backgroundImage: '/custom-background.jpg',
    leftPanelContent: <CustomBrandingComponent />
  }
})
```

## CSS Custom Properties

The library uses CSS custom properties for theming. Make sure to import the CSS file first, then you can override these properties:

```tsx
// First, import the CSS file
import 'topiray-auth-react/dist/topiray-auth-react.css'
```

```css
/* Then override custom properties in your CSS */
:root {
  --topiray-color-primary: #your-brand-color;
  --topiray-color-surface: #your-surface-color;
  --topiray-font-family: 'Your Font', sans-serif;
  --topiray-radius-md: 12px;
  --topiray-spacing-lg: 24px;
}
```

## Integration Patterns

### With React Router

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import the CSS file once at the app level
import 'topiray-auth-react/dist/topiray-auth-react.css'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/2fa/setup" element={<TwoFactorSetupPage />} />
          <Route path="/2fa/verify" element={<TwoFactorVerifyPage />} />
          <Route path="/2fa/complete" element={<TwoFactorCompletePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
```

### With State Management

```tsx
// Using React Context
const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email, password) => {
    setIsLoading(true)
    try {
      const result = await signInAPI(email, password)
      setUser(result.user)
      return result
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login }}>
      {children}
    </AuthContext.Provider>
  )
}
```

### With Form Validation

```tsx
import { z } from 'zod'

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

function SignInPage() {
  const [errors, setErrors] = useState({})

  const handleSignIn = (email, password) => {
    try {
      signInSchema.parse({ email, password })
      setErrors({})
      // Proceed with sign in
    } catch (error) {
      setErrors(error.flatten().fieldErrors)
    }
  }

  return (
    <SignInForm
      onSubmit={handleSignIn}
      authProviders={['google', 'apple']}
      // Pass validation errors to form
    />
  )
}
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import type { 
  ThemeConfig, 
  SignInFormProps, 
  AuthCardProps 
} from 'topiray-auth-react'

// Custom theme with full type safety
const myTheme: ThemeConfig = {
  colors: {
    primary: '#0066cc',
    // ... TypeScript will validate all required properties
  },
  // ... rest of theme configuration
}

// Component props are fully typed
const handleSignIn: SignInFormProps['onSubmit'] = (email, password) => {
  // email and password are properly typed as strings
}

// Social login providers are strictly typed
const handleSocialLogin = (provider: 'google' | 'apple' | 'facebook') => {
  // provider parameter is type-safe
}
```

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Focus Management**: Logical focus flow and focus trapping in modals
- **High Contrast**: Colors meet WCAG contrast requirements
- **Reduced Motion**: Respects user's motion preferences

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request


## Support

For questions and support:
- Create an issue on GitHub
- Check the documentation
- Review the demo application

---

Built with ❤️ for the React community
