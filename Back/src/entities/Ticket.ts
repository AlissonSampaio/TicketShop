import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";
import { TicketTypes } from "./TicketType";

@Entity("tickets")
export class Ticket {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({name: "user_id"})
    user: User;

    @Column()
    ticket_type_id: string;

    @ManyToOne(() => TicketTypes)
    @JoinColumn({name: "ticket_type_id"})
    ticketType: TicketTypes;

    constructor() {
        if(!this.id) {}
        this.id = uuid();
    }
}
