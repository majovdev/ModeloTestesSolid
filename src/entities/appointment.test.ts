import { expect, test } from 'vitest'
import { Appointment } from './appointment'

test('create an appointment', () => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1)

    const appointment = new Appointment({
        customer: 'Matheus Aires',
        startsAt: startDate,
        endsAt: endDate,
    });

    expect(appointment).toBeInstanceOf(Appointment);
    expect(appointment.customer).toEqual("Matheus Aires");
})


test('connot create an appointment with end date before start date', () => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 1)

    expect(()=>{
        const appointment = new Appointment({
            customer: 'Matheus Aires',
            startsAt: startDate,
            endsAt: endDate,
        })
    }).toThrow()

})