import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Dot } from 'lucide-react';

interface BalanceDataPoint {
  month: string;
  revenue: number;
  expenses: number;
}

const balanceChartData: BalanceDataPoint[] = [
  { month: 'Jan', revenue: 12000, expenses: 8000 },
  { month: 'Feb', revenue: 15000, expenses: 10000 },
  { month: 'Mar', revenue: 22000, expenses: 13000 },
  { month: 'Apr', revenue: 18000, expenses: 15000 },
  { month: 'May', revenue: 25000, expenses: 16000 },
  { month: 'Jun', revenue: 30000, expenses: 20000 },
  { month: 'Jul', revenue: 28000, expenses: 22000 },
  { month: 'Aug', revenue: 35000, expenses: 25000 },
  { month: 'Sep', revenue: 42000, expenses: 28000 },
  { month: 'Oct', revenue: 48000, expenses: 30000 },
  { month: 'Nov', revenue: 55000, expenses: 35000 },
  { month: 'Dec', revenue: 60000, expenses: 38000 },
];

const lineColors = {
  revenue: '#50C878', // success green
  expenses: '#E74C3C', // destructive red
};

const BalanceOverviewChart: React.FC = () => {
  const [sortBy, setSortBy] = React.useState<string>('currentYear');

  const totalRevenue = balanceChartData.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpenses = balanceChartData.reduce((sum, item) => sum + item.expenses, 0);
  const profitRatio = totalRevenue > 0 ? ((totalRevenue - totalExpenses) / totalRevenue) * 100 : 0;

  return (
    <Card className="shadow-sm col-span-1 lg:col-span-2"> {/* Spanning 2 columns in a 4-column grid example */}
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-lg font-semibold mb-2 sm:mb-0">Balance Overview</CardTitle>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[160px] h-8 text-xs">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="currentYear">Current Year</SelectItem>
                <SelectItem value="lastYear">Last Year</SelectItem>
                <SelectItem value="last6Months">Last 6 Months</SelectItem>
              </SelectContent>
            </Select>
        </div>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <div className="flex items-center">
                <span className="font-bold text-primary mr-1.5">${(totalRevenue/1000).toFixed(0)}k</span>
                <span className="text-muted-foreground">Revenue</span>
            </div>
            <div className="flex items-center">
                <span className="font-bold text-foreground mr-1.5">${(totalExpenses/1000).toFixed(0)}k</span>
                <span className="text-muted-foreground">Expenses</span>
            </div>
            <div className="flex items-center">
                <span className="font-bold text-foreground mr-1.5">{profitRatio.toFixed(1)}%</span>
                <span className="text-muted-foreground">Profit Ratio</span>
            </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <AreaChart data={balanceChartData} margin={{ top: 5, right: 20, left: -15, bottom: 5 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={lineColors.revenue} stopOpacity={0.6}/>
                  <stop offset="95%" stopColor={lineColors.revenue} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={lineColors.expenses} stopOpacity={0.6}/>
                  <stop offset="95%" stopColor={lineColors.expenses} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(value) => `$${value/1000}k`} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
                labelStyle={{ color: 'hsl(var(--foreground))'}}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
              />
              <Legend 
                iconType="circle" 
                wrapperStyle={{paddingTop: '20px'}}
                formatter={(value) => <span className="text-muted-foreground capitalize">{value}</span>}
              />
              <Area type="monotone" dataKey="revenue" stroke={lineColors.revenue} fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
              <Area type="monotone" dataKey="expenses" stroke={lineColors.expenses} fillOpacity={1} fill="url(#colorExpenses)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceOverviewChart;
