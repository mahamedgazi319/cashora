/**
 * validators/auth.ts
 * Form validation schemas — ready for Zod integration.
 */

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

// ─── Login ────────────────────────────────────────────────────────────────────
export function validateLoginForm(data: {
  email: string;
  password: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.email) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Invalid email address";

  if (!data.password) errors.password = "Password is required";
  else if (data.password.length < 8)
    errors.password = "Password must be at least 8 characters";

  return { valid: Object.keys(errors).length === 0, errors };
}

// ─── Register ─────────────────────────────────────────────────────────────────
export function validateRegisterForm(data: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.username) errors.username = "Username is required";
  else if (data.username.length < 3)
    errors.username = "Username must be at least 3 characters";
  else if (!/^[a-zA-Z0-9_]+$/.test(data.username))
    errors.username = "Only letters, numbers and underscores allowed";

  if (!data.email) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Invalid email address";

  if (!data.password) errors.password = "Password is required";
  else if (data.password.length < 8)
    errors.password = "Must be at least 8 characters";
  else if (!/(?=.*[A-Z])(?=.*\d)/.test(data.password))
    errors.password = "Must include one uppercase letter and one number";

  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords do not match";

  return { valid: Object.keys(errors).length === 0, errors };
}
