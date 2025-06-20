import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";

export function setupAssociations() {
  // OrderModel.hasMany(OrderItemModel, {
  //   sourceKey: "id",
  //   foreignKey: "order_id",
  //   as: "items",
  // });

  OrderItemModel.belongsTo(OrderModel, {
    targetKey: "id",
    foreignKey: "order_id",
    as: "order",
  });
}
