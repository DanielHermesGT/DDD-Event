//fazer entidades assim é uma forma de se prender ao ORM, orientdade ao banco de dados, mas não 
//podemos esquecer que ele tem atributos que muda, etc, e principalemnte regra de negocios

export class CustomerAnemico {

    _id: string;
    _name: string;
    _address: string;

    constructor(id: string, name: string, address: string) {
        this._id = id;
        this._name = name;
        this._address = address;
    }

    get id(): string {
        return this._id;
    }

    getName(): string {
        return this._name;
    }

    getAddress(): string{
        return this._address;
    }

    setName(name: string){
        this._name= name;
    }

    setAddress(address: string){
        this._address= address;
    }

}
/* 
entidade anemica, ele esta apenas guardando dados

*/