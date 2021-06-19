-- CREATE THE SHOP DATABASE
CREATE SCHEMA `shop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CREATE THE USER TABLE
CREATE TABLE IF NOT EXISTS `shop`.`user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(50) NULL DEFAULT NULL,
  `middleName` VARCHAR(50) NULL DEFAULT NULL,
  `lastName` VARCHAR(50) NULL DEFAULT NULL,
  `email` VARCHAR(50) NULL,
  `mobile` VARCHAR(15) NULL,
  `passwordHash` VARCHAR(32) NOT NULL,
  `admin` TINYINT NOT NULL DEFAULT 0,
  `registeredAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `unq_mobile` (`mobile` ASC),
  UNIQUE INDEX `unq_email` (`email` ASC) );

  -- CREATE THE CATEGORIES TABLE
  CREATE TABLE IF NOT EXISTS `shop`.`categories` (
  id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  categoryName VARCHAR(255) NOT NULL
);
ALTER TABLE `shop`.`categories` 
ADD  UNIQUE INDEX `idx_category` (`categoryName` ASC);



-- CREATE THE PRODUCT TABLE
CREATE TABLE IF NOT EXISTS `shop`.`products` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `userId` BIGINT NOT NULL,
  `title` VARCHAR(75) NOT NULL,
  `summary` TINYTEXT NULL,
  `sku` VARCHAR(100) NOT NULL,
  `price` FLOAT NOT NULL DEFAULT 0,
  `quantity` INT NOT NULL DEFAULT 0,
   `categoryId` BIGINT NOT NULL,
  `createdAt`  DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME ON UPDATE CURRENT_TIMESTAMP,
  `expirationDate` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
 INDEX `idx_product_user` (`userId` ASC),
  
  CONSTRAINT `fk_product_user`
    FOREIGN KEY (`userId`)
    REFERENCES `shop`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,

  CONSTRAINT `fk_product_category`
    FOREIGN KEY (`categoryId`)
    REFERENCES `shop`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

    ALTER TABLE `shop`.`products` 
ADD  UNIQUE INDEX `idx_products_sku` (`sku` ASC);