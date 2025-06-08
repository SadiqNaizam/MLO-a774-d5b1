import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  BarChart2,
  ShoppingBag,
  Bitcoin,
  Briefcase,
  FileText,
  Puzzle,
  Newspaper,
  AppWindow,
  LayoutGrid,
  Lock,
  Presentation,
  Palette,
  Component as ComponentIcon, // Renamed to avoid conflict with React.Component
  Box,
  SlidersHorizontal,
  UserCircle2,
  ChevronDown,
  Dot,
  HelpCircle
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  isNew?: boolean;
  isHot?: boolean;
  children?: NavSubItem[];
  type?: 'main' | 'header';
  isActive?: boolean; // For CRM like items
}

interface NavSubItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}

const sidebarNavItems: NavItem[] = [
  {
    id: 'userProfile',
    label: 'Anna Adame',
    icon: UserCircle2, // Placeholder, actual avatar is used
    type: 'main' // Special handling for user profile section
  },
  { id: 'menuHeader', label: 'MENU', type: 'header' }, 
  {
    id: 'dashboards',
    label: 'Dashboards',
    icon: LayoutDashboard,
    isActive: true, // Example for active parent
    children: [
      { id: 'analytics', label: 'Analytics', href: '#', isActive: false },
      { id: 'crm', label: 'CRM', href: '#', isActive: true },
      { id: 'ecommerce', label: 'Ecommerce', href: '#', isActive: false },
      { id: 'crypto', label: 'Crypto', href: '#', isActive: false },
    ],
  },
  { id: 'projects', label: 'Projects', icon: Briefcase, href: '#' },
  { id: 'nft', label: 'NFT', icon: Puzzle, href: '#' }, 
  { id: 'job', label: 'Job', icon: FileText, href: '#' }, 
  { id: 'blog', label: 'Blog', icon: Newspaper, href: '#', isNew: true },
  {
    id: 'apps',
    label: 'Apps',
    icon: AppWindow,
    children: [
      { id: 'app-calendar', label: 'Calendar', href: '#' },
      { id: 'app-chat', label: 'Chat', href: '#' },
    ],
  },
  {
    id: 'layouts',
    label: 'Layouts',
    icon: LayoutGrid,
    isHot: true,
    children: [
      { id: 'layout-horizontal', label: 'Horizontal', href: '#' },
      { id: 'layout-detached', label: 'Detached', href: '#' },
    ],
  },
  { id: 'pagesHeader', label: 'PAGES', type: 'header' },
  {
    id: 'authentication',
    label: 'Authentication',
    icon: Lock,
    children: [
      { id: 'auth-signin', label: 'Sign In', href: '#' },
      { id: 'auth-signup', label: 'Sign Up', href: '#' },
    ],
  },
  {
    id: 'pages',
    label: 'Pages',
    icon: Presentation,
    children: [
      { id: 'page-starter', label: 'Starter', href: '#' },
      { id: 'page-profile', label: 'Profile', href: '#' },
    ],
  },
  {
    id: 'landing',
    label: 'Landing',
    icon: Palette, // Using Palette as Landing icon representation
    children: [
        { id: 'landing-onepage', label: 'One Page', href: '#' },
        { id: 'landing-nft', label: 'NFT Landing', href: '#' },
    ]
  },
  { id: 'componentsHeader', label: 'COMPONENTS', type: 'header' },
  { id: 'baseUi', label: 'Base UI', icon: ComponentIcon, children: [] }, 
  { id: 'advanceUi', label: 'Advance UI', icon: Box, children: [] },
  { id: 'widgets', label: 'Widgets', icon: HelpCircle, href: '#' }, // Using HelpCircle as a generic icon for Widgets
  { id: 'forms', label: 'Forms', icon: SlidersHorizontal, children: [] },
];

const SidebarNav: React.FC = () => {
  const [openAccordionItems, setOpenAccordionItems] = React.useState<string[]>(['dashboards']);

  return (
    <div className="w-64 bg-card text-card-foreground border-r border-border h-screen fixed top-0 left-0 flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-border">
        <h1 className="text-2xl font-bold text-primary">VELZON</h1>
      </div>
      <div className="flex items-center p-4 space-x-3 border-b border-border">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://i.pravatar.cc/40?u=annaadame" alt="Anna Adame" />
          <AvatarFallback>AA</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-sm">Anna Adame</p>
          <p className="text-xs text-muted-foreground flex items-center">
            <Dot className="text-success h-5 w-5 -ml-1.5" /> Online
          </p>
        </div>
      </div>
      <ScrollArea className="flex-1 px-3 py-4">
        <Accordion 
            type="multiple" 
            value={openAccordionItems} 
            onValueChange={setOpenAccordionItems}
            className="w-full"
        >
          {sidebarNavItems.map((item) => {
            if (item.type === 'header') {
              return (
                <h3 key={item.id} className="px-2 py-3 text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                  {item.label}
                </h3>
              );
            }
            if (item.type === 'main' && item.id === 'userProfile') return null; // Handled above

            if (item.children && item.children.length > 0) {
              return (
                <AccordionItem value={item.id} key={item.id} className="border-b-0">
                  <AccordionTrigger 
                    className={cn(
                        "flex items-center justify-between w-full py-2 px-2 rounded-md text-sm hover:bg-muted/50",
                        item.isActive && "text-primary bg-muted/80",
                        !item.isActive && "text-foreground"
                    )}
                  >
                    <div className="flex items-center">
                      <item.icon className={cn("h-5 w-5 mr-3", item.isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                      {item.label}
                    </div>
                    <div className='flex items-center space-x-1'>
                        {item.isNew && <Badge variant="outline" className="bg-success/10 text-success text-xs px-1.5 py-0.5">New</Badge>}
                        {item.isHot && <Badge variant="outline" className="bg-destructive/10 text-destructive text-xs px-1.5 py-0.5">Hot</Badge>}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-0 pl-4">
                    <ul className="space-y-1 pt-1">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <a
                            href={child.href}
                            className={cn(
                              "block py-1.5 px-2 rounded-md text-sm hover:bg-muted/50",
                              child.isActive ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                            )}
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            }

            return (
              <a
                key={item.id}
                href={item.href}
                className={cn(
                    "flex items-center py-2 px-2 rounded-md text-sm hover:bg-muted/50 group",
                    item.isActive ? 'text-primary bg-muted/80' : 'text-foreground'
                )}
              >
                <item.icon className={cn("h-5 w-5 mr-3", item.isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {item.label}
                {item.isNew && <Badge variant="outline" className="ml-auto bg-success/10 text-success text-xs px-1.5 py-0.5">New</Badge>}
                {item.isHot && <Badge variant="outline" className="ml-auto bg-destructive/10 text-destructive text-xs px-1.5 py-0.5">Hot</Badge>}
              </a>
            );
          })}
        </Accordion>
      </ScrollArea>
    </div>
  );
};

export default SidebarNav;
