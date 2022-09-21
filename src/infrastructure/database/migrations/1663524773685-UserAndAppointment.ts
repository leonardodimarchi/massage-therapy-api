import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAndAppointment1663524773685 implements MigrationInterface {
    name = 'UserAndAppointment1663524773685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appointments" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" text NOT NULL DEFAULT (datetime('now')), "updated_at" text NOT NULL DEFAULT (datetime('now')), "userId" integer NOT NULL, "complaint" varchar(1024) NOT NULL, "symptoms" varchar(1024) NOT NULL, "startsAt" datetime NOT NULL, "endsAt" datetime NOT NULL, "isUnderMedicalTreatment" boolean NOT NULL DEFAULT (0), "isPregnant" boolean NOT NULL DEFAULT (0), "pregnantWeeks" integer)`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" text NOT NULL DEFAULT (datetime('now')), "updated_at" text NOT NULL DEFAULT (datetime('now')), "email" varchar(50) NOT NULL, "name" varchar(50) NOT NULL, "password" varchar(50) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_appointments" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" text NOT NULL DEFAULT (datetime('now')), "updated_at" text NOT NULL DEFAULT (datetime('now')), "userId" integer NOT NULL, "complaint" varchar(1024) NOT NULL, "symptoms" varchar(1024) NOT NULL, "startsAt" datetime NOT NULL, "endsAt" datetime NOT NULL, "isUnderMedicalTreatment" boolean NOT NULL DEFAULT (0), "isPregnant" boolean NOT NULL DEFAULT (0), "pregnantWeeks" integer, CONSTRAINT "FK_01733651151c8a1d6d980135cc4" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_appointments"("id", "created_at", "updated_at", "userId", "complaint", "symptoms", "startsAt", "endsAt", "isUnderMedicalTreatment", "isPregnant", "pregnantWeeks") SELECT "id", "created_at", "updated_at", "userId", "complaint", "symptoms", "startsAt", "endsAt", "isUnderMedicalTreatment", "isPregnant", "pregnantWeeks" FROM "appointments"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
        await queryRunner.query(`ALTER TABLE "temporary_appointments" RENAME TO "appointments"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" RENAME TO "temporary_appointments"`);
        await queryRunner.query(`CREATE TABLE "appointments" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" text NOT NULL DEFAULT (datetime('now')), "updated_at" text NOT NULL DEFAULT (datetime('now')), "userId" integer NOT NULL, "complaint" varchar(1024) NOT NULL, "symptoms" varchar(1024) NOT NULL, "startsAt" datetime NOT NULL, "endsAt" datetime NOT NULL, "isUnderMedicalTreatment" boolean NOT NULL DEFAULT (0), "isPregnant" boolean NOT NULL DEFAULT (0), "pregnantWeeks" integer)`);
        await queryRunner.query(`INSERT INTO "appointments"("id", "created_at", "updated_at", "userId", "complaint", "symptoms", "startsAt", "endsAt", "isUnderMedicalTreatment", "isPregnant", "pregnantWeeks") SELECT "id", "created_at", "updated_at", "userId", "complaint", "symptoms", "startsAt", "endsAt", "isUnderMedicalTreatment", "isPregnant", "pregnantWeeks" FROM "temporary_appointments"`);
        await queryRunner.query(`DROP TABLE "temporary_appointments"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
    }

}
