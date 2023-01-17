import { MigrationInterface, QueryRunner } from "typeorm";

export class addingUserAndAppointment1673991195878 implements MigrationInterface {
    name = 'addingUserAndAppointment1673991195878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appointments" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" text NOT NULL DEFAULT (datetime('now')), "updated_at" text NOT NULL DEFAULT (datetime('now')), "userId" integer NOT NULL, "complaint" varchar(1024) NOT NULL, "symptoms" varchar(1024) NOT NULL, "startsAt" datetime NOT NULL, "endsAt" datetime NOT NULL, "isUnderMedicalTreatment" boolean NOT NULL DEFAULT (0), "isPregnant" boolean NOT NULL DEFAULT (0), "pregnantWeeks" integer, "status" varchar CHECK( "status" IN ('pending','scheduled','completed','reproved') ) NOT NULL DEFAULT ('pending'))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" text NOT NULL DEFAULT (datetime('now')), "updated_at" text NOT NULL DEFAULT (datetime('now')), "email" varchar(512) NOT NULL, "name" varchar(1024) NOT NULL, "password" varchar(512) NOT NULL, "birthDate" datetime NOT NULL, "phone" varchar(50) NOT NULL, "diseaseHistory" varchar(1024), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "temporary_appointments" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" text NOT NULL DEFAULT (datetime('now')), "updated_at" text NOT NULL DEFAULT (datetime('now')), "userId" integer NOT NULL, "complaint" varchar(1024) NOT NULL, "symptoms" varchar(1024) NOT NULL, "startsAt" datetime NOT NULL, "endsAt" datetime NOT NULL, "isUnderMedicalTreatment" boolean NOT NULL DEFAULT (0), "isPregnant" boolean NOT NULL DEFAULT (0), "pregnantWeeks" integer, "status" varchar CHECK( "status" IN ('pending','scheduled','completed','reproved') ) NOT NULL DEFAULT ('pending'), CONSTRAINT "FK_01733651151c8a1d6d980135cc4" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_appointments"("id", "created_at", "updated_at", "userId", "complaint", "symptoms", "startsAt", "endsAt", "isUnderMedicalTreatment", "isPregnant", "pregnantWeeks", "status") SELECT "id", "created_at", "updated_at", "userId", "complaint", "symptoms", "startsAt", "endsAt", "isUnderMedicalTreatment", "isPregnant", "pregnantWeeks", "status" FROM "appointments"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
        await queryRunner.query(`ALTER TABLE "temporary_appointments" RENAME TO "appointments"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" RENAME TO "temporary_appointments"`);
        await queryRunner.query(`CREATE TABLE "appointments" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" text NOT NULL DEFAULT (datetime('now')), "updated_at" text NOT NULL DEFAULT (datetime('now')), "userId" integer NOT NULL, "complaint" varchar(1024) NOT NULL, "symptoms" varchar(1024) NOT NULL, "startsAt" datetime NOT NULL, "endsAt" datetime NOT NULL, "isUnderMedicalTreatment" boolean NOT NULL DEFAULT (0), "isPregnant" boolean NOT NULL DEFAULT (0), "pregnantWeeks" integer, "status" varchar CHECK( "status" IN ('pending','scheduled','completed','reproved') ) NOT NULL DEFAULT ('pending'))`);
        await queryRunner.query(`INSERT INTO "appointments"("id", "created_at", "updated_at", "userId", "complaint", "symptoms", "startsAt", "endsAt", "isUnderMedicalTreatment", "isPregnant", "pregnantWeeks", "status") SELECT "id", "created_at", "updated_at", "userId", "complaint", "symptoms", "startsAt", "endsAt", "isUnderMedicalTreatment", "isPregnant", "pregnantWeeks", "status" FROM "temporary_appointments"`);
        await queryRunner.query(`DROP TABLE "temporary_appointments"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
    }

}
