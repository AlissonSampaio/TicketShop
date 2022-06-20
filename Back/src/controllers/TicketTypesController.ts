import { Request, Response } from "express";
import { TicketTypesService } from "../services/TicketTypesService";

export class TicketTypesController{
    async create(request: Request, response: Response){
        const { name, event_id, quantity, price } = request.body

        const service = new TicketTypesService();

        const result = await service.create({
            name, event_id, quantity, price
        });

        if(result instanceof Error){
            return response.status(400).json(result.message);
        }

        return response.json();
    }

    async getAllOfEvent(request: Request, response: Response) {
        const { event_id } = request.params;
        const service = new TicketTypesService();

        const ticketTypes = await service.getAllOfEvent(event_id);

        if(!ticketTypes) {
            return response.status(400).json("Ticket Types does not exists!");
        }

        return response.json(ticketTypes);
    }

    async get(request: Request, response: Response){
        const { id } = request.params;

        const service = new TicketTypesService();

        const ticketType = await service.get(id);

        if(!ticketType) {
            return response.status(400).json("Ticket Type does not exists!");
        }

        return response.json(ticketType);
    }

    async update(request: Request, response: Response){
        const { id } = request.params; 
        const { name, event_id, quantity, price } = request.body

        const service = new TicketTypesService();

        const result = await service.update({id, name, event_id, quantity, price});

        if(result instanceof Error){
            return response.status(400).json(result.message);
        }

        return response.status(200).json;
    }

    async delete(request: Request, response: Response){
        const { id } = request.params;

        const service = new TicketTypesService();

        const result = await service.delete(id);

        if(result instanceof Error){
            return response.status(400).json(result.message);
        }
        
        return response.status(200).end();
    }
}