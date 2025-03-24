import React, { useState } from 'react';
import { Bell, Mail, Shield, Smartphone, Moon, Sun } from 'lucide-react';
import Layout from '@/components/Layout';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: {
      warrantyExpiration: true,
      productUpdates: false,
      emailNotifications: true,
      pushNotifications: false
    },
    appearance: {
      darkMode: false,
      compactView: false
    },
    privacy: {
      shareAnalytics: true,
      productSuggestions: true
    }
  });

  const handleSettingChange = (category: string, setting: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: !prev[category as keyof typeof prev][setting as keyof typeof prev[keyof typeof prev]]
      }
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
      duration: 3000,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-muted-foreground">Manage your preferences and account settings</p>
        </div>

        <div className="space-y-6">
          {/* Notifications */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="w-5 h-5" />
              <h2 className="text-lg font-medium">Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Warranty Expiration Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified when warranties are about to expire</p>
                </div>
                <Switch
                  checked={settings.notifications.warrantyExpiration}
                  onCheckedChange={() => handleSettingChange('notifications', 'warrantyExpiration')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Product Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive updates about your registered products</p>
                </div>
                <Switch
                  checked={settings.notifications.productUpdates}
                  onCheckedChange={() => handleSettingChange('notifications', 'productUpdates')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  checked={settings.notifications.emailNotifications}
                  onCheckedChange={() => handleSettingChange('notifications', 'emailNotifications')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                </div>
                <Switch
                  checked={settings.notifications.pushNotifications}
                  onCheckedChange={() => handleSettingChange('notifications', 'pushNotifications')}
                />
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Sun className="w-5 h-5" />
              <h2 className="text-lg font-medium">Appearance</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                </div>
                <Switch
                  checked={settings.appearance.darkMode}
                  onCheckedChange={() => handleSettingChange('appearance', 'darkMode')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Compact View</Label>
                  <p className="text-sm text-muted-foreground">Show more items in a condensed view</p>
                </div>
                <Switch
                  checked={settings.appearance.compactView}
                  onCheckedChange={() => handleSettingChange('appearance', 'compactView')}
                />
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5" />
              <h2 className="text-lg font-medium">Privacy & Security</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Share Analytics</Label>
                  <p className="text-sm text-muted-foreground">Help improve the app by sharing usage data</p>
                </div>
                <Switch
                  checked={settings.privacy.shareAnalytics}
                  onCheckedChange={() => handleSettingChange('privacy', 'shareAnalytics')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Product Suggestions</Label>
                  <p className="text-sm text-muted-foreground">Receive personalized product recommendations</p>
                </div>
                <Switch
                  checked={settings.privacy.productSuggestions}
                  onCheckedChange={() => handleSettingChange('privacy', 'productSuggestions')}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;