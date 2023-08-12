import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery } from '@/state/api'
import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import {
  ResponsiveContainer,
  Label,
  AreaChart,
  XAxis,
  Line,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  Area,
  LineChart,
  ReferenceLine
} from "recharts";

type Props = {}

const Row1 = (props: Props) => {
const{palette}=useTheme();
const { data}=useGetKpisQuery();
console.log("🚀 ~ file: Row1.tsx:9 ~ Row1 ~ data:", data)
const growth = useMemo(() => {
  return (
    data &&
    data[0].monthlyData.map(({ month, revenue, expenses,nonOperationalExpenses }) => {
      return {
        name: month.substring(0, 3),
        revenue: revenue,
        expenses: expenses,
        nonOperationalExpenses:nonOperationalExpenses,
      };
    })
  );
}, [data])

const SPY500 = useMemo(() => {
  return (
    data &&
    data[0].monthlyData.map(({ month, revenue, expenses }) => {
      return {
        name: month.substring(0, 3),
        revenue: revenue,
        expenses: expenses,
      };
    })
  );
}, 

[data])

const month = useMemo(() => {
  return (
    data &&
    data[0].monthlyData.map(({ month, revenue, expenses }) => {
      return {
        name: month.substring(0, 3),
        revenue: revenue,
        expenses: expenses,
      };
    })
  );
}, 

[data]) 
;

  return (<>
   <DashboardBox gridArea="a">
  <BoxHeader 
    title="Overall Account Growth"
    subtitle='Shows overall growth of the account over the last year'
    sideText=' +34% '
  />
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart
      width={500}
      height={400}
      data={growth}
      margin={{
        top: 15,
        right: 24,
        left: -11,
        bottom: 60,
      }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend
        height={20}
        wrapperStyle={{
          margin: "0 0 10px 0",
        }}
        payload={[
          { value: "Stocks", type: "line", id: "nonOperationalExpenses", color: palette.tertiary[500] },
        ]}
      />
      <Area
        type="monotone"
        dataKey="nonOperationalExpenses"
        name="Stocks" // Set the tooltip label here
        stroke={palette.tertiary[500]}
        fillOpacity={0}
        fill="url(#colorRevenue)"
        dot={true}
      />
    </AreaChart>
  </ResponsiveContainer>
</DashboardBox>

<DashboardBox gridArea="b">
  <BoxHeader 
    title="SPY 500"
    subtitle='Shows overall growth of the SPY 500 over the last year'
    sideText=' +10% '
  />
  <ResponsiveContainer width="100%" height="100%">
    <LineChart
      width={500}
      height={400}
      data={SPY500}
      margin={{
        top: 15,
        right: 24,
        left: -11,
        bottom: 60,
      }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="expenses"
        name="SPY500" // Set the tooltip label here
        stroke={palette.tertiary.light}
        fillOpacity={0}
        fill="url(#colorRevenue)"
        dot={true}
      />
    </LineChart>
  </ResponsiveContainer>
</DashboardBox>

<DashboardBox gridArea="c">    
  <BoxHeader 
    title="Dividends"
    subtitle='Shows Monthly dividends'
    sideText=' +15% '
  />
  <ResponsiveContainer width="100%" height="100%">
    <BarChart
      width={500}
      height={400}
      data={month}
      margin={{
        top: 15,
        right: 24,
        left: -11,
        bottom: 60,
      }}
    >
      <XAxis dataKey="name">
        {/* Customize the X-axis label */}
        <Label value="Dividends" position="insideBottom" offset={-30} />
      </XAxis>
      <YAxis />
      <Tooltip />
      <ReferenceLine y={0} stroke="#000" />
      <Bar
        dataKey="expenses"
        fill="#8884d8"
        name="Dividends" // Set the tooltip label here
      />
    </BarChart>
  </ResponsiveContainer>
</DashboardBox>

    </>

  )
}

export default Row1