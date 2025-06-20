import EventInterface from "./event.interface";

export default interface EventHandlerInterface<T extends EventInterface=EventInterface>{
                                            //Pode receber um evento de qualquer tipo, mas que deve implementar a EventInterface
    handle(event: T): void
}