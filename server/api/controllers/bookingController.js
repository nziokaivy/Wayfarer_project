import jwt from 'jsonwebtoken';
import Booking from '../db/booking';
import User from '../db/user';

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
        try {
            const {
                body
            } = req;
            const newBooking = Booking.createNewBooking(body);
            if (!newBooking) {
                return res.status(404).json({
                    status: 404,
                    error: 'Not found',
                });
            }
            return res.status(201).json({
                status: 201,
                message: 'success',
                data: newBooking
            });
        } catch (error) {
            console.log(error);
        }
    },

    getAllBookings(req, res) {
        const allBookings = Booking.getAllBookings();
        if (!allBookings.length) {
            return res.status(404).json({
                status: 404,
                error: 'Not found'
            });
        }
        return res.status(200).json({
            status: 200,
            message: 'success',
            data: allBookings
        });
    },

    deleteBooking(req, res) {
        try {
            const bookingId = parseInt(req.params.id);
            const booking_delete = Booking.deleteBooking(bookingId);
            if (booking_delete === true) {
                return res.status(200).json({
                    status: 200,
                    message: 'success',
                    data: {
                        message: 'Booking Deleted Successfully!'
                    }
                });
            }
            return res.status(404).json({
                status: 400,
                error: 'Booking id not found!',
            });
        } catch (error) {
            console.log(error);

        }
    },
    bookingsByUserOnly(req, res) {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.body.data = decodedToken;
        const {
            email
        } = req.body.data;
        const userBookings = Booking.getOnlyBookingsByUser(email);
        if (!userBookings) {
            return res.status(404).json({
                status: 404,
                message: 'You do not have any existing bookings!',
            });
        }
        return res.status(200).json({
            status: 200,
            message: 'success',
            data: userBookings,
        });
    }
};

export default BookingController;