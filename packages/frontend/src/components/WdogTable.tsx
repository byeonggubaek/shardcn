import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { ColDesc, Invoice } from 'shared';
import { formatCurrency, formatNumber, formatPrice, formatDate, formatTime } from "@/lib/utils";

interface WdogTableProps {
  columns: ColDesc[];
  invoices: Invoice[];
  caption: string;
  onRowClick?: (invoice: Invoice) => void; // 👈 새 props 추가!
}

const WdogTable = ({ 
  columns, 
  invoices, 
  caption, 
  onRowClick }: WdogTableProps) => {
  if (columns.length === 0) {
    return <div>Loading...</div>;
  }
  let totalAmount = 0;
  let totalQty = 0;
  columns.map((column) => {
      switch (column.summary) {
        case 'max':
          column.aggregate = invoices.reduce((max, invoice) => {
            const value = invoice[column.id as keyof typeof invoice] as number;
            return value > max ? value : max;
          }, Number.MIN_VALUE);
          break;
        case 'min':
          column.aggregate = invoices.reduce((min, invoice) => {
            const value = invoice[column.id as keyof typeof invoice] as number;
            return value < min ? value : min;
          }, Number.MAX_VALUE);  
          break;
        case 'avg':
          column.aggregate = invoices.reduce((sum, invoice) => {
            const value = invoice[column.id as keyof typeof invoice] as number;
            return sum + value;
          }, 0) / invoices.length;
          break;
        case 'sum':
          column.aggregate = invoices.reduce((sum, invoice) => {
            const value = invoice[column.id as keyof typeof invoice] as number;
            return sum + value;
          }, 0);
          switch(column.id){
            case 'amount':
              totalAmount = column.aggregate;
              break;
            case 'qty':
              totalQty = column.aggregate;
              break;
            default:
              break;  
          }
          break;
        default:
          break;
      }
    });
  columns.map((column) => {
    if (column.id == "price" && totalQty > 0) {
      column.aggregate = totalAmount / totalQty;
    }
  });

  return (
    <div>
      <Table>
        <TableCaption>{caption}</TableCaption>
        <TableHeader className="bg-secondary text-primary-foreground">
          <TableRow>
            {columns.map((column) => {
              let classAdjust = "";
              switch (column.type) {
                case 'qty':
                case 'prc':
                case 'amt':
                  classAdjust = "text-right"
                  break
                case 'dat':
                case 'tim':
                  classAdjust = "text-center"
                  break
                default:
                  classAdjust = "text-left"
                  break;       
              }              
              return (
                <TableHead key={column.id} className={classAdjust} style={{ width: column.width }}>{column.title }</TableHead>      
              )          
            })}     
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id} onClick={() => onRowClick?.(invoice)} className="cursor-pointer hover:bg-secondary/50">
              {columns.map((column) => {
                let classAdjust = "";
                let fmtValue = ""
                let listValue= "";
                switch (column.type) { 
                  case 'key':
                    classAdjust = "font-medium"
                    break
                  case 'qty':
                    classAdjust = "text-right"
                    fmtValue = formatNumber(invoice[column.id as keyof typeof invoice] as number)
                    break
                  case 'prc':
                    classAdjust = "text-right"
                    fmtValue = formatPrice(invoice[column.id as keyof typeof invoice] as number)
                    break
                  case 'amt':
                    classAdjust = "text-right"
                    fmtValue = formatCurrency(invoice[column.id as keyof typeof invoice] as number)
                    break
                  case 'dat':
                    classAdjust = "text-center"
                    fmtValue = formatDate(invoice[column.id as keyof typeof invoice] as number)
                    break
                  case 'tim':
                    classAdjust = "text-center"
                    fmtValue = formatTime(invoice[column.id as keyof typeof invoice] as number)
                    break
                  case 'lst':
                    classAdjust = ""
                    listValue = String(invoice[column.id + '_color' as keyof typeof invoice]);
                    // switch(listValue){
                    //   case '1':
                    //     listValue = "bg-[#9AD914] rounded px-2 py-1";
                    //     break;
                    //   case '2':
                    //     listValue = "bg-[#F2E416] rounded px-2 py-1";
                    //     break;
                    //   case '3':
                    //     listValue = "bg-[#F2B749] rounded px-2 py-1";
                    //     break;
                    //   case '4':
                    //     listValue = "bg-[#F26938] rounded px-2 py-1";
                    //     break;
                    //   default:
                    //     listValue = "bg-[#D93A2B] rounded px-2 py-1";
                    //     break;
                    // }
                    switch(listValue){
                      case '1':
                        listValue = "bg-chart-2 rounded px-2 py-1";
                        break;
                      case '2':
                        listValue = "bg-chart-3 rounded px-2 py-1";
                        break;
                      case '3':
                        listValue = "bg-chart-4 rounded px-2 py-1";
                        break;
                      case '4':
                        listValue = "bg-chart-5 rounded px-2 py-1";
                        break;
                      default:
                        listValue = "bg-chart-1 rounded px-2 py-1";
                        break;
                    }                    
                    break;  
                  default:
                    classAdjust = "text-left"
                    break;                           
                }  
                const cellValue = fmtValue || String(invoice[column.id as keyof typeof invoice]);
                return <TableCell key={column.id} className={classAdjust}><span className={listValue ? listValue : ""}>{cellValue}</span></TableCell>
              })}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            {columns.map((column) => {
              let classAdjust = "";
              let fmtValue = ""              
              switch (column.type) {
                case 'key':
                  fmtValue = "합계";
                  break
                case 'qty':
                  classAdjust = "text-right"
                  fmtValue = formatNumber(column.aggregate as number);
                  break
                case 'prc':
                  classAdjust = "text-right"
                  fmtValue = formatPrice(column.aggregate as number);
                  break
                case 'amt':
                  classAdjust = "text-right"
                  fmtValue = formatCurrency(column.aggregate as number);
                  break
                case 'dat':
                case 'tim':
                  classAdjust = "text-center"
                  fmtValue = "";                  
                  break
                default:
                  classAdjust = "text-left"
                  fmtValue = "";
                  break;                  
              }          
              return (
                <TableCell key={column.id} className={classAdjust}>{fmtValue}</TableCell>      
              )          
            })}              
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default WdogTable;