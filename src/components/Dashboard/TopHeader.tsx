import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Menu as MenuIcon,
  Search,
  Flag,
  Grid,
  Bell,
  Maximize,
  Minimize,
  SunMedium,
  Moon,
  Settings,
  UserCircle2,
  LogOut,
  HelpCircle
} from 'lucide-react';

interface TopHeaderProps {
  onToggleSidebar?: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ onToggleSidebar }) => {
  const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="h-16 bg-card text-card-foreground border-b border-border flex items-center justify-between px-4 fixed top-0 left-64 right-0 z-50" style={{ width: 'calc(100% - 16rem)' }}>
      <div className="flex items-center space-x-2">
        {onToggleSidebar && (
          <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="lg:hidden">
            <MenuIcon className="h-5 w-5" />
          </Button>
        )}
        <div className="relative w-64 hidden sm:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="pl-8 w-full h-9" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Flag className="h-5 w-5" /> 
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Spanish</DropdownMenuItem>
            <DropdownMenuItem>French</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon">
          <Grid className="h-5 w-5" />
        </Button>

        <div className="relative">
            <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
            </Button>
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs rounded-full bg-red-500 text-white">5</Badge>
        </div>

        <Button variant="ghost" size="icon" onClick={toggleFullScreen} className="hidden md:inline-flex">
          {isFullScreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {isDarkMode ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src="https://i.pravatar.cc/32?u=annaadame" alt="Anna Adame" />
              <AvatarFallback>AA</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <p className="text-sm font-medium">Anna Adame</p>
              <p className="text-xs text-muted-foreground">Founder</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><UserCircle2 className="mr-2 h-4 w-4" /> Profile</DropdownMenuItem>
            <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Settings</DropdownMenuItem>
            <DropdownMenuItem><HelpCircle className="mr-2 h-4 w-4" /> Help Center</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
