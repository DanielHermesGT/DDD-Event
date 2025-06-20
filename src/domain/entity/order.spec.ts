import Order from "./order"
import OrderItem from "./order_item";

describe("Order unit tests", () => {


    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrow("Id is required")
    })

    it("should throw error when customerId is empty", () => {
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrow("Customer id is required")
    })

    it("should throw error when items list is empty", () => {
        expect(() => {
            let order = new Order("123", "23", []);
        }).toThrow("Items are required")
    })



    it("should calculate total", () => {

        const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
        const item2 = new OrderItem("i2", "Item 2", 200, "p3", 3);
        const order = new Order("o1", "c1", [item, item2])

        const total = order.total();

        expect(total).toBe(800)
    })

    it("Should throw error if the item qte is less or equal 0", () => {

        expect(() => {

            const item = new OrderItem("i1", "Item 1", 100, "p1", 0);
            const order = new Order("o1", "c1", [item])


        }).toThrow("Quantity must be greater than 0");
    })






})

//criando um "scopo" de testes, uma separação