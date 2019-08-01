import Booking from '../db/booking';

const BookingController = {
    booking(req, res) {
        const { body } =req;

        if(!body.trip_id || !body.user_id || !body.seat_number ) {

            return res.status(400).json({ status: 'error', error: 'Bad Request! Please ensure you have filled in all the fields'});
        }
        const newBooking = Booking.createNewBooking(body);
        return res.status(201).json({ status: 'success', data: newBooking});
    },
 

};

export default BookingController;