import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import { Customer } from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";
import { setupAssociations } from "../db/sequelize/model/associate";

describe("Order Repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([
            CustomerModel,
            OrderModel,
            OrderItemModel,
            ProductModel,
        ]);
        setupAssociations()
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should create a new order", async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("123", "Customer 1")
        const address = new Address("Street 1", 1, "zipcode 1", "city 1")
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const productRepository = new ProductRepository();
        const product = new Product("123", "product 1", 10);

        await productRepository.create(product)

        const ordemItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        )

        const order = new Order("123", "123", [ordemItem])
        const orderRepository = new OrderRepository();
        await orderRepository.create(order)

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: [{ model: OrderItemModel, as: "items" }]

        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: ordemItem.id,
                    name: ordemItem.name,
                    quantity: ordemItem.quantity,
                    price: ordemItem.price,
                    order_id: "123",
                    product_id: "123"

                }
            ]
        })

    })

    it("Should update order", async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("123", "Customer 1")
        const address = new Address("Street 1", 1, "zipcode 1", "city 1")
        customer.changeAddress(address)
        await customerRepository.create(customer)


        const productRepository = new ProductRepository();
        const product = new Product("123", "product 1", 10);
        await productRepository.create(product)

        const ordemItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        )

        const order = new Order("123", "123", [ordemItem])
        const orderRepository = new OrderRepository();
        await orderRepository.create(order)


        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: [{ model: OrderItemModel, as: "items" }]

        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: ordemItem.id,
                    name: ordemItem.name,
                    quantity: ordemItem.quantity,
                    price: ordemItem.price,
                    order_id: "123",
                    product_id: "123"

                }
            ]
        })

        ordemItem.changeQuantity(5)

        order.changeItems([ordemItem])


        await orderRepository.update(order)

        const orderModel2 = await OrderModel.findOne({
            where: { id: order.id },
            include: [{ model: OrderItemModel, as: "items" }]
        })
        expect(orderModel2.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: ordemItem.id,
                    name: ordemItem.name,
                    quantity: ordemItem.quantity,
                    price: ordemItem.price,
                    order_id: "123",
                    product_id: "123"

                },
            ]
        })
    })

    it("Should find a order", async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("123", "Customer 1")
        const address = new Address("Street 1", 1, "zipcode 1", "city 1")
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const productRepository = new ProductRepository();
        const product = new Product("123", "product 1", 10);

        await productRepository.create(product)

        const ordemItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            3
        )


        const order = new Order("123", "123", [ordemItem])

        const orderRepository = new OrderRepository();

        await orderRepository.create(order)


        const orderResult = await orderRepository.find(order.id)

        const orderModel = await OrderModel.findOne({where: {id: "123"}, 
        include: [{model: OrderItemModel, as: "items"}]})
        const expected = {
            id: order.id,
            customer_id: order.customerID,
            total: order.total(),             
            items: [
                {
                    id: ordemItem.id,
                    name: ordemItem.name,
                    quantity: ordemItem.quantity,
                    price: ordemItem.price,
                    order_id: order.id,
                    product_id: ordemItem.productId
                }
            ]
        };
        expect(orderModel.toJSON()).toStrictEqual(expected);
        expect(orderModel.toJSON()).toStrictEqual(
            {
            id: orderResult.id,
            customer_id: orderResult.customerID,
            total: orderResult.total(),             
            items: [
                {
                    id: orderResult.items[0].id,
                    name: orderResult.items[0].name,
                    quantity: orderResult.items[0].quantity,
                    price: orderResult.items[0].price,
                    order_id: order.id,
                    product_id: orderResult.items[0].productId
                }
            ]
        }
        )
    })

    it("should find all orders", async ()=> {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("123", "Customer 1")
        const address = new Address("Street 1", 1, "zipcode 1", "city 1")
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const productRepository = new ProductRepository();
        const product = new Product("123", "product 1", 10);

        await productRepository.create(product)

        const ordemItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        )

        const order = new Order("123", "123", [ordemItem])
        const orderRepository = new OrderRepository();
        
        await orderRepository.create(order)

        const foundOrders = await orderRepository.findAll();
        const orders = [order]

        expect(orders).toEqual(foundOrders)
    })
})
