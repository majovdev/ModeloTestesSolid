import moment from "moment";
import { Appointment } from "../../entities/appointment";
import { AppointmentRepository } from "../appointments-repository";

export class ImMemoryAppointmentsRepository implements AppointmentRepository {
    public items: Appointment[] = []
    async create(appointment: Appointment): Promise<void> {
        // console.log(appointment)
        this.items.push(appointment)
        // console.log(this.items)
    }

    async findOverlappingAppointment(startsAt: moment.Moment | Date, endsAt: moment.Moment | Date): Promise<Appointment | null> {
        const overlappingAppoint = this.items.find(appointment => {
            if (moment(startsAt).isBetween(appointment.startsAt, appointment.endsAt, undefined, '[]')
                || moment(endsAt).isBetween(appointment.startsAt, appointment.endsAt, undefined, '[]')
                || moment(appointment.startsAt).isBetween(startsAt, endsAt, undefined, '[]')
            ) {
                return appointment
            };
        })

        // console.log(overlappingAppoint)

        if (overlappingAppoint) {
            return overlappingAppoint
        }
        return null

    }

}