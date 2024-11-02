"use client";

import { useEffect, useState, useRef } from "react";
import {
  DataTable,
  DataTableExpandedRows,
  DataTableRowEvent,
  DataTableValueArray,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { SyncLoader } from "react-spinners";
import SearchNavbar from "@/components/ui/dashboard/search-navbar";
import data from "@/src/data/users.json";
import { Product } from "@/types";
import { Order } from "@/types";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
const { orders } = data;

export default function Orders() {
  const [finalOrders, setFinalOrders] = useState<
    {
      id: string;
      userId: string;
      category: string;
      amount: number;
      status: string;
      date: string;
      items: Product[];
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    // Simulate API call with setTimeout
    setFinalOrders(
      orders.map((order: any, index: number) => ({
        id: `ORD_${String(index + 1).padStart(3, "0")}`,
        userId: order.userId,
        category: order.category,
        amount: order.amount,
        status: order.status,
        date: order.date,
        items: order.items,
      })) as {
        id: string;
        userId: string;
        category: string;
        amount: number;
        status: string;
        date: string;
        items: Product[];
      }[]
    );
  }, []);

  const dateBodyTemplate = (rowData: any) => {
    return new Date(rowData.date).toLocaleDateString();
  };

  const amountBodyTemplate = (rowData: any) => {
    return `AED  ${rowData.amount.toFixed(2)}`;
  };

  const statusBodyTemplate = (rowData: any) => {
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm ${
          rowData.status === "completed"
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {rowData.status}
      </span>
    );
  };

  const categoryBodyTemplate = (rowData: any) => {
    return <p className="text-sm font-normal capitalize">{rowData.category}</p>;
  };
  const allowExpansion = (rowData: Order) => {
    return rowData.items!.length > 0;
  };
  const rowExpansionTemplate = (data: Order) => {
    return (
      <div className="p-3">
        <DataTable
          value={data.items}
          stripedRows={true}
          showGridlines={true}
          rowClassName={() => "bg-white dark:bg-slate-800"} // Add border between rows
          rowHover // Add hover effect
        >
          <Column
            field="productId"
            header="Id"
            bodyClassName="text-sm font-normal"
          ></Column>
          <Column
            field="name"
            header="Name"
            bodyClassName="text-sm font-normal"
          ></Column>
          <Column
            field="quantity"
            header="Quantity"
            bodyClassName="text-sm font-normal"
          ></Column>
          <Column
            field="price"
            header="Price"
            bodyClassName="text-sm font-normal"
          ></Column>
          <Column headerStyle={{ width: "4rem" }}></Column>
        </DataTable>
      </div>
    );
  };

  const expandAll = () => {
    let _expandedRows: DataTableExpandedRows = {};
    orders.forEach((p) => (_expandedRows[`${p.id}`] = true));
    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => {
    setExpandedRows(undefined);
  };

  const onRowExpand = (event: DataTableRowEvent) => {
    toast.current?.show({
      severity: "info",
      summary: "Order Expanded",
      detail: event.data.id,
      life: 3000,
    });
  };

  const onRowCollapse = (event: DataTableRowEvent) => {
    toast.current?.show({
      severity: "success",
      summary: "Order Collapsed",
      detail: event.data.id,
      life: 3000,
    });
  };

  const header = (
    <div className="flex justify-end gap-2">
      {/* <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
      <Button
        icon="pi pi-minus"
        label="Collapse All"
        onClick={collapseAll}
        text
      /> */}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <SyncLoader color="#0284c7" size={8} speedMultiplier={1} />
      </div>
    );
  }

  return (
    <div className="w-full h-screen px-4 ">
      <Toast ref={toast} />
      <SearchNavbar
        leftChildren={<div className="text-lg font-normal ml-4">Orders</div>}
        rightChildren={undefined}
      />

      <div className="mt-6 ml-4">
        <DataTable
          value={orders}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          // onRowExpand={onRowExpand}
          // onRowCollapse={onRowCollapse}
          rowExpansionTemplate={(data, options) =>
            rowExpansionTemplate(data as unknown as Order)
          }
          dataKey="id"
          // header={header}
          rows={10}
          // rowsPerPageOptions={[5, 10, 25, 50]}
          stripedRows={true}
          showGridlines={true}
          tableStyle={{
            minWidth: "50rem",
            height: "40vh",
            borderRadius: "10px",
            // borderBottom: "1px solid #e0e0e0",
          }}
          className="bg-white dark:bg-slate-800"
          rowClassName={() =>
            "bg-white dark:bg-slate-800 text-slate-800 dark:text-white border-b border-gray-200 dark:border-slate-700"
          } // Add border between rows
          rowHover // Add hover effect
        >
          <Column expander={allowExpansion} style={{ width: "5%" }} />
          <Column
            body={dateBodyTemplate}
            header="Date"
            sortable
            bodyClassName="text-sm font-normal"
            style={{ width: "10%" }}
          ></Column>
          <Column
            field="id"
            header="Order ID"
            sortable
            bodyClassName="text-sm font-normal"
            style={{ width: "15%" }}
          ></Column>
          <Column
            body={categoryBodyTemplate}
            field="category"
            header="Category"
            style={{ width: "15%" }}
          ></Column>
          <Column
            body={amountBodyTemplate}
            header="Amount"
            style={{ width: "15%" }}
            bodyClassName="text-sm font-normal"
          ></Column>
          <Column
            body={statusBodyTemplate}
            header="Status"
            style={{ width: "15%" }}
            bodyClassName="text-sm font-normal"
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
