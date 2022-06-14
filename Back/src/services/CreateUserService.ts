import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User"
type UserRequest = {
    name: string;
    email: string;
    password: string;
    cpf: string;
    role: string;
    gender: string;
    telephone: string;
    birth_date: string;
}
export class CreateUserService {
    async execute({name, email, password, cpf, role, gender, telephone, birth_date}: UserRequest ): Promise<User | Error> {
        const repo = AppDataSource.getRepository(User);

        //SELECT * FROM USER WHERE 
        if(await repo.findOneBy({name})) {
            return new Error("User already exists")
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
} 