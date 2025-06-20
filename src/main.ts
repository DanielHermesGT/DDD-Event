import Address from "./domain/entity/address";
import { Customer } from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

let customer = new Customer("123", "wesley");
const address = new Address("RUa dois", 2, "1223", "São Paulo");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "item1", 100, "p1" , 1)
const item2 = new OrderItem("2", "item2", 200, "p2", 2)

const order = new Order("1", "123", [item1, item2])
