import EventInterface from "../@shared/event.interface";

export default class ProductCreatedEvent implements EventInterface{
    dataTimeOccureed: Date;
    eventData: any;

    constructor(eventData: any){
       this.dataTimeOccureed = new Date();
       this.eventData = eventData 
    }
}

//evento em si, os dados e quando ocorre