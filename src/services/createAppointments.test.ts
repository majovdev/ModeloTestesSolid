import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { ImMemoryAppointmentsRepository } from "../repositories/inMemory/inMemoryAppointments";
import { CreateAppointment } from "./createAppointments";
import moment from "moment";

describe('Create Appointment', () => {
    it('should be able to create an appointment', () => {
        const sut = new CreateAppointment(new ImMemoryAppointmentsRepository());

        const startDate = moment('2022-09-10');
        const endDate = moment('2022-09-11');

        expect(sut.execute({
            customer: 'Matheus Aires',
            startsAt: startDate,
            endsAt: endDate,
        })).resolves.toBeInstanceOf(Appointment)
    })

    it('should not be able to create an appointment with overlapping dates', async() => {
        const rep = new ImMemoryAppointmentsRepository()
        const sut = new CreateAppointment(rep);

        const startDate = moment('2022-09-10');
        const endDate = moment('2022-09-12');

        await sut.execute({
            customer: 'Matheus Aires',
            startsAt: startDate,
            endsAt: endDate,
        })
        
        expect(sut.execute({
            customer:"John Doe",
            startsAt: moment('2022-09-09'),
            endsAt: moment('2022-09-10')
        })).rejects.toBeInstanceOf(Error)

        expect(sut.execute({
            customer:"John Doe",
            startsAt: moment('2022-09-09'),
            endsAt: moment('2022-09-11')
        })).rejects.toBeInstanceOf(Error)

        expect(sut.execute({
            customer:"John Doe",
            startsAt: moment('2022-09-09'),
            endsAt: moment('2022-09-12')
        })).rejects.toBeInstanceOf(Error)

        expect(sut.execute({
            customer:"John Doe",
            startsAt: moment('2022-09-09'),
            endsAt: moment('2022-09-13')
        })).rejects.toBeInstanceOf(Error)
        expect(sut.execute({
            customer:"John Doe",
            startsAt: moment('2022-09-10'),
            endsAt: moment('2022-09-11')
        })).rejects.toBeInstanceOf(Error)

        expect(sut.execute({
            customer:"John Doe",
            startsAt: moment('2022-09-11'),
            endsAt: moment('2022-09-12')
        })).rejects.toBeInstanceOf(Error)

        expect(sut.execute({
            customer:"John Doe",
            startsAt: moment('2022-09-12'),
            endsAt: moment('2022-09-13')
        })).rejects.toBeInstanceOf(Error)
    })
})