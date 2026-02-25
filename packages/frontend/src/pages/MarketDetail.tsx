import WdogMapCircle from "@/components/WdogMapCircle";
import WdogTable from "@/components/WdogTable";

import { useEffect, useState } from "react";
import type { Invoice, ColDesc } from 'shared';

export default function MarketDetail() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  useEffect(() => {
    fetch('http://localhost:3001/api/get_invoices')
      .then(res => res.json())
      .then(data => {
        setInvoices(data.data);  
      });
  }, []);

  const [columns, setColumns] = useState<ColDesc[]>([]);
  useEffect(() => {
    fetch('http://localhost:3001/api/get_col_descs?table=INVOICE')
      .then(res => res.json())
      .then(data => {
        setColumns(data.data);  
      });
  }, []);

  const [shopName, setShopName] = useState<string>('김밥');
  const [region, setRegion] = useState<string>('순천');
  const handleRowClick = (invoice: Invoice) => {
    setRegion(invoice.area_name);  
    setShopName(invoice.seller_name);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4">
        <div >상권분석</div>
        <div >{'>'}</div>
        <div className="text-focus">상세분석</div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2 border rounded-lg p-4 mb-4">
          <WdogTable columns={columns} invoices={invoices} caption="매출내역" onRowClick={handleRowClick} />
        </div>
        <div className="w-1/2 border rounded-lg p-4 mb-4 ">
          {region && <WdogMapCircle shopName={shopName} region={region} />}
        </div>
      </div>
    </div>
  );
}

