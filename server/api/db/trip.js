class Trip {
<<<<<<< HEAD
    constructor() {
      this.trips = [
        {
            id: 1,
            seating_capacity: 67,
            bus_license_number: 'KBE223T',
            origin: 'Mombasa',
            destination: 'Kampala',
            trip_date: '22-06-2019',
            fare: 9000,
            status: 'active',
        },
    ]};
    createNewTrip(data) {
        const newTrip = {
                id: this.trips.length + 1,
                seating_capacity: data.seating_capacity,
                bus_license_number: data.bus_license_number,
                origin: data.origin,
                destination: data.destination,
                trip_date: data.trip_date,
                fare: data.fare,
                status: 'active',
          };
          this.trips.push(newTrip);
          return newTrip;
        }
    
        getAllTrips() {
            return this.trips;
        }   

        getSpecificTrip(id) {
            return this.trips.find(trip => trip.id === id);
        } 
        cancelTrip(id) {
            const trip = this.getSpecificTrip(id);
            trip.status= 'cancel';
            return trip;   
        };
    }
=======
	constructor() {
		this.trips = [{
			id: 1,
			seating_capacity: 67,
			bus_license_number: 'KBE223T',
			origin: 'Mombasa',
			destination: 'Kampala',
			trip_date: '22-06-2019',
			fare: 9000,
			status: 1,
		}];
	}

	createNewTrip(data) {
		const newTrip = {
			id: this.trips.length + 1,
			seating_capacity: data.seating_capacity,
			bus_license_number: data.bus_license_number,
			origin: data.origin,
			destination: data.destination,
			trip_date: data.trip_date,
			fare: data.fare,
			status: data.status || 1, // active = 1,
		};
		this.trips.push(newTrip);
		return newTrip;
	}

	getAllTrips() {
		return this.trips;
	}

	getSpecificTrip(id) {
		return this.trips.find(trip => trip.id === id);
	}

	cancelTrip(id) {
		const trip = this.getSpecificTrip(id);
		trip.status = 2; // cancel = 2,
		return trip;
	}
}
>>>>>>> ft-user-filter-by-origin-UI-167826408

export default new Trip();
