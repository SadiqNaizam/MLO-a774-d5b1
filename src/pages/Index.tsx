import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import PageHeader from '../components/Dashboard/PageHeader';
import StatsCardGrid from '../components/Dashboard/StatsCardGrid';
import SalesForecastChart from '../components/Dashboard/SalesForecastChart';
import DealTypeRadarChart from '../components/Dashboard/DealTypeRadarChart';
import BalanceOverviewChart from '../components/Dashboard/BalanceOverviewChart';
import DealsTable from '../components/Dashboard/DealsTable';
import TasksWidget from '../components/Dashboard/TasksWidget';

/**
 * IndexPage serves as the main CRM Overview dashboard.
 * It arranges various dashboard components within the MainAppLayout.
 * The MainAppLayout's content area is defined by `layoutRequirements.mainContent`
 * as a "grid grid-cols-4 gap-6 p-6". Components placed here are direct children of this grid.
 *
 * Note on component sizing:
 * - PageHeader, StatsCardGrid, SalesForecastChart, DealTypeRadarChart, and TasksWidget
 *   are assumed to correctly apply `props.className` to their root element for grid spanning.
 * - BalanceOverviewChart and DealsTable have fixed internal `lg:col-span-2` styling
 *   (as per their provided source code which does not merge `props.className` for layout classes).
 *   This means they will inherently occupy 2 out of 4 columns on large screens when placed
 *   directly into the main 4-column grid, sitting side-by-side.
 */
const IndexPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Dashboards', href: '#' },
    { label: 'CRM' },
  ];

  return (
    <MainAppLayout>
      {/* PageHeader spans the full width of the 4-column grid */}
      <PageHeader 
        title="CRM" 
        breadcrumbs={breadcrumbs} 
        className="col-span-4" 
      />
      
      {/* StatsCardGrid also spans the full width */}
      <StatsCardGrid 
        className="col-span-4" 
      />

      {/* SalesForecastChart and DealTypeRadarChart sit side-by-side on medium screens and up. */}
      {/* Each takes 2 of 4 columns. On smaller screens, they stack. */}
      <SalesForecastChart className="col-span-4 md:col-span-2" />
      <DealTypeRadarChart className="col-span-4 md:col-span-2" />
      
      {/* BalanceOverviewChart and DealsTable have fixed internal `lg:col-span-2`. */}
      {/* They will naturally occupy 2 columns each on large screens, appearing side-by-side. */}
      <BalanceOverviewChart /> {/* Occupies lg:col-span-2 due to its internal Card styling */}
      <DealsTable />         {/* Occupies lg:col-span-2 due to its internal Card styling */}
      
      {/* TasksWidget takes a new row, spanning the full width. */}
      <TasksWidget className="col-span-4" />
    </MainAppLayout>
  );
};

export default IndexPage;
