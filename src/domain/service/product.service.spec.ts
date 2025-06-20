import { Customer } from "../entity/customer"
import OrderItem from "../entity/order_item"
import Product from "../entity/product"
import OrderService from "./order.service"
import ProductService from "./product.service"


describe("Product service unit tests", ()=> {
  
        it("Should place an order", ()=> {
            const customer = new Customer("c1", "Customer 1");
            const item1 = new OrderItem("i1", "Item 1", 10, "p1", 1);

            const order = OrderService.placeOrder(customer, [item1]);

            expect(customer.rewardPoints).toBe(5)
            expect(order.total()).toBe(10)
        })
    
        it("Should change the prices of all products", ()=> {
            const product1 = new Product("1", "product 1", 10)
            const product2 = new Product("2", "product 2", 20)
            const products = [product1, product2]

            ProductService.increasePrice(products, 100);

            expect(product1.price).toBe(20);
            expect(product2.price).toBe(40);
        })

})