import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AccommodationGallery from '../components/AccommodationGallery';
import AccountNav from '../components/AccountNav';
import AddressLink from '../components/AddressLink';
import BookingDates from '../components/BookingDates';


export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking)
        }
      });
    }

  }, [id]);

  if (!booking) {
    return '';
  }

  return (
    <div className='my-2'>
      <AccountNav />
      <h1 className='text-3xl ml-1 mr-36'>{booking.accommodation.title}</h1>
      <AddressLink className='my-2 block'>{booking.accommodation.address}</AddressLink>
      <div className="bg-gray-200 p-6 mb-6 mt-6 rounded-2xl flex justify-between items-center">
        <div className=''>
          <h2 className='text-2xl mb-2'>Your booking information</h2>
          <BookingDates booking={booking} className="" />
        </div>
        <div className='bg-primary p-4 text-white rounded-2xl'>
          <div>Total price</div>
          <div className='text-2xl'>${booking.price}</div>
        </div>
      </div>
      <AccommodationGallery accommodation={booking.accommodation} />
      <div className=' bg-gray-200 items-center p-6 rounded-2xl border-t mt-8 mb-4 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]'>
        <div className='my-4 '>
          <h2 className='font-semibold text-2xl mb-2 line-clamp-4'>Description</h2>
          <p className='line-clamp-4'>{booking.accommodation.description}</p>
        </div>
        <div className='bg-white px-8 py-8 rounded-2xl'>
          <h2 className='font-semibold text-2xl mb-2'>Extra Information</h2>
          <p className='line-clamp-4'>{booking.accommodation.extraInfo}</p>
        </div>
      </div>
    </div>
    
  )
}
