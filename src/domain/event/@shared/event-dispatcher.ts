import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
    
    private eventHandlers: { [eventName: string]: EventHandlerInterface[]} = {}

    get EventHandlers(): { [eventName: string]: EventHandlerInterface[] }{
        return this.eventHandlers
    }

    notify(event: EventInterface): void {

        const eventName = event.constructor.name;

        if(this.EventHandlers[eventName]){
            this.EventHandlers[eventName].forEach((eventHandle)=> {
                eventHandle.handle(event);
            })
        }
    }

    register(eventName: string, eventHandler: EventHandlerInterface): void {
        
        if(!this.eventHandlers[eventName]){
            this.EventHandlers[eventName] = []
        }
        this.eventHandlers[eventName].push(eventHandler)

    }

    unregister(eventName: string, eventHandler: EventHandlerInterface): void {
        
        if(this.eventHandlers[eventName]){
            const index = this.eventHandlers[eventName].indexOf(eventHandler)
            if(index !== -1){
                this.EventHandlers[eventName].splice(index, 1)
            }
        }
    }

    unregisterAll(): void {
        this.eventHandlers = {}
    }
}