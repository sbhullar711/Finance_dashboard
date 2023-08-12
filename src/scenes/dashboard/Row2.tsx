import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery } from '@/state/api'
import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import {
  ResponsiveContainer,
  CartesianGrid,
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

const Row2 = (props: Props) => {
const{palette}=useTheme();
const { data}=useGetKpisQuery();
console.log("🚀 ~ file: Row2.tsx:9 ~ Row2 ~ data:", data)
const growth = useMemo(() => {
  return (
    data &&
    data[0].monthlyData.map(({ month, revenue, expenses, operationalExpenses,nonOperationalExpenses }) => {
      return {
        name: month.substring(0, 3),
        revenue: revenue,
        expenses: expenses,
        operationalExpenses:operationalExpenses,
        nonOperationalExpenses:nonOperationalExpenses,
      };
    })
  );
}, [data])

  return (<>
    <DashboardBox  gridArea="d">
    <BoxHeader
          title="Account Breakdown"
          subtitle=" Shows the growth of stocks, crypto, and trades."
          sideText="+17%"
        />
<ResponsiveContainer width="100%" height="100%">
  <LineChart
    width={500}
    height={400}
    data={growth}
    margin={{
      top: 20,
      right: 0,
      left: -10,
      bottom: 55,
    }}
  >
    <CartesianGrid vertical={false} stroke={palette.grey[800]} />
    <XAxis
      dataKey="name"
      tickLine={false}
      style={{ fontSize: "10px" }}
    />
    <YAxis
      yAxisId="left"
      tickLine={false}
      axisLine={false}
      style={{ fontSize: "10px" }}
    />
    <YAxis
      yAxisId="right"
      orientation="right"
      tickLine={false}
      axisLine={false}
      style={{ fontSize: "10px" }}
    />
    <Tooltip />
    <Legend
      height={20}
      wrapperStyle={{
        margin: "0 0 10px 0",
      }}
      payload={[
        { value: "Options", type: "line", id: "expenses", color: palette.tertiary[500] },
        { value: "Dividend", type: "line", id: "operationalExpenses", color: "#468" },
        { value: "Stocks", type: "line", id: "nonOperationalExpenses", color: palette.primary.light },
      ]}
    />
    <Line
      yAxisId="left"
      type="monotone"
      dataKey="expenses"
      stroke={palette.tertiary[500]}
      name="Options" // Set the tooltip label for 'expenses' line
    />
    <Line
      yAxisId="right"
      type="monotone"
      dataKey="nonOperationalExpenses"
      stroke={palette.primary.main}
      name="Stocks" // Set the tooltip label for 'nonOperationalExpenses' line
    />
    <Line
      yAxisId="left"
      type="monotone"
      dataKey="operationalExpenses"
      stroke={"#468"}
      name="Dividend" // Set the tooltip label for 'operationalExpenses' line
    />
  </LineChart>
</ResponsiveContainer>

      </DashboardBox>
   
    </>
    
  )

}

export default Row2