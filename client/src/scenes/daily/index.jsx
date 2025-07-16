import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import OverviewChart from "components/OverviewChart";
import { useState, useMemo } from "react";
import { useGetSalesQuery } from "state/api";

function Daily() {
  const { data, isLoading } = useGetSalesQuery();
  if (isLoading) return <div>Loading...</div>;
  return <div></div>;
}

export default Daily;
