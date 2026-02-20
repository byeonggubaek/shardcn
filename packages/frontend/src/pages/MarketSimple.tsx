
import type { ChartConfig } from "@/components/ui/chart";
import WdogChartBar from "@/components/WdogChartBar";
import WdogChartPie from "@/components/WdogChartPie";
import WdogChartLine from "@/components/WdogChartLine";

export default function MarketSimple() {
  const chartData = [
    { month: "1월", area_580: 186, area_540: 80, area_579: 120 },
    { month: "2월", area_580: 305, area_540: 200, area_579: 150 },
    { month: "3월", area_580: 250, area_540: 150, area_579: 400 },
  ];
  
  const chartData2 = chartData.map(({ month, ...rest }) => rest);

  const dynamicConfig = {
    area_580: { label: "신대", color: "var(--chart-1)" },
    area_540: { label: "연향동", color: "var(--chart-2)" },
    area_579: { label: "중앙동", color: "var(--chart-3)" }
  } satisfies ChartConfig;

  return (
    
    <div>
      <h1>상권분석 - 간단</h1>
      <div className="flex gap-4">
        <div>
          <WdogChartBar 
            chartData={chartData} 
            chartConfig={dynamicConfig}
            xAxisKey="month"
            title="지역별 월별 매출 추이"
            description="2024년 1~3월 : 단위 백만원"
          />
        </div>
        <div>
          <WdogChartPie 
            chartData={chartData2} 
            chartConfig={dynamicConfig}
            title="지역별 매출 추이"
            description="2024년 1~3월 : 단위 백만원"
            circle_detail="총 매출"            
          />
        </div>
        <div>
          <WdogChartLine 
            chartData={chartData} 
            chartConfig={dynamicConfig}
            xAxisKey="month"
            title="지역별 월 매출 추이"
            description="2024년 1~3월 : 단위 백만원"
          />
        </div>        
      </div>
    </div>
  );
}