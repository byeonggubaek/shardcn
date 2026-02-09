REM Copyright : Copyright (c) 2026 by White Dog
REM Author : 109 
REM History : 2026-02-03 - 최초 작성 
REM Remark : oracle 용 SQL
REM
SET TERMOUT OFF
SET ECHO OFF

REM 이 필드는 NAV_ITEM 의 ID를 가리켜야 한다. 
DROP TABLE NAV_SUB_ITEM;
CREATE TABLE NAV_SUB_ITEM
(
    NAV_ITEM_ID VARCHAR2(5) NOT NULL, 
    ID VARCHAR2(4) NOT NULL,
	TITLE VARCHAR2(14) NOT NULL,
    HREF VARCHAR2(256) NOT NULL,
	DESCRIPTION VARCHAR2(1024), 
    CONSTRAINT NAV_SUB_ITEM_PK PRIMARY KEY (NAV_ITEM_ID, ID)  -- 복합키
);
INSERT INTO NAV_SUB_ITEM VALUES
(
    'M001', '0001', '간단분석','/market/simple', 'BigData를 이용하여 상권을 분석하여 간단하게 보여준다.'
);
INSERT INTO NAV_SUB_ITEM VALUES
(
    'M001', '0002', '상세분석','/market/detail', 'BigData를 이용하여 상권을 분석하여 자세히 보여준다.'
);
INSERT INTO NAV_SUB_ITEM VALUES
(
    'M002', '0001', '핫플레이스 분석','/trends/hotplace', '공단에서 정의하는 6개 상권에 대한 정보를 지역별로 제공해 앞서가는 마케팅 전략을 수립할 수 있도록 합니다.'
);
INSERT INTO NAV_SUB_ITEM VALUES
(
    'M002', '0002', 'SNS 분석','/trends/sns', '주제어에 맞는 기간별 SNS분석 정보를 제공해 트렌드에 기반한 경영을 할 수 있도록 지원합니다.'
);
INSERT INTO NAV_SUB_ITEM VALUES
(
    'M003', '0001', '주요통계','/dashboard/summary', '업소, 매출, 인구, 주요지표 등 다양한 데이터를 기반으로 통계와 뉴스를 대시보드 형태로 제공합니다.'
);
INSERT INTO NAV_SUB_ITEM VALUES
(
    'M003', '0002', '매출통계','/dashboard/sale', '매출 데이터를 기반으로 통계와 뉴스를 대시보드 형태로 제공합니다.'
);
INSERT INTO NAV_SUB_ITEM VALUES
(
    'M004', '0001', '서비스소개','/guide/intro', '메뉴의 기능을 설명합니다.'
);
INSERT INTO NAV_SUB_ITEM VALUES
(
    'M004', '0002', '공지사항','/guide/board', '공지사항 게시판을 제공합니다.'
);

DROP TABLE NAV_ITEM;
CREATE TABLE NAV_ITEM
(
    ID VARCHAR2(5) NOT NULL,
	TITLE VARCHAR2(14) NOT NULL,
    IMG VARCHAR2(256) NOT NULL,
	DESCRIPTION VARCHAR2(1024) NOT NULL, 
    CONSTRAINT NAV_ITEM_PK PRIMARY KEY (ID)  -- 복합키
);

INSERT INTO NAV_ITEM VALUES
(
    'M001', '상권분석', '/market.jpg','예비 창업자의 성공적인 창업을 위해 빅데이터 기반의 분석 서비스를 제공합니다.'
);
INSERT INTO NAV_ITEM VALUES
(
    'M002', '트랜드', '/trend.jpg','빅데이터 기반으로 핫플레이스, SNS 등 주요 트렌드 정보를 제공합니다.'
);
INSERT INTO NAV_ITEM VALUES
(
    'M003', '대시보드', '/dash.jpg','소상공인 주요 통계, 매출추이, 업소현황 등 통계 정보를 제공합니다.'
);
INSERT INTO NAV_ITEM VALUES
(
    'M004', '이용안내', '/guide.jpg','플랫폼 소개, 개방활용, 공지사항 등 내용을 안내해 드립니다.'
);

SELECT *
FROM   NAV_ITEM;

SELECT *
FROM   NAV_SUB_ITEM;

COMMIT;

SET TERMOUT ON
SET ECHO ON
