import type { FunctionComponent } from "react";
import { useEffect, useRef } from "react";
import { CircularProgress } from "@mui/material";
import { Button } from "../common/Button";
import { BackArrow } from "../common/BackArrow";
import styles from "./TwoFactorSetupForm.module.css";

interface TwoFactorSetupFormProps {
  onNext?: () => void;
  onCancel?: () => void;
  qrCodeUri?: string | null;
  sharedKey?: string | null;
  isLoading?: boolean;
  backArrowFallbackRoute?: string;
}

export const TwoFactorSetupForm: FunctionComponent<TwoFactorSetupFormProps> = ({
  onNext,
  onCancel,
  qrCodeUri,
  sharedKey,
  isLoading = false,
  backArrowFallbackRoute = "/accountstatus"
}) => {
  const qrCodeRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (qrCodeUri && qrCodeRef.current) {
      // Generate QR code using the qrcode library
      import('qrcode').then(QRCode => {
        if (qrCodeRef.current) {
          QRCode.toCanvas(qrCodeRef.current, qrCodeUri, {
            width: 193,
            margin: 1
          });
        }
      }).catch(() => {
        // Fallback - could display error message
        console.error('Failed to generate QR code');
      });
    }
  }, [qrCodeUri]);

  const handleNext = () => {
    if (!isLoading) {
      onNext?.();
    }
  };

  const handleCancel = () => {
    if (!isLoading) {
      onCancel?.();
    }
  };

  return (
    <div className={styles.loginform}>
      <div className={styles.backarrow}>
        <BackArrow 
          disabled={isLoading}
          className={styles.backArrowIcon}
          iconClassName={styles.vectorIcon}
          fallbackRoute={backArrowFallbackRoute}
        />
        <div className={styles.backArrowIcon1} />
      </div>
      <div className={styles.text}>
        <b className={styles.h3MediumTitle}>Multi-Factor Authentication</b>
      </div>
      <div className={styles.text1}>
        <div className={styles.h6FinePrintContainer}>
          <span>{`Use your authentication app to scan this QR code. If you don't have an authentication app on your device, you'll need to install one now. `}</span>
          <a href="https://support.google.com/accounts/answer/1066447?hl=en" target="_blank" rel="noopener noreferrer">Learn more</a>
        </div>
      </div>
      <div className={styles.qrcontainer}>
        {isLoading ? (
          <div style={{ 
            width: '193.3px', 
            height: '192px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            border: '1px solid var(--color-gray-600)',
            borderRadius: '15.36px'
          }}>
            <CircularProgress size={40} sx={{ color: 'var(--color-white)' }} />
          </div>
        ) : qrCodeUri ? (
          <canvas
            ref={qrCodeRef}
            style={{ 
              padding: '16px', 
              backgroundColor: 'white', 
              borderRadius: '15.36px',
              minHeight: '192px',
              display: 'block'
            }}
          />
        ) : (
          <div style={{ 
            width: '193.3px', 
            height: '192px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            border: '1px solid var(--color-gray-600)',
            borderRadius: '15.36px',
            backgroundColor: 'var(--color-gray-100)',
            color: 'var(--color-white)'
          }}>
            <span>QR Code will appear here</span>
          </div>
        )}
        <div className={styles.text2}>
          <div className={styles.h6FinePrint}>Can't scan the QR code?</div>
        </div>
        {sharedKey && (
          <div style={{ 
            marginTop: '8px', 
            padding: '8px 12px', 
            backgroundColor: 'var(--color-gray-100)', 
            borderRadius: '8px',
            fontSize: '14px',
            fontFamily: 'monospace',
            color: 'var(--color-white)',
            wordBreak: 'break-all'
          }}>
            Manual entry key: {sharedKey}
          </div>
        )}
      </div>
      <div className={styles.buttons}>
        <Button 
          variant="secondary"
          onClick={handleCancel}
          disabled={isLoading}
          type="button"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleNext}
          disabled={isLoading}
          type="button"
          isLoading={isLoading}
          loadingText="Loading..."
        >
          Next
        </Button>
      </div>
    </div>
  );
};