'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Cash', value: 60, color: '#355872' },
  { name: 'QRIS', value: 25, color: '#7AAACE' },
  { name: 'Transfer', value: 15, color: '#9CD5FF' },
];

export const PaymentMethodChart = () => {
  return (
    <Card className="col-span-1 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-slate-800">Metode Pembayaran</CardTitle>
        <CardDescription>Distribusi metode pembayaran transaksi</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[250px] w-full">
          <ChartContainer config={{
            cash: { label: "Cash", color: "#355872" },
            qris: { label: "QRIS", color: "#7AAACE" },
            transfer: { label: "Transfer", color: "#9CD5FF" },
          }} className="w-full h-full mx-auto pb-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent formatter={(val: number) => `${val}%`} />} />
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
