import Product from "../../domain/entity/product";
import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";
import ProductModel from "../db/sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {

    async create(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id,
            name: product.name,
            price: product.price
        })
    }

    async find(id: string): Promise<Product> {
        const productModel = await ProductModel.findOne({where: {id: id}})

        return new Product(
            productModel.id, 
            productModel.name,
            productModel.price
        )
    }

    async findAll(): Promise<Product[]> {
       const productsModel = await ProductModel.findAll();
       return productsModel.map((productModel) => new Product(productModel.id, productModel.name, productModel.price))
    }

    async update(entity: Product): Promise<void> {

        await ProductModel.update(
            {
                name: entity.name,
                price: entity.price
            },
            {
                where: {id: entity.id}
            }
        )

    }
}