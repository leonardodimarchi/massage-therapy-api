import { MigrationInterface, QueryRunner } from "typeorm";

export class addBaseEntities1679085877635 implements MigrationInterface {
    name = 'addBaseEntities1679085877635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "created_at" text NOT NULL DEFAULT now(), "updated_at" text NOT NULL DEFAULT now(), "postalCode" character varying(8) NOT NULL, "state" character varying(512) NOT NULL, "city" character varying(512) NOT NULL, "street" character varying(1024) NOT NULL, "neighborhood" character varying(512) NOT NULL, "houseNumber" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointments" ("id" SERIAL NOT NULL, "created_at" text NOT NULL DEFAULT now(), "updated_at" text NOT NULL DEFAULT now(), "userId" integer NOT NULL, "complaint" character varying(1024) NOT NULL, "symptoms" character varying(1024) NOT NULL, "startsAt" TIMESTAMP NOT NULL, "endsAt" TIMESTAMP NOT NULL, "isUnderMedicalTreatment" boolean NOT NULL DEFAULT false, "isPregnant" boolean NOT NULL DEFAULT false, "pregnantWeeks" integer, "status" character varying NOT NULL DEFAULT 'pending', CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" text NOT NULL DEFAULT now(), "updated_at" text NOT NULL DEFAULT now(), "email" character varying(512) NOT NULL, "name" character varying(1024) NOT NULL, "password" character varying(512) NOT NULL, "birthDate" TIMESTAMP NOT NULL, "phone" character varying(50) NOT NULL, "gender" character varying NOT NULL, "diseaseHistory" character varying(1024), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_01733651151c8a1d6d980135cc4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_01733651151c8a1d6d980135cc4"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
