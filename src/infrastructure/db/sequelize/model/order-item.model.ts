import {BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import ProductModel from "./product.model";
import OrderModel from "./order.model";

@Table({
    tableName: "order-items",
    timestamps: false,
})
export default class OrderItemModel extends Model{

   
       @PrimaryKey
       @Column({allowNull: false})
       declare id: string;
   
       @ForeignKey(() => ProductModel)
       @Column({allowNull: false})
       declare product_id: string;

       //pertence a 
       @BelongsTo(()=> ProductModel)
       declare product: ProductModel
   
        //pertence a 
       @ForeignKey(() => OrderModel)
       @Column
       declare order_id: string;

    //    @BelongsTo(()=> OrderModel)
    //    declare order: OrderModel
    //removido por erro de importação circular
    
       @Column({allowNull: false})
       declare quantity: number

       @Column({allowNull: false})
       declare name: string;

       @Column({allowNull: false})
       declare price: number
}