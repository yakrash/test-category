import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1714332419962 implements MigrationInterface {
  name = 'Init1714332419962';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "categories" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "slug" character varying NOT NULL, 
        "name" character varying NOT NULL, 
        "description" character varying NOT NULL, 
        "created_date" TIMESTAMP NOT NULL DEFAULT now(), 
        "active" boolean NOT NULL, 
        CONSTRAINT "UQ_420d9f679d41281f282f5bc7d09" UNIQUE ("slug"), 
        CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id")
        )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "categories"`);
  }

}
