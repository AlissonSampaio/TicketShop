import { MigrationInterface, QueryRunner } from "typeorm"

export class Usuarios1652286582711 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "event",
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
                        name: "quantity",
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
    }

}
