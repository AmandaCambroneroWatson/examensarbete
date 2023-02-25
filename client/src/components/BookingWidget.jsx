import React, { useContext, useEffect, useState } from 'react'
import { differenceInCalendarDays } from "date-fns";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';

export default function BookingWidget({ accommodation }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const { user } = useContext(UserContext)
    // Filling user information automatically when booking
    useEffect(() => {
        if (user) {
            setName(user.name)
        }
    }, [user])
    //calculate days
    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function bookThisAccommodation() {
        const response = await axios.post('/bookings', {
            checkIn, checkOut, numberOfGuests, name, phone,
            accommodation: accommodation._id,
            price: numberOfNights * accommodation.price,
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }
    if (redirect) {
        return <Navigate to={redirect} />
    }

    
    //context to protect a page from unauthenticated users to make booking
    const handleClick = () => {
        if (!user) {
            alert('please log in or create an account to able to book this accommodation')
        }
    };

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price: ${accommodation.price} / per night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-3 px-4">
                        <label>Check in:</label>
                        <input type="date"
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)} />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label>Check out:</label>
                        <input type="date" value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)} />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Number of guests:</label>
                    <input type="number"
                        value={numberOfGuests}
                        onChange={ev => setNumberOfGuests(ev.target.value)} />
                </div>
                {numberOfNights > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label>Your full name:</label>
                        <input type="text"
                            value={name}
                            onChange={ev => setName(ev.target.value)} />
                        <label>Phone number:</label>
                        <input type="tel"
                            value={phone}
                            onChange={ev => setPhone(ev.target.value)} />
                    </div>
                )}
            </div>
            <button onClick={() => {
                bookThisAccommodation();
                handleClick();
            }} className="primary mt-4">
                Book this accommodation
                {numberOfNights > 0 && (
                    <span> ${numberOfNights * accommodation.price}</span>
                )}
            </button>
        </div>
    )
}
