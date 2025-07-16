"use client";

import { createBarChartConfig, formatCurrency } from "@/lib/chart-utils";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const AverageDailySales = ({ salesData = null }) => {
  const totalSales = salesData?.totalSales || 0;
  const period = salesData?.period || 'Monthly';
  
  // Create dynamic chart configuration
  const chartConfig = createBarChartConfig(
    salesData?.chartData || [0, 0, 0, 0, 0, 0, 0],
    salesData?.chartLabels || ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    {
      name: 'Daily Sales',
      color: '#D00054',
      formatter: formatCurrency,
      height: 220
    }
  );
  
  return (
    <div className='col-xxl-4 col-xl-6'>
      <div className='card h-100'>
        <div className='card-body p-24'>
          <div className='d-flex align-items-center flex-wrap gap-2 justify-content-between'>
            <h6 className='mb-2 fw-bold text-lg mb-0'>Average Daily Sales</h6>
            <select className='form-select form-select-sm w-auto bg-base border text-secondary-light'>
              <option>Yearly</option>
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Today</option>
            </select>
          </div>
          <h6 className='text-center my-20'>R$ {totalSales.toLocaleString()}</h6>
          <div id='barChart' className='barChart'>
            <ReactApexChart
              options={chartConfig.options}
              series={chartConfig.series}
              type='bar'
              height={220}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AverageDailySales;
