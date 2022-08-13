
export const queries = {
  getAllProducts : `
    SELECT * FROM product
  `,
  addNewProduct : `  
    INSERT INTO product (name, price) 
    VALUES (@name, @price)
  `,
  getProductById : `
    SELECT * FROM product WHERE Id = @Id
  `,
  deleteProduct : `
    DELETE FROM [webstore].[dbo].[product] WHERE Id = @Id
  `,
  getTotalProducts :`
    SELECT COUNT(*) FROM product
  `,
  updateProductById : `
    UPDATE product 
    SET name = @name, price = @price
    WHERE id = @id
  `
}