import { Appointment } from "../entities/appointment";
import {Moment} from "moment"

export interface AppointmentRepository {
    create(appointment:Appointment): Promise<void>;
    findOverlappingAppointment(startsAt: Moment | Date, endsAt:Moment|Date):Promise<Appointment|null>
}