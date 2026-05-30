'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { formatRupiah } from '@/utils/currency';

const data = [
  { day: 'Senin', revenue: 1200000 },
  { day: 'Selasa', revenue: 1800000 },
  { day: 'Rabu', revenue: 1500000 },
  { day: 'Kamis', revenue: 2100000 },
  { day: 'Jumat', revenue: 2500000 },
  { day: 'Sabtu', revenue: 3200000 },
  { day: 'Minggu', revenue: 2800000 },
];

export const RevenueChart = () => {
  return (
    <Card className="col-span-1 lg:col-span-2 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-slate-800">Pendapatan 7 Hari Terakhir</CardTitle>
        <CardDescription>Tren pendapatan dari transaksi e-commerce dan POS</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer config={{
            revenue: {
              label: "Pendapatan",
              color: "#355872",
            }
          }} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7AAACE" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#7AAACE" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  tickFormatter={(val) => `Rp${val/1000}k`}
                  dx={-10}
                />
                <ChartTooltip content={<ChartTooltipContent formatter={(val: number) => formatRupiah(val)} />} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#355872" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
