/* SQL 課程的範例資料庫：網路商店（客戶、商品、訂單）與公司（部門、員工）。
   每次執行範例都從這份資料重新建立，修改資料不會影響下一次執行。
   注意：題庫答案依此資料計算，修改資料後須重新驗證題庫。 */
self.SQL_SEEDS = {
  shop: `
PRAGMA foreign_keys = ON;
CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT,
  gender TEXT,
  birth_year INTEGER,
  joined DATE NOT NULL,
  level TEXT NOT NULL DEFAULT '一般'
);
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL CHECK (price >= 0),
  cost INTEGER NOT NULL
);
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  order_date DATE NOT NULL,
  status TEXT NOT NULL
);
CREATE TABLE order_items (
  order_id INTEGER NOT NULL REFERENCES orders(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  qty INTEGER NOT NULL CHECK (qty > 0),
  unit_price INTEGER NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  dept_id INTEGER REFERENCES departments(id),
  manager_id INTEGER REFERENCES employees(id),
  title TEXT NOT NULL,
  salary INTEGER NOT NULL,
  hire_date DATE NOT NULL
);
INSERT INTO customers VALUES
(1,'王小明','台北市','M',1990,'2023-01-15','金卡'),
(2,'李美華','新北市','F',1985,'2023-02-03','一般'),
(3,'張大偉','台中市','M',1978,'2023-03-22','金卡'),
(4,'陳怡如','台北市','F',1995,'2023-05-10','一般'),
(5,'林志豪','高雄市','M',1988,'2023-07-01','白金'),
(6,'黃淑惠','台南市','F',1992,'2023-08-19','一般'),
(7,'吳家豪','台中市','M',2000,'2023-11-05','一般'),
(8,'周雅琪',NULL,'F',1998,'2024-01-12','一般'),
(9,'許文彬','新北市','M',1982,'2024-02-28','金卡'),
(10,'鄭佩珊','台北市','F',1993,'2024-03-15','一般');
INSERT INTO products VALUES
(1,'無線滑鼠','3C周邊',590,300),
(2,'機械鍵盤','3C周邊',2490,1400),
(3,'27吋螢幕','3C周邊',6990,5000),
(4,'USB-C 集線器','3C周邊',890,450),
(5,'降噪耳機','影音',4990,3000),
(6,'藍牙喇叭','影音',1890,1000),
(7,'人體工學椅','辦公家具',8900,5500),
(8,'升降桌','辦公家具',12900,8000),
(9,'筆記本組','文具',199,80),
(10,'鋼筆','文具',1200,600);
INSERT INTO orders VALUES
(1,1,'2024-01-05','已完成'),
(2,2,'2024-01-12','已完成'),
(3,3,'2024-01-20','已完成'),
(4,1,'2024-02-02','已完成'),
(5,5,'2024-02-14','已完成'),
(6,4,'2024-02-25','已取消'),
(7,6,'2024-03-03','已完成'),
(8,3,'2024-03-15','已完成'),
(9,7,'2024-03-28','已完成'),
(10,5,'2024-04-02','已完成'),
(11,9,'2024-04-18','已完成'),
(12,2,'2024-04-30','已完成'),
(13,1,'2024-05-06','已完成'),
(14,8,'2024-05-20','處理中'),
(15,5,'2024-05-27','已完成'),
(16,4,'2024-06-03','已完成'),
(17,9,'2024-06-11','已取消'),
(18,3,'2024-06-22','處理中');
INSERT INTO order_items VALUES
(1,1,1,590),(1,9,3,199),
(2,5,1,4990),
(3,7,1,8900),(3,1,2,590),
(4,2,1,2490),
(5,8,1,12900),(5,4,1,890),
(6,6,1,1890),
(7,9,5,199),
(8,3,2,6990),
(9,1,1,590),(9,4,1,890),
(10,5,2,4990),
(11,2,1,2490),(11,1,1,590),
(12,6,2,1890),
(13,3,1,6990),
(14,9,2,199),
(15,7,2,8900),
(16,5,1,4990),(16,6,1,1890),
(17,8,1,12900),
(18,2,1,2490),(18,4,2,890);
INSERT INTO departments VALUES (1,'業務部'),(2,'行銷部'),(3,'資訊部'),(4,'財務部');
INSERT INTO employees VALUES
(1,'陳志明',1,NULL,'總經理',120000,'2015-03-01'),
(2,'林雅婷',1,1,'業務經理',85000,'2017-06-15'),
(3,'王建宏',1,2,'業務專員',52000,'2021-09-01'),
(4,'張淑芬',1,2,'業務專員',48000,'2023-02-20'),
(5,'李俊傑',2,1,'行銷經理',80000,'2018-01-10'),
(6,'黃美玲',2,5,'行銷專員',46000,'2022-07-01'),
(7,'吳宗翰',3,1,'資訊經理',95000,'2016-11-01'),
(8,'劉佳穎',3,7,'工程師',68000,'2020-04-15'),
(9,'蔡承恩',3,7,'工程師',62000,'2022-10-03'),
(10,'鄭怡君',NULL,1,'特別助理',55000,'2024-05-02');
`
};
