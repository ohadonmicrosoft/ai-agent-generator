'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FormField {
  label: string;
  type: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: string | number;
}

const formFields: FormField[] = [
  {
    label: 'Agent Name',
    type: 'text',
    placeholder: 'Enter agent name',
    required: true,
  },
  {
    label: 'Description',
    type: 'textarea',
    placeholder: 'Describe your agent',
    required: true,
  },
  {
    label: 'Model',
    type: 'select',
    options: ['gpt-4', 'gpt-3.5-turbo'],
    required: true,
  },
  {
    label: 'Temperature',
    type: 'number',
    min: 0,
    max: 2,
    step: 0.1,
    defaultValue: 0.7,
    required: true,
  },
];

export default function CreateAgent() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implement agent creation logic
      console.log('Form data:', formData);
      router.push('/agents');
    } catch (error) {
      console.error('Error creating agent:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Agent</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {formFields.map((field) => (
              <div key={field.label} className="space-y-2">
                <label className="text-sm font-medium">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    className="w-full rounded-md border bg-background px-3 py-2"
                    placeholder={field.placeholder}
                    rows={4}
                    onChange={(e) => handleInputChange(field.label, e.target.value)}
                    required={field.required}
                  />
                ) : field.type === 'select' ? (
                  <select
                    className="w-full rounded-md border bg-background px-3 py-2"
                    onChange={(e) => handleInputChange(field.label, e.target.value)}
                    required={field.required}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    defaultValue={field.defaultValue}
                    onChange={(e) => handleInputChange(field.label, e.target.value)}
                    required={field.required}
                  />
                )}
              </div>
            ))}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.back()}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Agent'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 