--Use this table only for the Customer and Manager View Challenge

INSERT INTO bamazonDB.products VALUES (4123,"Playtex Diaper Genie Refills for Diaper Genie Diaper Pails- 270 Count","Baby",16.03,300);
INSERT INTO bamazonDB.products(product_name,department_name,price,stock_quantity) VALUES 
("WaterWipes Sensitive Baby Wipes, 9 Packs of 60 Count (540 Count)","Baby",28.73,3000),
("Bambo Nature Baby Diapers Classic, Size 4 (15-40 lbs), 180 Count (6 Packs of 30)","Baby",71.25,5000),
("Polo Ralph Lauren Men's Faxon Low Sneaker","Shoes",39.95,8000),
("Adidas Men's Seeley Skate Shoe","Shoes",60.22,4500),
("Under Armour Boys' Boys' Leadoff Low RM Jr.","Shoes",27.99,2000),
("Kstare Women Casual Long Sleeve Cotton Solid Loose Pockets T-Shirt Blouses Tops","Clothing",14.59,1000),
("Fashion Womens Plus Size V-Neck T-Shirt Trim Asymmetrical Pullover Patchwork Top","Clothing",8.99,50),
("Veranee Women's Sleeveless Swing Tunic Summer Floral Flare Tank Top","Clothing",15.25,250),
("Silk18 Natural Hair Conditioner Argan Oil Sulfate Free Treatment for Dry and Damaged Hair","Personal Care",10.40,4000),
("Moisturizing Shampoo for Dry & Damaged Hair with Lavender & Jojoba ","Personal Care",10.40,120),
("100% Pure Avocado Oil - Deep Tissue Moisturizer for Hair, Face & Skin","Personal Care",9.45,320),
("Witch Hazel Toner Alcohol Free Astringent with Aloe Vera and Lavender for Skin ","Personal Care",9.95,900);

--Use this table only for the Supervisor View
--For the Supervisor View product_sales column is added to products table

INSERT INTO bamazonDB.products VALUES (4123,"Playtex Diaper Genie Refills for Diaper Genie Diaper Pails- 270 Count","Baby",16.03,300,0.0);
INSERT INTO bamazonDB.products(product_name,department_name,price,stock_quantity) VALUES 
("WaterWipes Sensitive Baby Wipes, 9 Packs of 60 Count (540 Count)","Baby",28.73,3000),
("Bambo Nature Baby Diapers Classic, Size 4 (15-40 lbs), 180 Count (6 Packs of 30)","Baby",71.25,5000),
("Polo Ralph Lauren Men's Faxon Low Sneaker","Shoes",39.95,8000),
("Adidas Men's Seeley Skate Shoe","Shoes",60.22,4500),
("Under Armour Boys' Boys' Leadoff Low RM Jr.","Shoes",27.99,2000),
("Kstare Women Casual Long Sleeve Cotton Solid Loose Pockets T-Shirt Blouses Tops","Clothing",14.59,1000),
("Fashion Womens Plus Size V-Neck T-Shirt Trim Asymmetrical Pullover Patchwork Top","Clothing",8.99,50),
("Veranee Women's Sleeveless Swing Tunic Summer Floral Flare Tank Top","Clothing",15.25,250),
("Silk18 Natural Hair Conditioner Argan Oil Sulfate Free Treatment for Dry and Damaged Hair","Personal Care",10.40,4000),
("Moisturizing Shampoo for Dry & Damaged Hair with Lavender & Jojoba ","Personal Care",10.40,120),
("100% Pure Avocado Oil - Deep Tissue Moisturizer for Hair, Face & Skin","Personal Care",9.45,320),
("Witch Hazel Toner Alcohol Free Astringent with Aloe Vera and Lavender for Skin ","Personal Care",9.95,900);

-- Seed for departments table
-- Only the Supervisor View needs this table.

INSERT INTO bamazonDB.departments VALUES(6178,"Baby",6000);
INSERT INTO bamazonDB.departments(department_name,over_head_costs) VALUES("Shoes",2000),("Clothing",4000),("Personal Care",3500);
