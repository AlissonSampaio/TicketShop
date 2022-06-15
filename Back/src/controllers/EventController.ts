import { Request, Response } from "express";
import { EventService } from "../services/EventService";

export class EventController{
    async create(request: Request, response: Response){
        const { name, description, time, local, date } = request.body;

        const service = new EventService();

        const result =  await service.create({ name, description, time, local, date });

        if(result instanceof Error){
            return response.status(400).json(result.message);
        }

        return response.json;
    }

    async getAll(request: Request, response: Response) {
        const service = new EventService();

        const event = await service.getAll();

        return response.json(event);
    }

    async get(request: Request, response: Response){
        const { id } = request.params;

        const service = new EventService();

        const event = await service.get(id);

        if(!event) {
            return response.status(400).json("Events does not exists!");
        }

        return response.json(event);
    }

    async update(request: Request, response: Response){
        const { id} = request.params; 
        const { name, description, time, local, date } = request.body

        const service = new EventService();

        const result = await service.update({id, name, description, time, local, date});

        if(result instanceof Error){
            return response.status(400).json(result.message);
        }

        return response.json;
    }

    async delete(request: Request, response: Response){
        const { id } = request.params;

        const service = new EventService();

        const result = await service.delete(id);

        if(result instanceof Error){
            return response.status(400).json(result.message);
        }
        
        return response.status(200).end();
    }
}