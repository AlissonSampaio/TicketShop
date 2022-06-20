import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";
type UserRequest = {
    id?: string;
    name: string;
    email: string;
    password: string;
    cpf: string;
    role: string;
    gender: string;
    telephone: string;
    birth_date: string;
}

export class UserService {
    async create({name, email, password, cpf, role, gender, telephone, birth_date}: UserRequest): Promise<User | Error> {
        const repo = AppDataSource.getRepository(User);

        if(await repo.findOneBy({name})){
            return new Error("User already exists");
        }

        const user = repo.create({
            name,
            email,
            password,
            cpf,
            role,
            gender,
            telephone,
            birth_date
        })

        await repo.save(user);

        return user;
    }

    async update({id, name, email, password, cpf, role, gender, telephone, birth_date}: UserRequest){
        const repo = AppDataSource.getRepository(User);

        const user = await repo.findOneBy({id});

        if(!user){
            return new Error("User does not exists!");
        }

        user.name = name ? name : user.name;
        user.email = email ? email : user.email;
        user.password = password ? password : user.password;
        user.cpf = cpf ? cpf : user.cpf;
        user.role = role ? role : user.role;
        user.gender = gender ? gender : user.gender;
        user.telephone = telephone ? telephone : user.telephone;
        user.birth_date = birth_date ? birth_date : user.birth_date;
        

        await repo.save(user);

        return user;
    }

    async delete(id: string){
        const repo = AppDataSource.getRepository(User);
    
        if(!await repo.findOneBy({id})){
            return new Error("User does not exists!");
        }

        await repo.delete(id);

    }
}