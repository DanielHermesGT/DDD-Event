import Order from "../../domain/entity/order";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItem from "../../domain/entity/order_item";

export default class OrderRepository implements OrderRepositoryInterface {


    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerID,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity
            }))
        },
            {
                include: [{ model: OrderItemModel, as: "items" }]

            })
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update({
            customer_id: entity.customerID,
            total: entity.total(),
        }, {
            where: { id: entity.id }
        });

        for (const item of entity.items) {
            await OrderItemModel.update({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                product_id: item.productId,
            }, {
                where: { id: item.id }
            });
        }
    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({ where: { id: id }, include: [{ model: OrderItemModel, as: "items" }] })
        const items = orderModel.items.map((item) => new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity,
        ));

        const order = new Order(orderModel.id, orderModel.customer_id, items);
        order.total()
        return order
    }

    async findAll(): Promise<Order[]> {
        const ordersModel = await OrderModel.findAll({
            include: [{model: OrderItemModel, as: "items"}]
        });

        const orders = ordersModel.map((orderModel) => {
            const items = orderModel.items.map((item) => new OrderItem(
                item.id,
                item.name,
                item.price,
                item.product_id,
                item.quantity,
            ));

            let order = new Order(orderModel.id, orderModel.customer_id, items)
            return order
        })
        return orders
    }
}