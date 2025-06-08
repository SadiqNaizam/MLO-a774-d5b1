import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface SalesForecastDataPoint {
  name: string;
  goal: number;
  pending: number;
  revenue: number;
}

const chartData: SalesForecastDataPoint[] = [
  { name: 'Forecast', goal: 37000, pending: 12000, revenue: 18000 },
];

const barColors = {
  goal: '#4154F1', // primary blue
  pending: '#50C878', // success green
  revenue: '#F1B24A', // accent orange
};

const SalesForecastChart: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState<string>('nov2021');

  const totalForecastedValue = chartData[0].goal + chartData[0].pending + chartData[0].revenue;

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className='flex flex-col space-y-1.5'>
          <CardTitle className="text-lg font-semibold">Sales Forecast</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Total Forecasted Value: ${ (totalForecastedValue / 1000).toFixed(0) }k
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] h-8 text-xs">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nov2021">Nov 2021</SelectItem>
            <SelectItem value="oct2021">Oct 2021</SelectItem>
            <SelectItem value="q42021">Q4 2021</SelectItem>
            <SelectItem value="allyear">All Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pb-4">
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: -25, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))"/>
              <XAxis type="number" tickFormatter={(value) => `$${value/1000}k`} axisLine={false} tickLine={false} domain={[0, 'dataMax + 10000']} />
              <YAxis type="category" dataKey="name" hide />
              <Tooltip 
                cursor={{ fill: 'hsl(var(--muted))', fillOpacity: 0.3 }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
              />
              <Legend 
                verticalAlign="bottom" 
                iconType="circle" 
                wrapperStyle={{paddingTop: '20px'}}
              />
              <Bar dataKey="goal" name="Goal" fill={barColors.goal} barSize={25}>
                {chartData.map((entry, index) => (
                    <Cell key={`cell-goal-${index}`} />
                ))}
              </Bar>
              <Bar dataKey="pending" name="Pending Forecast" fill={barColors.pending} barSize={25}>
                 {chartData.map((entry, index) => (
                    <Cell key={`cell-pending-${index}`} />
                ))}
              </Bar>
              <Bar dataKey="revenue" name="Revenue" fill={barColors.revenue} barSize={25}>
                 {chartData.map((entry, index) => (
                    <Cell key={`cell-revenue-${index}`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesForecastChart;
