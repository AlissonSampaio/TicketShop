import { errorMonitor } from "events";
import { EventEmitter } from "stream";
import { AppDataSource } from "../database/data-source";
import { Event } from "../entities/Event";
type EventRequest = {
    id?:string,
    name: string;
    description: string;
    time: string;
    local: string;
    date: Date;
}

export class EventService {
    async create({name, description, time, local, date}: EventRequest): Promise<Event | Error> {
        const repo = AppDataSource.getRepository(Event);

        if(await repo.findOneBy({name})){
            return new Error("Event already exists");
        }

        const event = repo.create({
            name,
            description,
            time,
            local,
            date
        })

        await repo.save(event);

        return event;
    }

    async getAll(){
        const repo = AppDataSource.getRepository(Event);

        const event = await repo.find();

        return event;
    }

    async get(id: string){
        const repo = AppDataSource.getRepository(Event);
 
        const event = await repo.findOneBy({id});

        if(!event){
            return new Error("Event does not exists!");
        };

        return event;
    }

    async update({id, name, description, time, local, date}: EventRequest){
        const repo = AppDataSource.getRepository(Event);

        const event = await repo.findOneBy({id});

        if(!event){
            return new Error("Event does not exists!");
        }

        event.name = name ? name : event.name;
        event.description = description ? description : event.description;
        event.time = time ? time : event.time;
        event.local = local ? local: event.local;
        event.date = date ? date: event.date;

        await repo.save(event);

        return event;
    }

    async delete(id: string){
        const repo = AppDataSource.getRepository(Event);
    
        if(!await repo.findOneBy({id})){
            return new Error("Event does not exists!");
        }

        await repo.delete(id);

    }
}