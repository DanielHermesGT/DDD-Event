import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import OrderItemModel from "./order-item.model";

@Table({
    tableName: "orders",
    timestamps: false,
})

export default class OrderModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => CustomerModel)
    @Column({ allowNull: false })
    declare customer_id: string;
    //faz uma relação do customer id para o id do customermodel. porem entender que ele vai retornar só o id do customer e não todos os dados

    //para retortnar todos os dados fazemos assim
    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel


    // @HasMany(() => OrderItemModel)
    // declare items: OrderItemModel[];
    //removido por erro de importação circular

    @HasMany(() => OrderItemModel, { as: "items", foreignKey: "order_id" })
  declare items: OrderItemModel[];
  
    //Temos no order item que ele pertece a uma order
    //temos na order que ele tem muitos itens

    @Column({ allowNull: false })
    declare total: number

}