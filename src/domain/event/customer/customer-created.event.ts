import EventInterface from "../@shared/event.interface";


export default class CustomerCreatedEvent implements EventInterface{
    dataTimeOccureed: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dataTimeOccureed = new Date()
        this.eventData = eventData
    }
}