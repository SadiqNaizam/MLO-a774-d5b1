import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  breadcrumbs,
  className
}) => {
  return (
    <div className={cn("flex items-center justify-between mb-6", className)}>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <nav aria-label="breadcrumb">
        <ol className="flex items-center space-x-1.5 text-sm text-muted-foreground">
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
              {crumb.href ? (
                <a href={crumb.href} className="hover:text-primary">
                  {crumb.label}
                </a>
              ) : (
                <span>{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default PageHeader;
