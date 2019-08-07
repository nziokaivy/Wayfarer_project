import Booking from '../db/booking';
import User from '../db/user';
import Trip from '../db/trip';

const removeBooking = (data) => {
    const remove = {
        trip_id: data.id,
        first_name: User.getUser(data.user_id).first_name,
        last_name: User.getUser(data.user_id).last_name,
        email: User.getUser(data.user_id).email,
        seat_number: data.seat_number,
    };
    return remove;
};

const BookingController = {
    booking(req, res) {
        const {
            body
        } = req;

        if (!body.trip_id || !body.seat_number) {
            return res.status(400).json({
                status: 'error',
                error: 'Bad Request! Please ensure you have filled the trip id'
            });
        }
        if (!body.seat_number) {
            return res.status(400).json({
                status: 'error',
                error: 'Bad Request! Please ensure you have filled in the seat number'
            });
        }
        const newBooking = Booking.createNewBooking(body);
        return res.status(201).json({
            status: 'success',
            data: newBooking
        });
    },

    getAllBookings(req, res) {
        const allBookings = Booking.getAllBookings();
        if (!allBookings.length) {
            return res.status(404).json({
                status: 'error',
                error: 'Not found'
            });
        }
        return res.status(200).json({
            status: 'success',
            data: allBookings
        });
    },

    getSpecificBooking(req, res) {
        const bookingId = parseInt(req.params.id);
        const specificBooking = Booking.getSpecificBooking(bookingId);
        console.log(specificBooking, 'specificid !!!');
        if (specificBooking) {
            const removedBooking = removeBooking(specificBooking);
            return res.status(200).json({
                status: 'success',
                data: removedBooking
            });
        }
        return res.status(404).json({
            status: 'error',
            error: 'Not found'
        });
    },

    deleteBooking(req, res) {
        const bookingId = parseInt(req.params.id);
        const booking_delete = Booking.deleteBooking(bookingId);
        if (booking_delete === true) {
            return res.status(204).json({
                status: 'success',
                data: {
                    message: 'Booking Deleted Successfully!'
                }
            });
        }
        return res.status(404).json({
            status: 'error',
            data: {
                message: 'Booking id not found!'
            }
        });
    }
};

export default BookingController;