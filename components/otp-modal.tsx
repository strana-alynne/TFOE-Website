"use client";

import {
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
  ClipboardEvent,
  ChangeEvent,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify?: (otpValue: string) => void;
}

const OtpModal: React.FC<OtpModalProps> = ({ isOpen, onClose, onVerify }) => {
  // Fix 1: Initialize with 6 empty strings instead of 5
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  if (inputRefs.current.length !== 5) {
    inputRefs.current = Array(5).fill(null);
  }

  const handleChange = (index: number, value: string): void => {
    if (value && !/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    // Fix 2: Add missing auto-focus functionality
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle paste functionality
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 5).split("");

    if (pastedData.some((char) => !/^\d$/.test(char))) return;

    const newOtp = [...otp];
    pastedData.forEach((value, i) => {
      if (i < 5) newOtp[i] = value;
    });

    setOtp(newOtp);

    // Fix 3: Focus on the last input after a successful paste
    const focusIndex = Math.min(pastedData.length, 4);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = (): void => {
    setIsVerifying(true);
    console.log("otp", otp);
    const otpValue = otp.join("");

    setTimeout(() => {
      setIsVerifying(false);
      if (onVerify) {
        onVerify(otpValue);
      }

      console.log("OTP submitted:", otpValue);
    }, 1500);
  };

  // Handle resend OTP
  const handleResend = (): void => {
    // Reset OTP fields
    setOtp(["", "", "", "", ""]);
    // Reset timer
    setTimer(60);
    console.log("Resending OTP...");
  };

  // Timer countdown
  useEffect(() => {
    if (!isOpen) return;

    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, [isOpen]);

  // Focus first input when modal opens
  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Check if all OTP fields are filled
  const isComplete = otp.every((digit) => digit !== "");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Verification Code
          </DialogTitle>
          <DialogDescription className="text-center">
            We have sent a verification code to your registered email.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="flex items-center justify-center space-x-2">
            {otp.map((digit, index) => (
              <div key={index} className="w-12">
                <Input
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  value={digit}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(index, e.target.value)
                  }
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                    handleKeyDown(index, e)
                  }
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="text-center text-lg font-bold h-12"
                  maxLength={1}
                  autoComplete="off"
                  inputMode="numeric"
                />
              </div>
            ))}
          </div>

          <div className="text-sm text-center w-full">
            {timer > 0 ? (
              <p>Resend code in {timer} seconds</p>
            ) : (
              <div className="flex justify-center">
                <p className="mr-1">Didn't receive code?</p>
                <button
                  onClick={handleResend}
                  className="text-blue-600 hover:underline"
                >
                  Resend
                </button>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex sm:justify-center">
          <Button
            onClick={handleVerify}
            disabled={!isComplete || isVerifying}
            className="w-full sm:w-32"
          >
            {isVerifying ? "Verifying..." : "Verify"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OtpModal;
