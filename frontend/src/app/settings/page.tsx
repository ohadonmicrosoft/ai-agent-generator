'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SettingField {
  label: string;
  type: 'text' | 'email' | 'select' | 'toggle';
  value?: string;
  options?: string[];
  checked?: boolean;
}

const settingFields: SettingField[] = [
  {
    label: 'Display Name',
    type: 'text',
    value: 'John Doe',
  },
  {
    label: 'Email',
    type: 'email',
    value: 'john@example.com',
  },
  {
    label: 'Theme',
    type: 'select',
    options: ['Light', 'Dark', 'System'],
    value: 'System',
  },
  {
    label: 'Email Notifications',
    type: 'toggle',
    checked: true,
  },
  {
    label: 'Two-Factor Authentication',
    type: 'toggle',
    checked: false,
  },
];

export default function Settings() {
  const [settings, setSettings] = useState(settingFields);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implement settings update logic
      console.log('Settings:', settings);
    } catch (error) {
      console.error('Error updating settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (index: number, value: string | boolean) => {
    const newSettings = [...settings];
    if (newSettings[index].type === 'toggle') {
      newSettings[index] = { ...newSettings[index], checked: value as boolean };
    } else {
      newSettings[index] = { ...newSettings[index], value: value as string };
    }
    setSettings(newSettings);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {settings.map((field, index) => (
              <div key={field.label} className="flex items-center justify-between">
                <label className="text-sm font-medium">{field.label}</label>
                {field.type === 'toggle' ? (
                  <button
                    type="button"
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      field.checked ? 'bg-primary' : 'bg-muted'
                    }`}
                    onClick={() => handleChange(index, !field.checked)}
                  >
                    <span
                      className={`block h-5 w-5 rounded-full bg-white transition-transform ${
                        field.checked ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                ) : field.type === 'select' ? (
                  <select
                    className="rounded-md border bg-background px-3 py-2"
                    value={field.value}
                    onChange={(e) => handleChange(index, e.target.value)}
                  >
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    type={field.type}
                    value={field.value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="max-w-xs"
                  />
                )}
              </div>
            ))}
            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 