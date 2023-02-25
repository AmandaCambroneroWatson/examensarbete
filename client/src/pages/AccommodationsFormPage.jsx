import React from 'react'
import Features from '../components/Features.jsx';
import PhotosUploader from '../components/PhotosUploader.jsx';
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from 'react-router-dom';
import AccountNav from '../components/AccountNav.jsx';


export default function AccommodationsFormPage() {
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [type, setType] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState([]);
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/accommodations/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setType(data.type)
            setAddress(data.address);
            setCity(data.city);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setFeatures(data.features);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        })

    }, [id]);
    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    function preInput(header) {
        return (
            <>
                {inputHeader(header)}
            </>
        );
    }

    //if we have id we update otherwise we save new accommodation
    async function saveNewAccommodation(ev) {
        ev.preventDefault();
        const accommodationData = {
            title,address,type,addedPhotos,city,
            description, features, extraInfo,
            checkIn,checkOut,maxGuests,price
        };
        if (id) {
            //update
            await axios.put('/accommodations', {
                id, ...accommodationData
            });
            setRedirect(true)
        } else {
            //new accommodation
            await axios.post('/accommodations', accommodationData)
            setRedirect(true)
        };
    }

    if (redirect) {
        return <Navigate to={'/account/accommodations'} />
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={saveNewAccommodation}>
                {preInput('Title')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder='Ex: Bright and spacious cabin' />
                {preInput('City')}
                <input type="text" value={city} onChange={ev => setCity(ev.target.value)} placeholder='city' />
                {preInput('Adress')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder='address' />
                {preInput('Type')}
                <input type="text"
                    value={type}
                    onChange={ev => setType(ev.target.value)}
                    placeholder='type of accommodation' />
                {preInput('Photos')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                {preInput('Description')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                {preInput('Accommodation features')}
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Features selected={features} onChange={setFeatures} />
                </div>
                {preInput('Extra Information')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                {preInput('Check in & Check out')}
                <div className='grid gap-2 sm:grid-cols-3 md:grid-cols-4'>
                    <div>
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input type="text"
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)}
                            placeholder='14.00' />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input type="text"
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)}
                            placeholder='11.00'
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                        <input type="number"
                            value={maxGuests}
                            onChange={ev => setMaxGuests(ev.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price per night</h3>
                        <input type="number" value={price}
                            onChange={ev => setPrice(ev.target.value)} />
                    </div>
                </div>
                <button className=' my-4 primary'>Save</button>
            </form>
        </div>
    )
}

