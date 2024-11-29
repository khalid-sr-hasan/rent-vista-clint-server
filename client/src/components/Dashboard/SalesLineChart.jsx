import { useEffect } from "react";
import { useState } from "react";
import { Chart } from "react-google-charts";
import LoadingSpinner from "../Shared/LoadingSpinner";

// const data = [
//   ["Day", "Sales"],
//   ["9", 1000],
//   ["10", 1170],
//   ["11", 660],
//   ["12", 1030],
// ];

const options = {
  title: "Sales Over Time",
  curveType: "function",
  legend: { position: "bottom" },
  series: [{ color: "#F43F5E" }],
};
const SalesLineChart = ({ data }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <>
      {loading ? (
        <LoadingSpinner smallHeight></LoadingSpinner>
      ) : data?.length > 1 ? (
        <Chart
          chartType="LineChart"
          width="100%"
          data={data}
          options={options}
        />
      ) : (
        <>
          <LoadingSpinner></LoadingSpinner>
          <p className="text-center">
            Not Enough Data Available for This Section
          </p>
        </>
      )}
    </>
  );
};

export default SalesLineChart;
