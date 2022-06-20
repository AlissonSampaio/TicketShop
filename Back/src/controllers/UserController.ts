import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController{
    async create(request: Request, response: Response){
        const { name, email, password, cpf, role, gender, telephone, birth_date} = request.body;

        const service = new UserService()

        const result =  await service.create({ name, email, password, cpf, role, gender, telephone, birth_date });

        if(result instanceof Error){
            return response.status(400).json(result.message);
        }

        return response.json;
    }

    async update(request: Request, response: Response){
        const { id} = request.params; 
        const { name, email, password, cpf, role, gender, telephone, birth_date} = request.body;

        const service = new UserService();

        const result = await service.update({id, name, email, password, cpf, role, gender, telephone, birth_date});

        if(result instanceof Error){
            return response.status(400).json(result.message);
        }

        return response.status(200).json;
    }

    async delete(request: Request, response: Response){
        const { id } = request.params;

        const service = new UserService();

        const result = await service.delete(id);

        if(result instanceof Error){
            return response.status(400).json(result.message);
        }
        
        return response.status(200).end();
    }
}