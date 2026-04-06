import React, { useState } from "react";
import { Building2, User } from "lucide-react";
import { Button } from "../common/Button";
import { SocialLoginButtons } from "../common/SocialLoginButtons";
import { SignUpFormProps } from "./types";
import { useTheme } from "../../theme/ThemeProvider";
import { useTranslation } from "../../i18n/I18nProvider";
import styles from "./SignUpForm.module.css";

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit,
  onSignIn,
  onSocialLogin,
  logoSrc,
  authProviders = ["apple", "google", "facebook"],
  accountTypes = [{ label: "Business", icon: Building2 }, { label: "Individual", icon: User }],
  isLoading = false,
  className,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<
    (typeof accountTypes)[number] | null
  >(accountTypes.length > 0 ? accountTypes[0] : null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(email, password, accountType?.label || null);
  };

  const containerClasses = [styles.container, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      {theme.customization.showFormHeader && (
        <div className={styles.formHeader}>
          <div className={styles.titleContainer}>
            <b className={styles.title}>{t('topiray.auth.signUp.title')}</b>
          </div>
          {(logoSrc || theme.brand.secondaryLogo) &&
            theme.customization.showLogo && (
              <img
                className={styles.logoIcon}
                alt={theme.brand.logoAlt || "Logo"}
                src={logoSrc || theme.brand.secondaryLogo}
              />
            )}
        </div>
      )}

      {accountTypes.length > 1 && (
        <div className={styles.accountTypeContainer}>
          {accountTypes.map((type, i) => (
            <button
              key={`account-type-${i}`}
              type="button"
              className={`${styles.accountTypeButton} ${
                accountType?.label === type.label ? styles.selected : ""
              }`}
              onClick={() => setAccountType(type)}
              disabled={isLoading}
            >
              <type.icon className={styles.accountTypeIcon} />
              <b className={styles.accountTypeText}>{type.label}</b>
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.inputField}
          placeholder={t('topiray.auth.signUp.emailPlaceholder')}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />

        <input
          className={styles.inputField}
          placeholder={t('topiray.auth.signUp.passwordPlaceholder')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />

        <Button
          type="submit"
          isLoading={isLoading}
          loadingText={t('topiray.auth.signUp.submittingButton')}
          fullWidth
        >
          {t('topiray.auth.signUp.submitButton')}
        </Button>
      </form>

      {theme.customization.showSocialLogin && (
        <>
          <div className={styles.divider}>
            <div className={styles.dividerLine} />
            <div className={styles.dividerText}>
              <div className={styles.caption}>{t('topiray.auth.signUp.dividerText')}</div>
            </div>
            <div className={styles.dividerLine} />
          </div>

          <SocialLoginButtons
            providers={authProviders}
            onSocialLogin={onSocialLogin}
            isLoading={isLoading}
          />
        </>
      )}

      <div className={styles.footerContainer}>
        <div className={styles.footerRow}>
          <span className={styles.caption}>{t('topiray.auth.signUp.hasAccount')} </span>
          <button
            type="button"
            className={styles.linkButton}
            onClick={onSignIn}
            disabled={isLoading}
          >
            {t('topiray.auth.signUp.signInLink')}
          </button>
        </div>
      </div>
    </div>
  );
};
