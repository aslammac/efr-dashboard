import React from "react";
import { Card } from "primereact/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, AlertTriangle } from "lucide-react";
import data from "@/src/data/users.json";

export default function InventoryCard() {
  const { electronics, clothing, books, furniture } =
    data.productPerformance.inventory;
  const outOfStock =
    electronics.outOfStock +
    clothing.outOfStock +
    books.outOfStock +
    furniture.outOfStock;
  const lowStock =
    electronics.lowStock +
    clothing.lowStock +
    books.lowStock +
    furniture.lowStock;

  return (
    <div className="col-span-6 lg:col-span-2 p-6 bg-white dark:bg-slate-800 rounded-lg shadow card">
      <h3 className="text-lg font-semibold mb-4">Inventory Status</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-full">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="font-medium">Out of Stock Items</p>
              <p className="text-sm text-gray-500">{outOfStock} products</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="text-sm"
            // onClick={() => router.push("/inventory?filter=outofstock")}
          >
            View
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-full">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="font-medium">Low Stock Items</p>
              <p className="text-sm text-gray-500">{lowStock} products</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="text-sm"
            // onClick={() => router.push('/inventory?filter=lowstock')}
          >
            View
          </Button>
        </div>
        {/* <div className="pt-4 border-t">
          <Button
            className="w-full"
            variant="outline"
            // onClick={() => router.push("/inventory")}
          >
            View All Inventory
          </Button>
        </div> */}
      </div>
    </div>
  );
}
