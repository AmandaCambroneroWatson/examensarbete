import axios from 'axios'
import { differenceInCalendarDays, format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AccommodationImg from '../components/AccommodationImg'
import AccountNav from '../components/AccountNav'
import BookingDates from '../components/BookingDates'

export default function () {
  const [bookings, setBookings] = useState([])
  useEffect(() => {
    axios.get('/bookings').then(response => {
      setBookings(response.data);
    });
  }, [])
  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 && bookings.map(booking => (
          <Link to={`/account/bookings/${booking._id}`} className='flex mb-3 gap-4 bg-gray-200 rounded-2xl overflow-hidden'>
            <div className='w-48'>
              <AccommodationImg accommodation={booking.accommodation} />
            </div>
            <div className='py-3 pr-3 grow"'>
              <h2 className='text-xl font-bold text-slate-700 leading-snug hover:underline'>{booking.accommodation.title}</h2>
              <BookingDates booking={booking} className='mb-2 mt-1 text-gray-500'/>
              <div className=' flex items-center gap-1 text-xl mt-2 text-slate-800'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>

                Total price for the booking: ${booking.price}
              </div>
            </div>

          </Link>
        ))}
      </div>
    </div>
  )
}
