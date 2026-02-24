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
        console.log(data.data);
      });
  }, []);
  
  return (
    <div >
      <h1 className="text-xl mb-3">상권분석 - 자세히</h1>
      <div className="flex gap-4">
        <div className="w-2/3 border rounded-lg p-4 mb-4">
          <WdogTable columns={columns} invoices={invoices} caption="매출내역" />
        </div>
        <div className="w-1/3 border rounded-lg p-4 mb-4 ">
          우리나라는 어디에 가장 많은 매출이 발생할까요? <br />
          매출이 가장 많은 지역은 서울특별시입니다. <br />
          그 다음으로는 경기도, 부산광역시, 인천광역시, 대구광역시 순입니다. <br />
        </div>
      </div>
    </div>
  );
}