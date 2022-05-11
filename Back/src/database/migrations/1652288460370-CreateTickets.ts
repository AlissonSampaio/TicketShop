import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTickets1652288460370 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "ticket",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "tickets",
                        type: "int"
                    },
                    {
                        name: "price",
                        type: "varchar"
                    },
                    {
                        name: "time",
                        type: "time"
                    },
                    {
                        name: "local",
                        type: "varchar"
                    },
                    {
                        name: "date",
                        type: "date"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("ticket");
    }

}
