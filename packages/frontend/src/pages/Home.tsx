import WdogImage from '@/components/WdogImage'

export default function Home() {
  const wdogImage = {
    src : "market.jpg",
    title : "상권분석",
    titleSize : "3xl",
    description : "예비 창업자의 성공적인 창업을 위해 빅데이터 기반의 분석 서비스를 제공합니다."
  }
  const wdogImageFunc1 = {
    src : "map.svg",
    title : "위치분석",
    titleSize : "xs",
    description : "이게 적용되는지 확인한다."
  }  
  const wdogImageFunc2 = {
    src : "industry.png",
    title : "업종추천",
    titleSize : "xs",
    description : ""
  }  

  return (
    <div className="flex gap-4">
      {/*<img src="market.jpg" class="w-[800px] h-[600px] object-cover rounded-xl shadow-lg" ></img>*/}
      <WdogImage wdogImage={wdogImage}/>
      <div className="bg-white max-w-2xl mx-auto p-8 rounded-3xl shadow-xl border">
        {/* 헤더 */}
        <div className=" border-gray-200 flex items-center gap-3 mb-6 pb-6 border-b">
          <div className="text-ocean-400 font-bold text-3xl mb-1">빅데이터 상권분석</div>
          <div className="text-gray-700 font-semibold">소상공인의 성공 창업을 위한 데이터 파트너</div>
        </div>
    
        {/* 본문 */}
        <div className="text-gray-700 space-y-4 leading-relaxed">
          <p className="text-lg">
            소상공인 여러분! <span className="text-ocean-300 font-bold">매출 데이터, 인구 통계, 경쟁업체 분석, 
            소비 트렌드</span> 등 방대한 빅데이터를 실시간으로 분석하여 
            <span className="text-ocean-300 font-bold"> 최적의 창업 위치와 업종</span>을 추천드립니다.
          </p>
          
          {/* 기능 하이라이트 */}
          <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="flex items-start gap-3 p-3 bg-white rounded-xl">
              <div className="w-[100px]">
                <WdogImage wdogImage={wdogImageFunc1} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">위치 분석</h4>
                <p className="text-gray-600 text-sm">지역별 매출 잠재력 예측</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-white rounded-xl">
              <div className="w-[100px]">
                <WdogImage wdogImage={wdogImageFunc2} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">업종 추천</h4>
                <p className="text-gray-600 text-sm">성공 가능성 높은 업종 제안</p>
              </div>
            </div>
          </div>
        
          {/* 마무리 문구 */}
          <p className="text-center pt-6">
            <span className="font-bold text-2xl text-gray-900 block mb-2">성공 창업의 첫걸음,</span>
            <span className="font-bold text-lg">빅데이터 상권분석으로 시작하세요!</span>
          </p>
      </div>
      </div>
    </div>
  );
}