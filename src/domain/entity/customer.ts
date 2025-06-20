/*
essa classe representa um ENTIDADE para NEGOCIOS


e teremos outra classe representando ORM para BANCO 

teremos 2 entidades


um bom exemplo de arquitetura seria

domain
- Entity
    - Customer.ts (esse possui regra de negocio)

infra
- Entity / Model
    - customer.ts (esse possui get e setter)
*/

import Address from "./address";

export class Customer {
    //quando se trata de entidades, os dados devem sempre estar consistentes, por exemplo, nunca fazer um construtor que adicione apenas o id 
    //e depois vai adicionando com setters.
    //dados a todo momento devem estar consistentes
    // let customerErrado = new Customer("2") criar assim seria inconscistente
    //uma entidade por padrão SEMPRE deve se auto invalidar 
    private _id: string;
    private _name: string;
    private _address!: Address; //vamos adicionar Value Object aqui, ao inves de usar string, lembrar que o melhor é sempre interface
    private _active: boolean = true;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    //um exemplo de como implementar validação alem de direto no method seria

    get name(){
        return this._name;
    }

    get id(){
        return this._id
    }

    get Address() {
        return this._address
    }

    validate(){
        if(this._name.length === 0){
            throw new Error("Name is required")
        }
        if(this._id.length === 0){
            throw new Error("Id is required")
        }
    }

    get rewardPoints(): number {
        return this._rewardPoints
    }

    changeName(name: string){
        this._name = name
        //pode parecer a mesma coisa, mas na verdade aqui já temos uma função muito mais profunda e com regras de negocios
        //por exemplo, ser obrigatorio o nome todo
        this.validate()
    }

    changeAddress(address: Address){
        this._address = address
    }

    isActive(){
        return this._active
    }

    activate(){
        this._active = true
    }

    deactivate(){
        this._active = false
    }

    addRewardPoints(points: number){
        this._rewardPoints += points
    }

    set Address(address: Address){
        this._address = address;
    }
    //ao inves de se prender a setters e getters, temos uma regra separada para cada
}
