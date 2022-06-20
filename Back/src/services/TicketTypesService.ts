import { AppDataSource } from "../database/data-source";
import { Event } from "../entities/Event";
import { TicketTypes } from "../entities/TicketType";

type TicketTypesRequest = {
    id?: string;
    name: string;
    event_id: string;
    quantity: number;
    price: string;
}

export class TicketTypesService {
    async create({name, event_id, quantity, price}: TicketTypesRequest) : Promise<Error | TicketTypes>{
        const repo = AppDataSource.getRepository(TicketTypes);
        const repoEvent = AppDataSource.getRepository(Event);

        if(!await repoEvent.findOneBy({id: event_id})){
            return new Error("Event does not exist!");
        }

        const ticketType = repo.create({name, event_id, quantity, price});

        await repo.save(ticketType);

        return ticketType;
    }

    async getAllOfEvent(eventId: string){
        const repo = AppDataSource.getRepository(TicketTypes);

        console.log(eventId);

        const ticketType = await repo.findBy({event_id: eventId});

        return ticketType;
    }

    async get(id: string){
        const repo = AppDataSource.getRepository(TicketTypes);
 
        const ticketType = await repo.findOneBy({id});

        if(!ticketType){
            return new Error("Ticket does not exists!");
        };

        return ticketType;
    }

    async update({id, name, event_id, quantity, price}: TicketTypesRequest){
        const repo = AppDataSource.getRepository(TicketTypes);
        const repoEvent = AppDataSource.getRepository(Event);

        const ticketType = await repo.findOneBy({id});

        if(!ticketType){
            return new Error("This type of ticket does not exists!")
        }

        if(!await repoEvent.findOneBy({id: event_id})){
            return new Error("Event does not exists!");
        }

        ticketType.name = name ? name : ticketType.name;       
        ticketType.event_id = event_id ? event_id : ticketType.event_id;       
        ticketType.quantity = quantity ? quantity : ticketType.quantity;       
        ticketType.price = price ? price : ticketType.price;       

        await repo.save(ticketType);

        return ticketType;
    }

    async delete(id: string){
        const repo = AppDataSource.getRepository(TicketTypes);

        if(!await repo.findOneBy({id})){
            return new Error("Ticket Type does not exists!");
        }

        await repo.delete(id)

    }
}