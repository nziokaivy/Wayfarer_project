class Booking {
    constructor() {
        this.bookings = [{
                booking_id: 1,
                trip_id: 1,
                user_id: 1,
                bus_license_number: 'KGA 344R',
                trip_date: '21/06/2019',
                first_name: 'John',
                last_name: 'Doe',
                email: 'johndoe@gmail.com',
                seat_number: 23,
            },
            {
                booking_id: 2,
                trip_id: 1,
                user_id: 2,
                bus_license_number: 'KGA 344R',
                trip_date: '21/06/2019',
                first_name: 'Test',
                last_name: 'User',
                email: 'testuser@gmail.com',
                seat_number: 34,
            },
        ];
    }
    createNewBooking({
        trip_id,
        seat_number,
        first_name,
        last_name,
        email
    }) {
        const newBooking = {
            id: this.bookings.length + 1,
            trip_id: trip_id,
            seat_number: seat_number,
            first_name: first_name,
            last_name: last_name,
            email: email,

        };
        this.bookings.push(newBooking);
        return newBooking;
    }
    getAllBookings() {
        return this.bookings;
    }
 
    deleteBooking(id) {
        const booking_Id = parseInt(id);
        const booking_data = this.bookings.find(data => data.booking_id === booking_Id);
        if (booking_data) {
            const user = this.bookings.splice(this.bookings.booking_id - 1, 1);
            return true;
        }
        return false;
    }
}

export default new Booking();