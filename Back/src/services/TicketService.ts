import { AppDataSource } from "../database/data-source";
import { Ticket } from "../entities/Ticket";
import { TicketTypes as ticketTypes } from "../entities/TicketType";
import { User as user } from "../entities/User";
type TicketRequest = {
    id?: string;
    name: string;
    user_id: string;
    ticket_type_id: string;
}

export class TicketService {
    async create({name, user_id, ticket_type_id}: TicketRequest) : Promise<Error | Ticket>{
        const repo = AppDataSource.getRepository(Ticket);
        const User = await AppDataSource.getRepository(user).findOneBy({id: user_id});
        const repoTicketType = AppDataSource.getRepository(ticketTypes);
        
        if(!User){
            return new Error("User does not exist")
        }
        
        if(!repoTicketType){
            return new Error("This type of ticket does not exist")
        }
        
        const ticketType = await repoTicketType.findOneBy({id: ticket_type_id});
        ticketType.quantity = ticketType.quantity - 1;
        await repoTicketType.save(ticketType);
        
        const ticket = repo.create({name, user_id, ticket_type_id});
        await repo.save(ticket);

        return ticket;
    }

    async getAll(){
        const repo = AppDataSource.getRepository(Ticket);

        const ticket = await repo.find();

        return ticket;
    }

    async get(id: string){
        const repo = AppDataSource.getRepository(Ticket);
 
        const ticket = await repo.findOneBy({id});

        if(!ticket){
            return new Error("Ticket does not exists!");
        };

        return ticket;
    }

    async update({id, name, user_id, ticket_type_id}){
        const repo = AppDataSource.getRepository(Ticket);
        const User = await AppDataSource.getRepository(user).findOneBy({id: user_id});
        const TicketType = AppDataSource.getRepository(ticketTypes).findOneBy({id: ticket_type_id});
        
        const ticket = await repo.findOneBy({id});

        if(!User){
            return new Error("User does not exist")
        }
        
        if(!TicketType){
            return new Error("This type of ticket does not exist")
        }
        
        ticket.name = name ? name : ticket.name;
        ticket.user_id = user_id ? user_id : ticket.user_id;
        ticket.ticket_type_id = ticket_type_id ? ticket_type_id : ticket.ticket_type_id;

        await repo.save(ticket);

        return ticket;

    }

    async delete(id: string){
        const repo = AppDataSource.getRepository(Ticket);
        const repoTicketType = AppDataSource.getRepository(ticketTypes);

        const ticket = await repo.findOneBy({id});

        if(!ticket){
            return new Error("Ticket does not exists!");
        }

        if(!repoTicketType){
            return new Error("This type of ticket does not exist")
        }

        const ticketType = await repoTicketType.findOneBy({id: ticket.ticket_type_id});
        ticketType.quantity = ticketType.quantity + 1;
        await repoTicketType.save(ticketType)

        await repo.delete(id)

    }
}