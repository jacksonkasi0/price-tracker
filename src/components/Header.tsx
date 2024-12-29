import React from 'react';
import { ThemeController } from '@/components/ThemeController';
import { Avatar } from '@lemonsqueezy/wedges';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center mb-6 border-b border-surface pb-4">
      {/* Left Side - Title and Description */}
      <div>
        <h1 className="text-2xl font-bold text-primary">Price Tracker</h1>
        <p className="text-secondary">
          Monitor and manage price changes for your favorite products across platforms.
        </p>
      </div>

      {/* Right Side - Theme Controller and Avatar */}
      <div className="flex items-center space-x-4">
        <ThemeController />
        <Avatar
          alt="User"
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=250&h=250&auto=format&fit=crop"
        />
      </div>
    </header>
  );
};

export default Header;
