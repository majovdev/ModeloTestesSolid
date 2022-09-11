import {Moment} from "moment"
export interface AppointmentProps {
    customer: string
    startsAt: Moment | Date
    endsAt: Moment | Date

}
export class Appointment {
    private props: AppointmentProps;

    get customer() {
        return this.props.customer
    }
    get startsAt() {
        return this.props.startsAt
    }
    get endsAt() {
        return this.props.endsAt
    }

    constructor(props: AppointmentProps) {
        this.props = props;

        if (this.props.endsAt <= this.props.startsAt) {
            throw new Error("")
        }
    }
}