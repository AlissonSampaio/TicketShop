import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { User as user } from "./User";
import { TicketTypes as ticketType } from "./TicketType";

@Entity("tickets")
export class Ticket {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    user_id: string;

    @ManyToOne(() => user)
    @JoinColumn({name: "user_id"})
    user: user;

    @Column()
    ticket_id: string;

    @OneToOne(() => ticketType)
    @JoinColumn({name: "ticket_id"})
    ticketType: ticketType;

    @Column()
    ticket_type_id: ticketType;

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
