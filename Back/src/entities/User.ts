import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
export class User {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    cpf: string;

    @Column()
    role: string;

    @Column()
    gender: string;

    @Column()
    telephone: string;

    @Column()
    birth_date: string;

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if(!this.id) {}
        this.id = uuid();
    }
}
