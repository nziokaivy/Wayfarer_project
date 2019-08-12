import jwt from 'jsonwebtoken';
import Booking from '../models/booking';

class BookingController {
    static booking(req, res) {
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
    }

    static getAllBookings(req, res) {
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
    }

    static deleteBooking(req, res) {
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
    }

    static bookingsByUserOnly(req, res) {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.body.data = decodedToken;
        const {
            email
        } = req.body.data;
        console.log(email);
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

}

export default BookingController;