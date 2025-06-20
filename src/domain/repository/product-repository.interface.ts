import Product from "../entity/product";
import RepositoryInterface from "./repository-interface";

export default interface ProductRepositoryInterface extends RepositoryInterface<Product>{ //interface extend interface, assim como classe extend classe, mesmo tipo extend

    
}