import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AccommodationGallery from '../components/AccommodationGallery';
import AddressLink from '../components/AddressLink';
import BookingWidget from '../components/BookingWidget';

export default function AccommodationPage() {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState(null)
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  useEffect(() => {
    if (!id) {
      return
    }
    axios.get(`/accommodations/${id}`).then(response => {
      setAccommodation(response.data)
    })
  }, [id]);

  if (!accommodation) return '';

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-white text-white min-h-screen">
        <div className="bg-white p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-48 text-black">{accommodation.title}</h2>
            <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-primary text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
              Close photos
            </button>
          </div>
          {accommodation?.photos?.length > 0 && accommodation.photos.map(photo => (
            <div>
              <img className='rounded-2xl' src={'http://localhost:4000/' + photo} alt="" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='mt-8 bg-gray-100 -mx-8 px-8 pt-8'>
      <h1 className='text-2xl ml-1 mr-36'>{accommodation.title}</h1>
      <AddressLink>{accommodation.address}</AddressLink>
      <AccommodationGallery accommodation={accommodation}/>
      <div className=' mt-8 mb-4 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]'>
        <div>
          <div className='my-4'>
            <h2 className='font-semibold text-2xl'>Description</h2>
            {accommodation.description}
          </div>
          Check-in: {accommodation.checkIn}<br />
          Check-out: {accommodation.checkOut}<br />
          Max number of guests: {accommodation.maxGuests}
        </div>
        <div>
          <BookingWidget accommodation={accommodation}/>
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
        <h2 className='className="font-semibold text-2xl'>Extra Information</h2>
      </div>
      <div className='text-sm text-gray-700 leading-5 mt-2 mb-4'>
        {accommodation.extraInfo}
      </div>
      </div>
      
    </div>
  )
}
