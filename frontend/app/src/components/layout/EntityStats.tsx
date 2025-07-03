"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPills,
  faIndustry,
  faBoxes,
  faTruck,
  faUser,
  faFileInvoice,
  faList,
} from '@fortawesome/free-solid-svg-icons';
import { Card } from "../ui/Card";

type EntityCount = {
  drugs: number;
  manufacturers: number;
  categories: number;
  suppliers: number;
  customers: number;
  invoices: number;
  invoiceDetails: number;
};

const iconMap = {
  drugs: <FontAwesomeIcon icon={faPills} className="text-purple-600" />,
  manufacturers: <FontAwesomeIcon icon={faIndustry} className="text-orange-600" />,
  categories: <FontAwesomeIcon icon={faBoxes} className="text-blue-600" />,
  suppliers: <FontAwesomeIcon icon={faTruck} className="text-green-600" />,
  customers: <FontAwesomeIcon icon={faUser} className="text-pink-600" />,
  invoices: <FontAwesomeIcon icon={faFileInvoice} className="text-teal-600" />,
  invoiceDetails: <FontAwesomeIcon icon={faList} className="text-gray-600" />,
};

const labels = {
  drugs: "Thuốc",
  manufacturers: "Hãng SX",
  categories: "Loại thuốc",
  suppliers: "Nhà cung cấp",
  customers: "Khách hàng",
  invoices: "Hóa đơn",
  invoiceDetails: "Chi tiết HĐ",
};

export default function EntityStats() {
  const [data, setData] = useState<EntityCount | null>(null);

  useEffect(() => {

    // TODO: ...
    setTimeout(() => {
      setData({
        drugs: 1,
        manufacturers: 1,
        categories: 1,
        suppliers: 1,
        customers: 1,
        invoices: 1,
        invoiceDetails: 1,
      });
    }, 300);
  }, []);

  if (!data) return <div>Đang tải...</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Object.entries(data).map(([key, value]) => (
        <Card key={key} className="flex items-center gap-3 p-4">
          <div className="text-2xl">{iconMap[key as keyof EntityCount]}</div>
          <div>
            <div className="text-sm text-muted-foreground">
              {labels[key as keyof EntityCount]}
            </div>
            <div className="text-lg font-bold">{value}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}
