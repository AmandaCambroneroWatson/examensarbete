
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import AccommodationImg from '../components/AccommodationImg.jsx';
import AccountNav from '../components/AccountNav.jsx';

export default function AccommodationsPage() {
    const [accommodations, setAccommodations] = useState([]);
    useEffect(() => {
        axios.get('/user-accommodations').then(({ data }) => {
            setAccommodations(data);
        });
    }, []);
    return (
        <div>
            <AccountNav />
            <div className='text-center'>
                <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/accommodations/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>
                    Add new accommodation
                </Link>
            </div>
            <div className="mt-4">
                {accommodations.length > 0 && accommodations.map(accommodation => (
                    <Link to={'/account/accommodations/' + accommodation._id} className="flex cursor-pointer gap-4 bg-gray-200 p-4 rounded-2xl mb-4" key={accommodation}>
                        <div className="flex w-32 h-32 bg-gray-300 grow shrink-0 rounded-2xl">
                            <AccommodationImg accommodation={accommodation} className="rounded-2xl"/>
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{accommodation.title}</h2>
                            <p className="text-sm mt-2 line-clamp-3">{accommodation.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
