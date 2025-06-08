import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, ResponsiveContainer, Tooltip } from 'recharts';

interface DealTypeDataPoint {
  subject: string;
  pending: number;
  loss: number;
  won: number;
  fullMark: number;
}

const radarChartData: DealTypeDataPoint[] = [
  { subject: 'Software', pending: 85, loss: 20, won: 65, fullMark: 100 },
  { subject: 'Hardware', pending: 60, loss: 45, won: 70, fullMark: 100 },
  { subject: 'Services', pending: 90, loss: 10, won: 80, fullMark: 100 },
  { subject: 'Consulting', pending: 70, loss: 30, won: 50, fullMark: 100 },
  { subject: 'Enterprise', pending: 50, loss: 25, won: 95, fullMark: 100 },
  { subject: 'SMB', pending: 75, loss: 15, won: 60, fullMark: 100 },
];

const radarColors = {
  pending: '#F1B24A', // accent orange/yellow
  loss: '#E74C3C',    // destructive red
  won: '#50C878',     // success green
};

const DealTypeRadarChart: React.FC = () => {
  const [sortBy, setSortBy] = React.useState<string>('monthly');

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">Deal Type</CardTitle>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[160px] h-8 text-xs">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pb-4">
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
              <defs>
                <radialGradient id="pendingGradient">
                  <stop offset="5%" stopColor={radarColors.pending} stopOpacity={0.5}/>
                  <stop offset="95%" stopColor={radarColors.pending} stopOpacity={0.1}/>
                </radialGradient>
                <radialGradient id="lossGradient">
                  <stop offset="5%" stopColor={radarColors.loss} stopOpacity={0.5}/>
                  <stop offset="95%" stopColor={radarColors.loss} stopOpacity={0.1}/>
                </radialGradient>
                <radialGradient id="wonGradient">
                  <stop offset="5%" stopColor={radarColors.won} stopOpacity={0.5}/>
                  <stop offset="95%" stopColor={radarColors.won} stopOpacity={0.1}/>
                </radialGradient>
              </defs>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
              />
              <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
              <Radar name="Pending" dataKey="pending" stroke={radarColors.pending} fill="url(#pendingGradient)" fillOpacity={0.6} />
              <Radar name="Loss" dataKey="loss" stroke={radarColors.loss} fill="url(#lossGradient)" fillOpacity={0.6} />
              <Radar name="Won" dataKey="won" stroke={radarColors.won} fill="url(#wonGradient)" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealTypeRadarChart;
