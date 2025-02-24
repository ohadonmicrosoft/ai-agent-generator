'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { FileUpload } from '@/components/ui/file-upload';
import { useAuth } from '@/contexts/AuthContext';
import { ErrorMessage } from '@/components/ui/error-message';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { commonRules } from '@/lib/form-validation';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import toast from 'react-hot-toast';

interface ProfileFormData {
  displayName: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
}

export default function Settings() {
  const { user, updateUserProfile, updateUserEmail, updateUserPassword, verifyEmail, isEmailVerified } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
  });

  const handleProfileUpdate = async (values: ProfileFormData) => {
    const promises: Promise<void>[] = [];
    const notifications: string[] = [];

    if (values.displayName !== user?.displayName) {
      promises.push(updateUserProfile({ displayName: values.displayName }));
      notifications.push('Display name updated');
    }

    if (values.email !== user?.email) {
      promises.push(updateUserEmail(values.email, values.currentPassword));
      notifications.push('Email updated - Please verify your new email');
    }

    if (values.newPassword && values.currentPassword) {
      if (values.newPassword !== values.confirmPassword) {
        throw new Error('New passwords do not match');
      }
      promises.push(updateUserPassword(values.currentPassword, values.newPassword));
      notifications.push('Password updated');
    }

    try {
      await Promise.all(promises);
      notifications.forEach((msg) => toast.success(msg));
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const handlePhotoUpload = async (file: File) => {
    if (!user) return;

    try {
      setIsUploading(true);
      const storageRef = ref(storage, `profile-photos/${user.uid}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);
      await updateUserProfile({ photoURL });
      toast.success('Profile photo updated');
    } catch (error) {
      console.error('Photo upload error:', error);
      toast.error('Failed to update profile photo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleNotificationChange = (setting: keyof NotificationSettings) => {
    setNotifications((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
    // TODO: Save notification preferences to backend
    toast.success('Notification preferences updated');
  };

  if (!user) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Settings</h1>

      {/* Profile Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Photo */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Profile Photo</h3>
            <div className="flex items-center gap-6">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Profile'}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <span className="text-2xl font-medium text-muted-foreground">
                    {user.displayName?.[0] || user.email?.[0] || '?'}
                  </span>
                </div>
              )}
              <FileUpload
                accept="image/*"
                maxSize={2 * 1024 * 1024} // 2MB
                onFileSelect={handlePhotoUpload}
                preview={false}
              />
              {isUploading && <LoadingSpinner size="sm" />}
            </div>
          </div>

          {/* Profile Form */}
          <Form<ProfileFormData>
            onSubmit={handleProfileUpdate}
            initialValues={{
              displayName: user.displayName || '',
              email: user.email || '',
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validationRules={{
              displayName: commonRules.name,
              email: commonRules.email,
              newPassword: {
                ...commonRules.password,
                required: false,
              },
            }}
          >
            {({ values, errors, handleChange, isSubmitting }) => (
              <div className="space-y-4">
                <FormField
                  label="Display Name"
                  name="displayName"
                  value={values.displayName}
                  onChange={handleChange}
                  error={errors.displayName}
                  required
                />

                <div className="space-y-2">
                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                  />
                  {!isEmailVerified && (
                    <div className="flex items-center gap-2">
                      <ErrorMessage message="Email not verified" />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          verifyEmail();
                          toast.success('Verification email sent');
                        }}
                      >
                        Resend verification
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-4 rounded-lg border p-4">
                  <h4 className="font-medium">Change Password</h4>
                  <FormField
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    value={values.currentPassword}
                    onChange={handleChange}
                    error={errors.currentPassword}
                  />
                  <FormField
                    label="New Password"
                    name="newPassword"
                    type="password"
                    value={values.newPassword}
                    onChange={handleChange}
                    error={errors.newPassword}
                  />
                  <FormField
                    label="Confirm New Password"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                  />
                </div>

                {errors.submit && <ErrorMessage message={errors.submit} />}

                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            )}
          </Form>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, enabled]) => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  {key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                <button
                  type="button"
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    enabled ? 'bg-primary' : 'bg-muted'
                  }`}
                  onClick={() => handleNotificationChange(key as keyof NotificationSettings)}
                >
                  <span
                    className={`block h-5 w-5 rounded-full bg-white transition-transform ${
                      enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 