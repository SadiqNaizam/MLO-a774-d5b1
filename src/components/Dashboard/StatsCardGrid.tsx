import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { BellRing, DollarSign, Activity, PiggyBank, Heart, ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardData {
  id: string;
  label: string;
  value: string;
  icon: React.ElementType;
  iconBgColor: string;
  percentageChange?: number; 
  changePeriod?: string; // e.g. "vs. previous month"
}

const statsData: StatCardData[] = [
  {
    id: 'campaignSent',
    label: 'CAMPAIGN SENT',
    value: '197',
    icon: BellRing,
    iconBgColor: 'bg-sky-100 dark:bg-sky-900',
    percentageChange: 5.27,
    changePeriod: 'vs. previous month',
  },
  {
    id: 'annualProfit',
    label: 'ANNUAL PROFIT',
    value: '$489.4k',
    icon: DollarSign,
    iconBgColor: 'bg-green-100 dark:bg-green-900',
    percentageChange: 12.5,
    changePeriod: 'vs. previous year',
  },
  {
    id: 'leadConversation',
    label: 'LEAD CONVERSATION',
    value: '32.89%',
    icon: Activity,
    iconBgColor: 'bg-orange-100 dark:bg-orange-900',
    percentageChange: -2.3,
    changePeriod: 'vs. previous week',
  },
  {
    id: 'dailyAverageIncome',
    label: 'DAILY AVERAGE INCOME',
    value: '$1,596.5',
    icon: PiggyBank,
    iconBgColor: 'bg-purple-100 dark:bg-purple-900',
  },
  {
    id: 'annualDeals',
    label: 'ANNUAL DEALS',
    value: '2,659',
    icon: Heart,
    iconBgColor: 'bg-red-100 dark:bg-red-900',
    percentageChange: -10.1,
    changePeriod: 'vs. previous year',
  },
];

interface StatCardProps extends StatCardData {}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  iconBgColor,
  percentageChange,
  changePeriod
}) => {
  const isPositive = percentageChange !== undefined && percentageChange >= 0;
  const isNegative = percentageChange !== undefined && percentageChange < 0;

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{label}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          {percentageChange !== undefined && (
            <div className={cn(
                "text-xs mt-1 flex items-center",
                isPositive && "text-success",
                isNegative && "text-destructive"
            )}>
              {isPositive && <ArrowUp className="h-3.5 w-3.5 mr-0.5" />}
              {isNegative && <ArrowDown className="h-3.5 w-3.5 mr-0.5" />}
              {Math.abs(percentageChange)}% 
              {changePeriod && <span className="text-muted-foreground ml-1 hidden sm:inline">{changePeriod}</span>}
            </div>
          )}
        </div>
        <div className={cn("p-3 rounded-full", iconBgColor)}>
          <Icon className={cn(
              "h-6 w-6",
              iconBgColor.includes('sky') && 'text-sky-500',
              iconBgColor.includes('green') && 'text-green-500',
              iconBgColor.includes('orange') && 'text-orange-500',
              iconBgColor.includes('purple') && 'text-purple-500',
              iconBgColor.includes('red') && 'text-red-500',
            )} />
        </div>
      </CardContent>
    </Card>
  );
};

interface StatsCardGridProps {
  className?: string;
}

const StatsCardGrid: React.FC<StatsCardGridProps> = ({ className }) => {
  // Displaying first 4 cards as per common dashboard layouts and image focus, though more data is available
  const displayedStats = statsData.slice(0, 4);
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
      {displayedStats.map((stat) => (
        <StatCard key={stat.id} {...stat} />
      ))}
    </div>
  );
};

export default StatsCardGrid;
