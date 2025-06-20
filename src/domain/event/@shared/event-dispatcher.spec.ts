import CustomerRepository from "../../../infrastructure/repository/customer.repository";
import Address from "../../entity/address";
import { Customer } from "../../entity/customer";
import CustomerChangeAddressEvent from "../customer/customer-change-address.event";
import CustomerCreatedEvent from "../customer/customer-created.event";
import CustomerChangeAddressHandler from "../customer/handler/customer-address-change";
import CustomerCreatedHandler from "../customer/handler/customer-created";
import CustomerCreatedHandler2 from "../customer/handler/customer-created2";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain event test", () => {

    it("should register an event handler", ()=> {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.EventHandlers["ProductCreatedEvent"]).toBeDefined();
        
        expect(eventDispatcher.EventHandlers["ProductCreatedEvent"].length).toBe(1)
        expect(eventDispatcher.EventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)

    })

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.EventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)

        
        eventDispatcher.unregister("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.EventHandlers["ProductCreatedEvent"]).toBeDefined();
        
        expect(eventDispatcher.EventHandlers["ProductCreatedEvent"].length).toBe(0)
    })

    it("Should unregister all event handlers", ()=> {
        const eventDispatcher = new EventDispatcher()

        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.EventHandlers["ProductCreatedEvent"].length).toBe(1)

        eventDispatcher.unregisterAll()

        expect(eventDispatcher.EventHandlers["ProductCreatedEvent"]).toBeUndefined();
        
    
    })

    it("Should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        const spyEventHandler = jest.spyOn(eventHandler, "handle")
        //fica espiando se o eventHandle executa o metodo handle

        eventDispatcher.register("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.EventHandlers["ProductCreatedEvent"].length).toBe(1)

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "product 1 desc",
            price: 10
        })

        //quando o notify for chamado o sendEmailWhenProducsIsCreatedHandler deve ser chamado
        eventDispatcher.notify(productCreatedEvent)

        expect(spyEventHandler).toHaveBeenCalled();

    })

    it("Should notify a user when customer is created", ()=> {
        const eventDispatcher = new EventDispatcher()
        
        
        const eventHandler = new CustomerCreatedHandler()
        const eventHandler2 = new CustomerCreatedHandler2()

        const spyEventHandler = jest.spyOn(eventHandler, "handle")
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle")

        eventDispatcher.register("CustomerCreatedEvent", eventHandler)
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2)
        //lembrar que o nome deve ser o mesmo que o nome da classe para executar
        expect(eventDispatcher.EventHandlers["CustomerCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.EventHandlers["CustomerCreatedEvent"].length).toBe(2)

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "Customer 1"
        })

        //quando o notify for chamado o sendEmailWhenProducsIsCreatedHandler deve ser chamado
        eventDispatcher.notify(customerCreatedEvent)

        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    
    })



    it("Should notify when customer address change", ()=> {
        const eventDispatcher = new EventDispatcher()

        const eventHandler = new CustomerChangeAddressHandler()

        const customer = new Customer("123", "Customer 1")
        const address = new Address("Street 1", 1, "ZipCode", "city 1")
        customer.Address = address
        
        const spyEventHandler = jest.spyOn(eventHandler, "handle")

        const addressUpdt = new Address("Street 2", 1, "zipcode 2", "city 2")
        customer.changeAddress(addressUpdt)

        const customerChangeAddressEvent = new CustomerChangeAddressEvent({
            id: customer.id,
            name: customer.name,
            endereco: customer.Address
        })

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler)

        expect(eventDispatcher.EventHandlers["CustomerChangeAddressEvent"]).toBeDefined()
        expect(eventDispatcher.EventHandlers["CustomerChangeAddressEvent"].length).toBe(1)

        eventDispatcher.notify(customerChangeAddressEvent)

        expect(spyEventHandler).toHaveBeenCalled()

    })
})