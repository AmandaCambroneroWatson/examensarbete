import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function IndexPage() {
    const [accommodations, setAccommodations] = useState([])

    useEffect(() => {
        axios.get('/accommodations').then(response => {
            setAccommodations(response.data)
            
        })

    }, []);


    return (

        <div>
            <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {accommodations.length > 0 && accommodations.map(accommodation => (
                    <Link to={'/accommodation/' + accommodation._id}>
                        <div className="bg-gray-500 rounded-2xl  mb-2 flex">
                            {accommodation.photos?.[0] && (
                                <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/' + accommodation.photos?.[0]} alt="" />
                            )}
                        </div>
                        <h2 className="font-bold text-sm">{accommodation.address}</h2>
                        <h3 className="text-sm  text-neutral-500 truncate leading-4">{accommodation.title}</h3>

                        <div className="">
                            <span className="text-sm truncate font-bold">${accommodation.price} </span> per night
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )

}