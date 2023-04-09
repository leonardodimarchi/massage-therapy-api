# Massage-therapy-api

![Build and Tests](https://github.com/leonardodimarchi/massage-therapy-api/actions/workflows/pipeline.yml/badge.svg)

## Entities

```mermaid
%%{init: {'theme':'base'}}%%
erDiagram
    USER ||--o{ APPOINTMENT : creates
    USER ||--|| ADDRESS : has
    USER {
        Number id PK
        Date createdAt
        Date updatedAt

        String email
        String name
        String phone
        String password
        String diseaseHistory
        UserGenderEnum gender
        Date birthDate
    }

    ADDRESS {
        Number id PK
        Date createdAt
        Date updatedAt

        String postalCode
        String state
        String city
        String street
        String neighborhood
        Number houseNumber
        Number userId FK
    }

    APPOINTMENT {
        Number id PK
        Date createdAt
        Date updatedAt

        String complaint
        Boolean isUnderMedicalTreatment
        String symptoms
        Date startsAt
        Date endsAt
        Boolean isPregnant
        Number pregnantWeeks
        AppointmentStatusEnum status

        Number userId FK
    }
```

```mermaid
classDiagram
    class UserGenderEnum {
        <<enumeration>>
        MALE
        FEMALE
    }

    class AppointmentStatusEnum {
        <<enumeration>>
        PENDING
        SCHEDULED
        COMPLETED
        REPROVED
    }
```

## Pipeline

For the pipeline, i'm using a Github [Action](./.github/workflows/pipeline.yml) to test and build, along with [Render's](https://render.com/) integration to deploy the API.

## Database

Currently using the free PostgreSQL instance at [Render](https://render.com/).
