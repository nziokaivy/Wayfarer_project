class Booking {
    constructor() {
        this.bookings = [
            {

            booking_id: 2,
            bus_license_number: 'KGA344R',
            trip_date: '21-06-2019',
            first_name: 'John',
            last_name: 'Doe',
            user_email: 'johndoe@gmail.com',

        },
    ];
    }
    createNewBooking({ trip_id, seat_number, first_name,last_name,email }) {
        const tripId=this.bookings.filter(trip => trip.trip_id === trip_id);
        if(!tripId){
            return false;
        }
        const newBooking = {
            id: this.bookings.length + 1,
            seat_number: data.seat_number,
            bus_license_number: data.bus_license_number,
            trip_date: data.trip_date,
            first_name: data.last_name,
            last_name: data.last_name,
            user_email: data.user_email,

        };
        this.bookings.push(newBooking);
        return newBooking;
    }
    getAllBookings() {
        return this.bookings;
    }
    getSpecificBooking(id) {
        return this.bookings.find(booking => booking.id === id);
    }
    deleteBooking(id) {
        const booking = this.getSpecificBooking(id);
        const index = this.bookings.indexOf(booking);
        this.bookings.splice(index, 1);
        return {};
    }

    getOnlyBookingsByUser(email) {
        const myBookings = this.bookings.find(data => data.email === email)     
		if ( myBookings == undefined) {
			this.result = 'You have no existing booking.';
			return false;
		}
		this.result = myBookings;
		return myBookings;
	}
}

export default new Booking();