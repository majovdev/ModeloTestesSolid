interface AppointmentProps {
    customer: string
    startsAt: Date
    endsAt: Date

}
export class Appointment {
    private props: AppointmentProps;

    get customer() {
        return this.props.customer
    }
    get startsAt() {
        return this.props.customer
    }
    get endsAt() {
        return this.props.customer
    }

    constructor(props: AppointmentProps) {
        this.props = props;

        if (this.props.endsAt <= this.props.startsAt) {
            throw new Error("")
        }
    }
}