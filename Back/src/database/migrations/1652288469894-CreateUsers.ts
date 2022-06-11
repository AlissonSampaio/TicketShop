import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsers1652288469894 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique:true,
                        isNullable: false
                    },
                    {
                        name: "password",
                        type: "varchar",
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: "cpf",
                        type: "varchar"
                    },
                    {
                        name: "role",
                        type: "varchar",
                    },
                    {
                        name: "gender",
                        type: "varchar"
                    },
                    {
                        name: "telephone",
                        type: "varchar"
                    },
                    {
                        name: "birth_date",
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
        await queryRunner.dropTable("users");
    }

}
