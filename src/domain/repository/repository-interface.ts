export default interface RepositoryInterface<T> {

    create(entity: T): Promise<void>;
    update(entity: T): Promise<void>;
    find(id: string): Promise<T>;
    findAll(): Promise<T[]> //isso sempre retorna uma lista grande de entidades que buscamos
    //para ajudar podemos adicionar um objetinho "meta dados", que retorna outras informações, como o "count", "pagination", "offset"  
}

//T esta falando que qualquer classe de repository vai implementar essa classe vai ter que enviar ela mesma e retornar ela mesma ou void