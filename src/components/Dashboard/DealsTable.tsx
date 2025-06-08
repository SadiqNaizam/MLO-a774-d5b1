import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Deal {
  id: string;
  name: string;
  lastContacted: string;
  representative: {
    name: string;
    avatarUrl?: string;
    avatarFallback: string;
  };
  status: 'Deal Won' | 'Intro Call' | 'Stuck' | 'Negotiation' | 'Proposal Sent';
  dealValue: string;
}

const dealsData: Deal[] = [
  {
    id: '1',
    name: 'Absternet LLC',
    lastContacted: 'Sep 20, 2021',
    representative: { name: 'Donald Risher', avatarUrl: 'https://i.pravatar.cc/32?u=donald', avatarFallback: 'DR' },
    status: 'Deal Won' as const,
    dealValue: '$100.1K',
  },
  {
    id: '2',
    name: 'Raitech Soft',
    lastContacted: 'Sep 23, 2021',
    representative: { name: 'Sofia Cunha', avatarUrl: 'https://i.pravatar.cc/32?u=sofia', avatarFallback: 'SC' },
    status: 'Intro Call' as const,
    dealValue: '$150K',
  },
  {
    id: '3',
    name: 'William PVT',
    lastContacted: 'Sep 27, 2021',
    representative: { name: 'Luis Rocha', avatarUrl: 'https://i.pravatar.cc/32?u=luis', avatarFallback: 'LR' },
    status: 'Stuck' as const,
    dealValue: '$78.18K',
  },
  {
    id: '4',
    name: 'Loiusee LLP',
    lastContacted: 'Sep 30, 2021',
    representative: { name: 'Vitoria Rodrigues', avatarUrl: 'https://i.pravatar.cc/32?u=vitoria', avatarFallback: 'VR' },
    status: 'Deal Won' as const,
    dealValue: '$180K',
  },
  {
    id: '5',
    name: 'Future Solutions',
    lastContacted: 'Oct 02, 2021',
    representative: { name: 'Marco pâle', avatarUrl: 'https://i.pravatar.cc/32?u=marco', avatarFallback: 'MP' },
    status: 'Negotiation' as const,
    dealValue: '$210K',
  },
];

const getStatusBadgeClass = (status: Deal['status']): string => {
  switch (status) {
    case 'Deal Won':
      return 'bg-success/10 text-success';
    case 'Intro Call':
      return 'bg-primary/10 text-primary';
    case 'Stuck':
      return 'bg-destructive/10 text-destructive';
    case 'Negotiation':
      return 'bg-accent/10 text-accent-foreground dark:text-accent';
    case 'Proposal Sent':
      return 'bg-sky-500/10 text-sky-500';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const DealsTable: React.FC = () => {
  const [dateRange, setDateRange] = React.useState<string>('nov2021-dec2021');

  return (
    <Card className="shadow-sm col-span-1 lg:col-span-2"> {/* Spanning 2 columns example */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Deals Status</CardTitle>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[240px] h-8 text-xs">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nov2021-dec2021">02 Nov 2021 to 31 Dec 2021</SelectItem>
            <SelectItem value="oct2021-nov2021">01 Oct 2021 to 30 Nov 2021</SelectItem>
            <SelectItem value="alltime">All Time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Name</TableHead>
              <TableHead>Last Contacted</TableHead>
              <TableHead>Sales Representative</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right pr-6">Deal Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dealsData.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell className="font-medium pl-6">{deal.name}</TableCell>
                <TableCell className="text-muted-foreground">{deal.lastContacted}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-7 w-7 mr-2">
                      <AvatarImage src={deal.representative.avatarUrl} alt={deal.representative.name} />
                      <AvatarFallback>{deal.representative.avatarFallback}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{deal.representative.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("py-0.5 px-2 text-xs border-none font-medium", getStatusBadgeClass(deal.status))}>
                    {deal.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-semibold pr-6">{deal.dealValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DealsTable;
