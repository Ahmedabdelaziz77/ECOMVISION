import { Box, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import Header from "components/Header";
import { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetSalesQuery } from "state/api";

function Daily({ isDashboard }) {
  const [startDate, setStartDate] = useState(new Date("2021-02-01"));
  const [endDate, setEndDate] = useState(new Date("2021-03-01"));
  const { data, isLoading } = useGetSalesQuery();
  const theme = useTheme();
  const formattedData = useMemo(() => {
    if (!data) return [];

    const { dailyData } = data;

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

    dailyData.forEach(({ date, totalSale, totalUnits }) => {
      if (!date) return;

      const dateFormatted = new Date(date);
      if (isNaN(dateFormatted)) return;

      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = date.substring(date.indexOf("-") + 1); // "MM-DD"
        const sale = Number(totalSale) || 0;
        const units = Number(totalUnits) || 0;

        totalSalesLine.data.push({ x: splitDate, y: sale });
        totalUnitsLine.data.push({ x: splitDate, y: units });
      }
    });

    return [totalSalesLine, totalUnitsLine];
  }, [data, startDate, endDate, theme.palette.secondary]);

  if (isLoading) return <div>Loading...</div>;
  console.log(data);
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="DAILY SALES"
        subtitle="Chart of daily sales and units sold"
      />
      <Box height="75vh">
        <Box display="flex" justifyContent="flex-end" mb="1rem">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </Box>
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
            curve="catmullRom"
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

export default Daily;
