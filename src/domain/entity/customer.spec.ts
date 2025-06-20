import Address from "./address";
import { Customer } from "./customer";

describe("Customer unit tests", () => {

    it("should get 1 as result", () => {
        const result = 1;
        expect(result).toBe(1)
    })

    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", " john");
        }).toThrow("Id is required")
    })

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("id", "");
        }).toThrow("Name is required")

    })

    it("Should change name", ()=>{
        
        //arrange
        const customer = new Customer("243", "john");

        // Act
        customer.changeName("Jane");

        // Assert
        expect(customer.name).toBe("Jane")
    })

    it("Should activate customer", ()=>{
        
        //arrange
        const customer = new Customer("1", "Customer 1");

        const address = new Address("strret 1", 123, "122222", "Sm");
        customer.Address = address
        // Act
        customer.activate()

        // Assert
        expect(customer.isActive()).toBe(true)
    })

    it("Should deactivate customer", ()=>{
        
        //arrange
        const customer = new Customer("1", "Customer 1");

        customer.deactivate();

        // Assert
        expect(customer.isActive()).toBe(false)
    })

    it("Should add reward points", () => {
        const customer = new Customer("1", "Customer 1")
        expect(customer.rewardPoints).toBe(0)
        
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10)

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20)

    })
})

//criando um "scopo" de testes, uma separação