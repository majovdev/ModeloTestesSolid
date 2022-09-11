import { Appointment, AppointmentProps } from "../entities/appointment"
import { AppointmentRepository } from "../repositories/appointments-repository"

// interface CreateAppointmentRequest {
//     customer: string
//     startsAt: Date
//     endsAt: Date 
// }

type CreateAppointmentResponse = Appointment

export class CreateAppointment {
    constructor(private appointmentsRepository: AppointmentRepository){};
    async execute({
        customer,
        startsAt,
        endsAt
    }:AppointmentProps):Promise<CreateAppointmentResponse> {
        // console.log(startsAt)
        // console.log(endsAt)
        const overlappingAppoint = await this.appointmentsRepository.findOverlappingAppointment(startsAt,endsAt);

        // console.log(overlappingAppoint)

        if(overlappingAppoint){
            throw new Error('Another appointment overlaps this appointment')
        }

        const appointment = new Appointment({
            customer,
            startsAt,
            endsAt,
        })

        // console.log(appointment);

        await this.appointmentsRepository.create(appointment);

        return appointment
    }
}