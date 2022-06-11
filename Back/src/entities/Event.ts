import { Entity, Column, CreateDateColumn, PrimaryColumn, Timestamp } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("events")
export class Event {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({type: 'time'})
    time: string;

    @Column()
    local: string;

    @Column()
    role: string;

    @Column()
    date: Date;

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if(!this.id) {}
        this.id = uuid();
    }
}
