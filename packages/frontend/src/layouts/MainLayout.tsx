// src/layouts/MainLayout.jsx
import WdogNavi from '@/components/WdogNavi'
import type { NavItem } from '@/components/WdogNavi';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  const navItems : NavItem[] = [
    {
      id : "M001",   
      title: "상권분석",
      img: "/market.jpg",
      description:
        `예비 창업자의 성공적인 창업을 위해 빅데이터 기반의 분석 서비스를 제공합니다.`,
      sub_menus: [
        {
          id : "M001-S001",   
          title: "간단분석",
          href: "/market/simple",
          description: `BigData를 이용하여 상권을 분석하여 간단하게 보여준다.`,
        },
        {
          id : "M001-S002",           
          title: "상세분석",
          href: "/market/detail",
          description: `BigData를 이용하여 상권을 분석하여 자세히 보여준다.`,
        },
      ]
    },
    {
      id : "M002",      
      title: "트랜드",
      img: "/trend.jpg",    
      description:
        `빅데이터 기반으로 핫플레이스, SNS 등 주요 트렌드 정보를 제공합니다.`,
      sub_menus: [
        {
          id : "M002-S001",            
          title: "핫플레이스 분석",
          href: "/trends/hotplace",
          description: `공단에서 정의하는 6개 상권에 대한 정보를 지역별로 제공해 앞서가는 마케팅 전략을 수립할 수 있도록 합니다.`,
        },
        {
          id : "M002-S002",            
          title: "SNS 분석",
          href: "/trends/sns",
          description: `주제어에 맞는 기간별 SNS분석 정보를 제공해 트렌드에 기반한 경영을 할 수 있도록 지원합니다.`,
        },
      ]    
    },
    {
      id : "M003",         
      title: "대시보드",
      img: "/dash.jpg",    
      description:
        `소상공인 주요 통계, 매출추이, 업소현황 등 통계 정보를 제공합니다.`,
      sub_menus: [
        {
          id : "M003-S001",            
          title: "주요통계",
          href: "/dashboard/summary",
          description: `업소, 매출, 인구, 주요지표 등 다양한 데이터를 기반으로 통계와 뉴스를 대시보드 형태로 제공합니다`,
        },
        {
          id : "M003-S002",            
          title: "매출통계",
          href: "/dashboard/sale",
          description: `매출 데이터를 기반으로 통계와 뉴스를 대시보드 형태로 제공합니다`,
        },
      ]         
    },
    {
      id : "M004",         
      title: "이용안내",
      img: "/guide.jpg",    
      description: `플랫폼 소개, 개방활용, 공지사항 등 내용을 안내해 드립니다.`,
      sub_menus: [
        {
          id : "M004-S001",          
          title: "서비스소개",
          href: "/guide/intro",
          description: `메뉴의 기능을 설명합니다.`,
        },
        {
          id : "M004-S002",          
          title: "공지사항",
          href: "/guide/board",
          description: `공지사항 게시판을 제공합니다.`,
        },
      ]  
    },
  ]  
  return (
    <div className=" bg-gray-50 flex flex-col w-screen min-h-screen ">  
      {/* Header */}
      <header className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-20 mx-auto bg-white shadow-sm border-b flex-shrink-0">  {/* ✅ flex-shrink-0 */}
        <nav className="flex justify-between items-center">
          <img src="/logo.svg" alt="Logo" className="h-10 w-auto hover:cursor-pointer" />
          <WdogNavi navItems={navItems} /> 
          <div className="w-[100px] space-x-4 hidden md:block pl-4">
            <a href="/" className="text-blue-600 hover:underline">로그인</a>
          </div>
        </nav>
      </header>
      
      {/* Main: 꽉차게 + 중앙 */}
      <main className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-20 mx-auto flex-1 py-8">  {/* ✅ flex-1 */}
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-20 mx-auto bg-gray-800 text-white py-6 flex-shrink-0">  {/* ✅ flex-shrink-0 */}
        <div className="text-center">
          Copyright © 2026 소상공인 356 
        </div>
      </footer>
    </div>
  );
}