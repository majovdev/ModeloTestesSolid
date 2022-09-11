import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { CreateAppointment } from "./createAppointments";

describe('Create Appointment', () => {
    it('should be able to create an appointment', () => {
        const sut = new CreateAppointment();

        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 1)

        expect(sut.execute({
            customer: 'Matheus Aires',
            startsAt: startDate,
            endsAt: endDate,
        })).resolves.toBeInstanceOf(Appointment)
    })
})