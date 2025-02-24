'use client';

import React, { useState } from 'react';
import { ValidationRules, validateForm } from '@/lib/form-validation';
import { ErrorMessage } from './error-message';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  options?: { label: string; value: string }[];
}

export function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  required,
  className,
  error,
  value,
  onChange,
  options,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor={name} className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          className={cn(
            'min-h-[100px] w-full rounded-md border bg-background px-3 py-2',
            error && 'border-destructive'
          )}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      ) : type === 'select' && options ? (
        <select
          id={name}
          name={name}
          className={cn(
            'w-full rounded-md border bg-background px-3 py-2',
            error && 'border-destructive'
          )}
          value={value}
          onChange={(e) => onChange(e as any)}
          required={required}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          className={cn(
            'w-full rounded-md border bg-background px-3 py-2',
            error && 'border-destructive'
          )}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

interface FormProps<T extends object> {
  onSubmit: (values: T) => void;
  initialValues: T;
  validationRules?: ValidationRules;
  children: (props: {
    values: T;
    errors: Record<string, string>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    isSubmitting: boolean;
  }) => React.ReactNode;
}

export function Form<T extends object>({
  onSubmit,
  initialValues,
  validationRules,
  children,
}: FormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validationRules) {
      const validationErrors = validateForm(values, validationRules);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setIsSubmitting(false);
        return;
      }
    }

    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({
        submit: error instanceof Error ? error.message : 'An error occurred',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {children({
        values,
        errors,
        handleChange,
        isSubmitting,
      })}
    </form>
  );
} 