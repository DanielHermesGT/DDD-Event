import OrderItem from "./order_item";

export default class Order {

    private _id: string;
    private _customerId: string; //relação com outro agregado se usa ID
    private _items: OrderItem[]; //relação dos dois seres do mesmo agregado
    private _total: number;

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items
        this._total = this.total();
        this.validate()
    }

    get id() {
        return this._id
    }



    get customerID() {
        return this._customerId
    }

    get items() {
        return this._items
    }

    changeItems(items: OrderItem[]) {
        return this._items = items
    }
    validate(): boolean {
        if (this._id.length === 0) {
            throw new Error("Id is required")
        }
        if (this._customerId.length === 0) {
            throw new Error("Customer id is required")
        }
        if (this._items.length === 0) {
            throw new Error("Items are required")
        }

        if (this._items.some(item => item.quantity <= 0)) {
            throw new Error("Quantity must be greater than 0")
        }
        return true
    }

    
  total(): number {
    return this._items.reduce((acc, item) => acc + item.total(), 0);
  }
}



//um agregado é a relação entre duas partes/classes/estruturas do sistema

//um agregado customer -> [é o customer + o type address do atributo address, é o mesmo agregado, se baseaia no atributo]
//um agregado order -> [é a entidade order + a entidade itens], mas para ter order de um usuario, precisa de um customerId