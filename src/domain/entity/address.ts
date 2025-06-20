export default class Address {
    
    _street: string = "";
    _number: number = 0;
    _zip: string = "";
    _city: string = "";

    constructor(street: string, number: number, zip: string, city: string) {
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;

        this.validate();
    }

    get street(){
        return this._street
    }

    get city(){
        return this._city
    }

    get number(){
        return this._number
    }

    get zip(){
        return this._zip
    }

    validate(){
        if(this._street.length === 0) {
            throw new Error("street is required");
        }
        if(this._number === 0){
            throw new Error("number is required")
        }
        if(this._zip.length === 0){
            throw new Error("Zip is required")
        }
        if(this._city.length === 0){
            throw new Error("City is required")
        }
      
    }

}
//se for ver esse objeto de valor não permite alterar nenhum valor, apenas criando outro para mudar os dados de uma pessoa X