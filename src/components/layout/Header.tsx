import React from 'react';
import TopHeader from '../Dashboard/TopHeader'; // Path relative to src/components/layout/

interface HeaderProps {
  /**
   * Callback function to toggle the sidebar, typically for a mobile-specific menu.
   * This prop is passed down to the TopHeader component.
   */
  onToggleSidebar?: () => void;
}

/**
 * Header component for the application layout.
 * It wraps the TopHeader component, which includes elements like search, 
 * notification icons, language switcher, and user profile.
 * TopHeader is expected to handle its own fixed positioning (h-16, fixed, left-64).
 */
const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return <TopHeader onToggleSidebar={onToggleSidebar} />;
};

export default Header;
