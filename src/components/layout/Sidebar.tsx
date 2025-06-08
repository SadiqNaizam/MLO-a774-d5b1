import React from 'react';
import SidebarNav from '../Dashboard/SidebarNav'; // Path relative to src/components/layout/

/**
 * Sidebar component for the application layout.
 * It wraps the main navigation component, SidebarNav, which is expected
 * to handle its own styling and fixed positioning (w-64, h-screen, fixed).
 */
const Sidebar: React.FC = () => {
  return <SidebarNav />;
};

export default Sidebar;
