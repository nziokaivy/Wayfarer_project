class Booking {
<<<<<<< HEAD
    constructor() {
        this.bookings = [{
                booking_id: 1,
                trip_id: 1,
                user_id: 1,
                bus_license_number: 'KGA 344R',
                trip_date: '21/09/2019',
                first_name: 'John',
                last_name: 'Doe',
                email: 'johndoe@gmail.com',
                seat_number: 23,
            },
            {
                booking_id: 2,
                trip_id: 1,
                user_id: 1,
                bus_license_number: 'KGA 344R',
                trip_date: '21/10/2019',
                first_name: 'John',
                last_name: 'Doe',
                email: 'maryjane@gmail.com',
                seat_number: 24,
            },
            {
                booking_id: 3,
                trip_id: 1,
                user_id: 2,
                bus_license_number: 'KGA 344R',
                trip_date: '21/11/2019',
                first_name: 'Test',
                last_name: 'User',
                email: 'testuser@gmail.com',
                seat_number: 34,
            },
            {
                booking_id: 3,
                trip_id: 1,
                user_id: 2,
                bus_license_number: 'KTZ 590M',
                trip_date: '21/09/2019',
                first_name: 'Jane',
                last_name: 'Doe',
                email: 'janedoe@gmail.com',
                seat_number: 4,
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
        const tripId=this.bookings.filter(trip => trip.trip_id === trip_id);
        if(!tripId){
            return false;
        }
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

    getOnlyBookingsByUser(email) {
        console.log(email);
        const myBookings = this.bookings.find(data => data.email === email);
        console.log(myBookings,'data');
        
		if ( myBookings == undefined) {
			this.result = 'You have no existing booking.';
			return false;
		}
		this.result = myBookings;
		return myBookings;
=======
	constructor() {
		this.bookings = [{
			booking_id: 2,
			bus_license_number: 'KGA344R',
			trip_date: '21-06-2019',
			first_name: 'John',
			last_name: 'Doe',
			user_email: 'johndoe@gmail.com',
		}];
	}

	createNewBooking(data) {
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
>>>>>>> ft-user-filter-by-origin-UI-167826408
	}
}

export default new Booking();
