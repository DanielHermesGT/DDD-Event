import { json } from "sequelize";
import EventHandlerInterface from "../../@shared/event-handler.interface";
import EventInterface from "../../@shared/event.interface";

export default class CustomerChangeAddressHandler implements EventHandlerInterface {
    handle(event: EventInterface): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${JSON.stringify(event.eventData.endereco)}`);

    }
}