import Product from "./product";

describe("Product unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(()=> {
            
            const product = new Product("", "product 1", 100);

        }).toThrow("Id is required")
    })
 
    it("should throw error when name is empty", () => {
        expect(()=> {
            
            const product = new Product("1", "", 100);

        }).toThrow("Name is required")
    })

    it("should throw error whem price is less than zero", () => {
        expect(()=> {
            const product = new Product("123", "Name", -1)
        }).toThrow("Price is required")
    })

    it("should change name", () => {
            const product = new Product("123", "produt 1", 100);
            product.changeName("Product 2");
            expect(product.name).toBe("Product 2")
    })

    it("should change price", ()=> {
        const product = new Product("123", "product 1", 100);
        product.changePrice(200);
        expect(product.price).toBe(200)
    })


})

//criando um "scopo" de testes, uma separação