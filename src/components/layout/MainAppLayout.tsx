import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
// import { cn } from '@/lib/utils'; // Uncomment if cn() is needed for conditional classes

interface MainAppLayoutProps {
  /**
   * The main content to be rendered within the layout's content area.
   */
  children: React.ReactNode;
}

/**
 * MainAppLayout defines the overall page structure for the application.
 * It orchestrates the Sidebar, Header, and the main content area.
 * This layout assumes that Sidebar and Header components are internally fixed-positioned:
 * - Sidebar (via SidebarNav): fixed, left-0, top-0, w-64, h-screen.
 * - Header (via TopHeader): fixed, top-0, h-16, left-64, covering the remaining width.
 * The main content area is then offset accordingly to prevent overlap.
 */
const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  const handleToggleMobileSidebar = React.useCallback(() => {
    // This function is intended for a mobile sidebar toggle mechanism.
    // In a complete application, this would typically manage the state (e.g., open/closed)
    // of an overlay or drawer-style sidebar for smaller screens.
    // The current SidebarNav component from context is always w-64 and fixed;
    // a separate mobile-friendly sidebar component would be needed for this toggle to have full effect.
    // This handler is passed to the Header component, which may contain a toggle button (e.g., hamburger icon).
    console.log('Mobile sidebar toggle action invoked.');
  }, []);

  return (
    // The root div sets the base background and text color for the entire layout.
    // Body styles from index.css might also apply these.
    <div className="bg-background text-foreground">
      <Sidebar />
      <Header onToggleSidebar={handleToggleMobileSidebar} />
      
      {/* This div acts as the container for the main scrollable content area.
          - ml-64: Offsets content to the right of the fixed w-64 (16rem) sidebar.
          - pt-16: Offsets content below the fixed h-16 (4rem) header. */}
      <div className="ml-64 pt-16">
        {/* The <main> HTML5 element semantically represents the primary content.
            - min-h-[calc(100vh-4rem)]: Ensures the main area fills at least the 
              viewport height minus the header's height (4rem = h-16).
            - w-full: Ensures it takes the full width of its parent (the ml-64 div).
            - overflow-y-auto: Enables vertical scrolling if content exceeds available height. */}
        <main className="min-h-[calc(100vh-4rem)] w-full overflow-y-auto">
          {/* This inner div provides padding around the actual page content, 
              as per 'mainContent.layout' requirements (p-6). */}
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
