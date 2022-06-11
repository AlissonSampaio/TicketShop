import { Entity, Column, CreateDateColumn, PrimaryColumn, Timestamp, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Event as event } from "./Event";

@Entity("ticket-types")
export class TicketTypes {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    event_id: string;

    @ManyToOne(() => event)
    @JoinColumn({name: "event_id"})
    event: event;

    @Column()
    local: string;

    @Column()
    quantity: number;

    @Column()
    price: string;

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if(!this.id) {}
        this.id = uuid();
    }
}
