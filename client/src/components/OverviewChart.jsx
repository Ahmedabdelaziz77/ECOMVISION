import { Box, useTheme } from "@mui/material";
import { useMemo } from "react";
import { useGetSalesQuery } from "state/api";
import { ResponsiveLine } from "@nivo/line";

function OverviewChart({ isDashboard = false, view }) {
  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery();
  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data) return [];
    const { monthlyData } = data;
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };
    Object.values(monthlyData).reduce(
      (acc, { month, totalSales, totalUnits }) => {
        const curSales = acc.sales + totalSales;
        const curUnits = acc.units + totalUnits;
        totalSalesLine.data.push({ x: month, y: curSales });
        totalUnitsLine.data.push({ x: month, y: curUnits });
        return { sales: curSales, units: curUnits };
      },
      { sales: 0, units: 0 }
    );
    return [[totalSalesLine], [totalUnitsLine]];
  }, [data, theme.palette.secondary]);
  if (isLoading || !data) return <div>Loading...</div>;
  return (
    <ResponsiveLine
      data={view === "sales" ? totalSalesLine : totalUnitsLine}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      curve="catmullRom"
      axisBottom={{
        legend: isDashboard ? "" : "Month",
        // legendPosition: "middle",
        legendOffset: 36,
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v;
        },
      }}
      axisLeft={{
        legend: isDashboard
          ? ""
          : `Total ${view === "sales" ? "Revenue" : "Units"}`,
        legendOffset: -60,
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "seriesColor" }}
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      useMesh={true}
      legends={
        isDashboard
          ? undefined
          : [
              {
                anchor: "bottom-right",
                direction: "column",
                translateX: 30,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 22,
                symbolShape: "circle",
              },
            ]
      }
    />
  );
}

export default OverviewChart;
