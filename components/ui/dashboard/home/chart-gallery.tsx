import { Chart } from "primereact/chart";
import { Galleria } from "primereact/galleria";
import { useState } from "react";
import data from "@/src/data/users.json";

const { salesByCategory, customerMetrics } = data;

export default function ChartGallery() {
  const salesChartData = {
    labels: salesByCategory.electronics.monthlyData.map((item) => item.month),
    datasets: [
      {
        label: "Electronics",
        data: salesByCategory.electronics.monthlyData.map((item) => item.sales),
        borderColor: "#4B5563",
        tension: 0.4,
      },
      {
        label: "Clothing",
        data: salesByCategory.clothing.monthlyData.map((item) => item.sales),
        borderColor: "#3B82F6",
        tension: 0.4,
      },
      {
        label: "Books",
        data: salesByCategory.books.monthlyData.map((item) => item.sales),
        borderColor: "#10B981",
        tension: 0.4,
      },
    ],
  };

  const customerChartData = {
    labels: customerMetrics.newCustomers.map((item) => item.month),
    datasets: [
      {
        type: "bar",
        label: "New Customers",
        data: customerMetrics.newCustomers.map((item) => item.count),
        backgroundColor: "#3B82F6",
      },
      {
        type: "line",
        label: "Customer Satisfaction",
        data: customerMetrics.satisfaction.map((item) => item.rating * 100),
        borderColor: "#10B981",
        tension: 0.4,
      },
    ],
  };

  const chartData = [
    {
      type: "line",
      title: "Sales Trends",
      data: salesChartData,
    },
    {
      type: "bar",
      title: "Customer Growth & Satisfaction",
      data: customerChartData,
    },
  ];

  const itemTemplate = (item: any) => {
    return (
      <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow w-full ">
        <h3 className="text-lg font-semibold mb-4">{item.title}</h3>
        <Chart type={item.type} data={item.data} />
      </div>
    );
  };

  const thumbnailTemplate = (item: any) => {
    return (
      <div className=" rounded w-full p-3">
        <span className="text-sm opacity-90 relative ">{item.title}</span>
      </div>
    );
  };

  return (
    <div className="col-span-6 lg:col-span-4 bg-white dark:bg-slate-800 rounded-lg shadow">
      <Galleria
        value={chartData}
        numVisible={4}
        style={{ maxWidth: "840px", backgroundColor: "transparent" }}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
        className="min-h-[300px]"
      />
    </div>
  );
}
