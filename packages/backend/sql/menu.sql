REM Copyright : Copyright (c) 2026 by White Dog
REM Author : 109 
REM History : 2026-02-03 - 최초 작성 
REM Remark : oracle 용 SQL
REM
SET TERMOUT OFF
SET ECHO OFF

REM ===============================================================================================================
REM = 상세메뉴
REM ===============================================================================================================
DROP TABLE NAV_SUB_ITEM;
CREATE TABLE NAV_SUB_ITEM
(
    NAV_ITEM_ID VARCHAR2(5) NOT NULL, 
    ID VARCHAR2(4) NOT NULL,
	TITLE NVARCHAR2(14) NOT NULL,
    HREF NVARCHAR2(256) NOT NULL,
	DESCRIPTION NVARCHAR2(1024), 
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
    'M003', '0003', '인구통계','/dashboard/population', '유동인구 데이터를 차트형태로 제공합니다.'
);
INSERT INTO NAV_SUB_ITEM VALUES
(
    'M004', '0001', '서비스소개','/guide/intro', '메뉴의 기능을 설명합니다.'
);
INSERT INTO NAV_SUB_ITEM VALUES
(
    'M004', '0002', '공지사항','/guide/board', '공지사항 게시판을 제공합니다.'
);

REM ===============================================================================================================
REM = 메뉴
REM ===============================================================================================================
DROP TABLE NAV_ITEM;
CREATE TABLE NAV_ITEM
(
    ID VARCHAR2(5) NOT NULL,
	TITLE NVARCHAR2(14) NOT NULL,
    IMG NVARCHAR2(256) NOT NULL,
	DESCRIPTION NVARCHAR2(1024) NOT NULL, 
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

REM ===============================================================================================================
REM # 코드 삭제 
REM ===============================================================================================================
DROP TABLE MINOR_DESC
DROP TABLE CODE_DESC 
REM ===============================================================================================================
REM # 코드 정의서
REM ===============================================================================================================
CREATE TABLE CODE_DESC
(
    ID VARCHAR2(10) NOT NULL,
    NAME NVARCHAR2(100) NOT NULL,
    CONSTRAINT CODE_DESC_PK PRIMARY KEY (ID) 
);
INSERT INTO CODE_DESC VALUES ('C0001', 'Payment Status');
INSERT INTO CODE_DESC VALUES ('C0002', 'Payment Method');

CREATE TABLE MINOR_DESC
(
    CODE_ID VARCHAR2(10) NOT NULL,
    ID VARCHAR2(10) NOT NULL,
    NAME NVARCHAR2(100) NOT NULL,
    ORD NUMBER(4) NOT NULL,    
    CONSTRAINT MINOR_DESC_PK PRIMARY KEY (CODE_ID, ID),
    CONSTRAINT MINOR_DESC_CODE_DESC_FK FOREIGN KEY (CODE_ID) REFERENCES CODE_DESC(ID)
);
INSERT INTO MINOR_DESC VALUES ('C0001', 'PY', '정산', 1);
INSERT INTO MINOR_DESC VALUES ('C0001', 'PD', '진행중', 2);

INSERT INTO MINOR_DESC VALUES ('C0002', 'CD', '신용카드', 1);
INSERT INTO MINOR_DESC VALUES ('C0002', 'CH', '현금', 2);
INSERT INTO MINOR_DESC VALUES ('C0002', 'KP', '카카오페이', 3);

SELECT  *
FROM    CODE_DESC; 
SELECT  *
FROM    MINOR_DESC; 

REM ===============================================================================================================
REM # 테이블 칼럼 명세서
REM ===============================================================================================================
DROP TABLE COLUMN_DESC;
CREATE TABLE COLUMN_DESC
(
    TABLE_NAME VARCHAR2(10) NOT NULL,
    SEQ NUMBER(10) NOT NULL,
    ORD NUMBER(2) NOT NULL,
    ID VARCHAR2(20) NOT NULL,
    TITLE NVARCHAR2(50) NOT NULL,
    TYPE VARCHAR2(20) NOT NULL,
    WIDTH NUMBER(10),
    SUMMARY VARCHAR2(100),
    CONSTRAINT COLUMN_DESC_PK PRIMARY KEY (TABLE_NAME, SEQ)  -- 복합키
);

INSERT INTO COLUMN_DESC VALUES ('INVOICE', 1, 1, 'id', '매출번호', 'key', 80, null);
INSERT INTO COLUMN_DESC VALUES ('INVOICE', 2, 2, 'inv_dt', '매출일', 'dat', 100, null);
INSERT INTO COLUMN_DESC VALUES ('INVOICE', 3, 3, 'seller_id', '매출처', 'str', 100, null);
INSERT INTO COLUMN_DESC VALUES ('INVOICE', 4, 4, 'seller_name', '매출처명', 'str', 300, null);
INSERT INTO COLUMN_DESC VALUES ('INVOICE', 5, 5, 'area_name', '지역', 'str', 100, null);
INSERT INTO COLUMN_DESC VALUES ('INVOICE', 6, 6, 'payment_status', '지급상태', 'lst', 100, null);
INSERT INTO COLUMN_DESC VALUES ('INVOICE', 7, 7, 'payment_method', '결제방법  ', 'lst', 100, null);     
INSERT INTO COLUMN_DESC VALUES ('INVOICE', 8, 8, 'qty', '수량', 'qty', 100, 'sum');
INSERT INTO COLUMN_DESC VALUES ('INVOICE', 9, 9, 'price', '단가', 'prc', 100, 'avg');
INSERT INTO COLUMN_DESC VALUES ('INVOICE', 10, 10, 'amount', '금액', 'amt', 100, 'sum');  

SELECT *
FROM   COLUMN_DESC
WHERE  TABLE_NAME = 'INVOICE';

REM ===============================================================================================================
REM # 종속테이블 삭제
REM ===============================================================================================================
DROP TABLE INVOICE;
DROP TABLE CUSTOMER;
DROP TABLE SELLER;
DROP TABLE INDUSTRY;
DROP TABLE AREA_DESC;
DROP TABLE AREA;

REM ===============================================================================================================
REM # 지역
REM ===============================================================================================================
CREATE TABLE AREA
(
    ID VARCHAR2(10) NOT NULL,
    NAME NVARCHAR2(10) NOT NULL,
    CONSTRAINT AREA_PK PRIMARY KEY (ID)  
);

INSERT INTO AREA VALUES ('AR001', '신대');
INSERT INTO AREA VALUES ('AR002', '연향동'); 
INSERT INTO AREA VALUES ('AR003', '중앙동');

SELECT  *
FROM    AREA;
REM ===============================================================================================================
REM # 지역정의  
REM ===============================================================================================================
CREATE TABLE AREA_DESC
(
    ID VARCHAR2(10) NOT NULL,
    AREA_ID VARCHAR2(10) NOT NULL,
    ZIPCODE VARCHAR2(10) NOT NULL,
    CONSTRAINT AREA_DESC_PK PRIMARY KEY (ID),
    CONSTRAINT AREA_DESC_AREA_FK FOREIGN KEY (AREA_ID) REFERENCES AREA(ID)
);

INSERT INTO AREA_DESC VALUES ('A0001', 'AR001', '58007');
INSERT INTO AREA_DESC VALUES ('A0002', 'AR001', '58008');
INSERT INTO AREA_DESC VALUES ('A0003', 'AR001', '58009');
INSERT INTO AREA_DESC VALUES ('A0004', 'AR002', '57990');
INSERT INTO AREA_DESC VALUES ('A0005', 'AR003', '57923');

SELECT  *
FROM    AREA_DESC;

REM ===============================================================================================================
REM # 업종 정의  
REM ===============================================================================================================
CREATE TABLE INDUSTRY 
(
    ID VARCHAR2(10) NOT NULL,
    NAME NVARCHAR2(40) NOT NULL,
    CONSTRAINT INDUSTRY_PK PRIMARY KEY (ID)
);

INSERT INTO INDUSTRY VALUES ('I0001', '한식');
INSERT INTO INDUSTRY VALUES ('I0002', '편의점');
INSERT INTO INDUSTRY VALUES ('I0003', '커피');

SELECT  *
FROM    INDUSTRY;

REM ===============================================================================================================
REM # 고객
REM ===============================================================================================================
CREATE TABLE CUSTOMER
(
    ID VARCHAR2(10) NOT NULL,
    NAME NVARCHAR2(10) NOT NULL,
    AREA_DESC_ID VARCHAR2(10) NOT NULL,
    CONSTRAINT CUSTOMER_PK PRIMARY KEY (ID),  -- 복합키
    CONSTRAINT CUSTOMER_AREA_FK FOREIGN KEY (AREA_DESC_ID) REFERENCES AREA_DESC(ID)
);

INSERT INTO CUSTOMER VALUES ('C0001', '홍길동', 'A0001');
INSERT INTO CUSTOMER VALUES ('C0002', '김철수', 'A0002'); 
INSERT INTO CUSTOMER VALUES ('C0003', '이영희', 'A0003');
INSERT INTO CUSTOMER VALUES ('C0004', '박민수', 'A0004');
INSERT INTO CUSTOMER VALUES ('C0005', '김말자', 'A0005');

SELECT *
FROM   CUSTOMER;
REM ===============================================================================================================
REM # 판매처
REM ===============================================================================================================
CREATE TABLE SELLER 
(
    ID VARCHAR2(10) NOT NULL,
    NAME NVARCHAR2(50) NOT NULL,
    AREA_DESC_ID VARCHAR2(10) NOT NULL,
    INDUSTRY_ID VARCHAR2(10) NOT NULL, 
    CONSTRAINT SELLER_PK PRIMARY KEY (ID),  -- 복합키
    CONSTRAINT SELLER_AREA_DESC_FK FOREIGN KEY (AREA_DESC_ID) REFERENCES AREA_DESC(ID),
    CONSTRAINT SELLER_INDUSTRY_FK FOREIGN KEY (INDUSTRY_ID) REFERENCES INDUSTRY(ID)
);

INSERT INTO SELLER VALUES ('S0001', '신포우리만두 순천신대점', 'A0001', 'I0001'); 
INSERT INTO SELLER VALUES ('S0002', '등촌샤브칼국수 순천점', 'A0001', 'I0001');
INSERT INTO SELLER VALUES ('S0003', 'CU 순천신대센터점', 'A0001', 'I0002');
INSERT INTO SELLER VALUES ('S0004', '이마트24 R순천신대중흥점', 'A0001', 'I0002');
INSERT INTO SELLER VALUES ('S0005', 'GS25 신대메가타운점', 'A0001', 'I0002');
INSERT INTO SELLER VALUES ('S0006', '청자다방 신대지구점', 'A0001', 'I0003');
INSERT INTO SELLER VALUES ('S0007', '이디야커피 순천신대점', 'A0001', 'I0003');
INSERT INTO SELLER VALUES ('S0008', '빽다방 순천신대1호점', 'A0001', 'I0003');
INSERT INTO SELLER VALUES ('S0009', '메가MGC커피 순천신대점', 'A0001', 'I0003');

INSERT INTO SELLER VALUES ('S0010', '신포우리만두 순천연향점', 'A0004', 'I0001');
INSERT INTO SELLER VALUES ('S0011', '명지원숯불갈비', 'A0004', 'I0001');
INSERT INTO SELLER VALUES ('S0012', 'GS25 순천프레시점', 'A0004', 'I0002');
INSERT INTO SELLER VALUES ('S0013', 'GS25 순천연향부영점', 'A0004', 'I0002');
INSERT INTO SELLER VALUES ('S0014', 'GS25 금당중앙점', 'A0004', 'I0002');
INSERT INTO SELLER VALUES ('S0015', 'CU 순천세무서점', 'A0004', 'I0002');
INSERT INTO SELLER VALUES ('S0016', '컴포즈커피 순천연향점', 'A0004', 'I0003');
INSERT INTO SELLER VALUES ('S0017', '카페인중독 순천연향점', 'A0004', 'I0003');
INSERT INTO SELLER VALUES ('S0018', '토프레소 순천연향점', 'A0004', 'I0003');

INSERT INTO SELLER VALUES ('S0019', '라화쿵부마라탕 중앙점', 'A0005', 'I0001');
INSERT INTO SELLER VALUES ('S0020', '로타리국수 ', 'A0005', 'I0001');
INSERT INTO SELLER VALUES ('S0021', '스시마루', 'A0005', 'I0001');
INSERT INTO SELLER VALUES ('S0022', '두끼떡볶이 순천중앙점', 'A0005', 'I0001');
INSERT INTO SELLER VALUES ('S0023', '메가MGC커피 순천중앙점', 'A0005', 'I0003');
INSERT INTO SELLER VALUES ('S0024', '청자다방 중앙점', 'A0005', 'I0003');
INSERT INTO SELLER VALUES ('S0025', '아마스빈 순천중앙점', 'A0005', 'I0003');
INSERT INTO SELLER VALUES ('S0026', 'GS25 순천교차로점', 'A0005', 'I0002');

SELECT *
FROM   SELLER;
REM ===============================================================================================================
REM # 매출 데이터  
REM ===============================================================================================================
CREATE TABLE INVOICE
(
    ID VARCHAR2(10) NOT NULL,
    INV_DT DATE DEFAULT SYSDATE,
    SELLER_ID VARCHAR2(10) NOT NULL,
    CUST_ID VARCHAR2(10) NOT NULL,
    PAYMENT_STATUS NVARCHAR2(10) NOT NULL,
    PAYMENT_METHOD NVARCHAR2(10) NOT NULL,
    QTY NUMBER(10) NOT NULL,
    PRICE NUMBER(10,2) NOT NULL,
    AMOUNT NUMBER(10,2) NOT NULL,   
    CONSTRAINT INVOICE_PK PRIMARY KEY (ID),  
    CONSTRAINT INVOICE_SELLER_FK FOREIGN KEY (SELLER_ID) REFERENCES SELLER(ID),
    CONSTRAINT INVOICE_CUSTOMER_FK FOREIGN KEY (CUST_ID) REFERENCES CUSTOMER(ID)
);

INSERT INTO INVOICE VALUES ('INV001', '2026-01-01', 'S0001', 'C0001', 'PY', 'CD', 10, 25.00, 250.00);
INSERT INTO INVOICE VALUES ('INV002', '2026-01-11', 'S0026', 'C0002', 'PY', 'CH', 5, 30.00, 150.00);
INSERT INTO INVOICE VALUES ('INV003', '2026-01-21', 'S0004', 'C0003', 'PY', 'KP', 7, 50.00, 350.00);   
INSERT INTO INVOICE VALUES ('INV004', '2026-01-25', 'S0006', 'C0004', 'PY', 'CD', 29, 50.00, 1450.00);
INSERT INTO INVOICE VALUES ('INV005', '2026-02-01', 'S0010', 'C0005', 'PY', 'CH', 11, 50.20, 552.20);
INSERT INTO INVOICE VALUES ('INV006', '2026-02-10', 'S0015', 'C0001', 'PY', 'KP', 4, 50.05, 200.20);
INSERT INTO INVOICE VALUES ('INV007', '2026-02-12', 'S0016', 'C0002', 'PD', 'CD',6, 50.00, 300.00);
INSERT INTO INVOICE VALUES ('INV008', '2026-03-01', 'S0021', 'C0001', 'PD', 'CD', 10, 25.00, 250.00);
INSERT INTO INVOICE VALUES ('INV009', '2026-03-11', 'S0023', 'C0002', 'PD', 'CD', 5, 30.00, 150.00);
INSERT INTO INVOICE VALUES ('INV010', '2026-03-21', 'S0026', 'C0003', 'PY', 'CH', 7, 50.00, 350.00);   
INSERT INTO INVOICE VALUES ('INV011', '2026-03-25', 'S0019', 'C0004', 'PD', 'CD', 29, 50.00, 1450.00);

SELECT  A.id,
        A.inv_dt,
        A.seller_id,
        B.name seller_name,
        D.name area_name,
        ZA.name payment_status,
        ZB.name payment_method,
        ZA.ord payment_status_color,
        ZB.ord payment_method_color,
        A.qty,
        A.price,
        A.amount
FROM    invoice A
JOIN    seller B ON B.id = A.seller_id
JOIN    area_desc C ON C.id = B.area_desc_id
JOIN    area D ON D.id = C.area_id
LEFT JOIN minor_desc ZA on ZA.code_id = 'C0001' AND ZA.id = A.payment_status
LEFT JOIN minor_desc ZB on ZB.code_id = 'C0002' AND ZB.id = A.payment_method

;

COMMIT;

SET TERMOUT ON
SET ECHO ON
