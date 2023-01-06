import { ONE_MILLISECOND } from "@/helpers/date_constants";
import { TestDateUtils } from "test/utils/test_date_utils";
import { AppointmentEntity } from "./appointment_entity";
import { AppointmentComplaint } from "./value-objects/complaint/appointment_complaint";
import { AppointmentDateRange } from "./value-objects/date-range/appointment_date_range";
import { AppointmentSymptoms } from "./value-objects/symptoms/appointment_symptoms";

describe('AppointmentEntity', () => {
    beforeAll(() => {
        TestDateUtils.setTestDate(new Date());
    });

    afterAll(() => {
        TestDateUtils.resetTestDate();
    });

    it('should be able to instantiate the entity', () => {
        const startsAt = new Date(new Date().getTime() + ONE_MILLISECOND);
        const endsAt = new Date(startsAt.getTime() + ONE_MILLISECOND);

        const entity = new AppointmentEntity({
            complaint: new AppointmentComplaint('Those two last weeks i have been felling a strong headache'),
            dateRange: new AppointmentDateRange({ startsAt, endsAt }),
            isUnderMedicalTreatment: false,
            symptoms: new AppointmentSymptoms('Headache, Sore throat'),
            userId: 5,
        })

        expect(entity).toBeDefined();
    });
});