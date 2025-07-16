import { Box, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import Header from "components/Header";
import { useMemo } from "react";
import { useGetSalesQuery } from "state/api";

function Monthly({ isDashboard }) {
  const { data, isLoading } = useGetSalesQuery();
  const theme = useTheme();
  const formattedData = useMemo(() => {
    if (!data) return [];

    const { monthlyData } = data;

    const totalSalesLine = {
      id: "Total Sales",
      color: theme.palette.secondary.main,
      data: [],
    };

    const totalUnitsLine = {
      id: "Total Units",
      color: theme.palette.secondary[600],
      data: [],
    };

    monthlyData.forEach(({ month, totalSales, totalUnits }) => {
      const sale = Number(totalSales) || 0;
      const units = Number(totalUnits) || 0;

      if (month) {
        totalSalesLine.data.push({ x: month, y: sale });
        totalUnitsLine.data.push({ x: month, y: units });
      }
    });

    return [totalSalesLine, totalUnitsLine];
  }, [data, theme.palette.secondary]);

  if (isLoading) return <div>Loading...</div>;
  console.log(formattedData);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="MONTHLY SALES" subtitle="Chart of monthly sales" />
      <Box height="75vh">
        {data && (
          <ResponsiveLine
            data={formattedData}
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
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            // curve="catmullRom"
            axisBottom={{
              legend: "Month",
              legendPosition: "middle",
              format: (v) => {
                if (isDashboard) return v.slice(0, 3);
                return v;
              },
              tickRotation: 9,
              legendOffset: 60,
            }}
            axisLeft={{
              legend: "Total",
              legendOffset: -50,
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
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                translateX: 50,
                translateY: 0,
                itemWidth: 80,
                itemHeight: 22,
                symbolShape: "circle",
              },
            ]}
          />
        )}
      </Box>
    </Box>
  );
}

export default Monthly;
