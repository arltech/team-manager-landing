import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Leading icon node */
  icon?: React.ReactNode;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Style override for the wrapping field box */
  wrapperStyle?: React.CSSProperties;
}

/**
 * Text input with optional leading icon. Surface fill, rounded, primary focus
 * ring. Used for CRM candidate search and the quiz lead-capture form.
 */
export function Input(props: InputProps): React.ReactElement;
