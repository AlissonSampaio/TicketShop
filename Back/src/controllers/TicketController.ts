import { Request, Response } from "express";
import { TicketService } from "../services/TicketService";

export class TicketController{
    async create(request: Request, response: Response){
        const { name, user_id, ticket_type_id } = request.body

        const service = new TicketService();

        const result = await service.create({
            name, user_id, ticket_type_id
        })

        if(result instanceof Error){
            return response.status(400).json(result.message);
        }

        return response.json();
    }

    async getAll(request: Request, response: Response) {
        const service = new TicketService();

        const ticket = await service.getAll();

        return response.json(ticket);
    }

    async get(request: Request, response: Response){
        const { id } = request.params;

        const service = new TicketService();

        const ticket = await service.get(id);

        if(!ticket) {
            return response.status(400).json("Ticket does not exists!");
        }

        return response.json(ticket);
    }

    async update(request: Request, response: Response){
        const { id} = request.params; 
        const { name, user_id, ticket_type_id } = request.body

        const service = new TicketService();

        const result = await service.update({id, name, user_id, ticket_type_id});

        if(result instanceof Error){
            return response.status(400).json(result.message);
        }

        return response.status(200).json;
    }

    async delete(request: Request, response: Response){
        const { id } = request.params;

        const service = new TicketService();

        const result = await service.delete(id);

        if(result instanceof Error){
            return response.status(400).json(result.message);
        }
        
        return response.status(200).end();
    }
}