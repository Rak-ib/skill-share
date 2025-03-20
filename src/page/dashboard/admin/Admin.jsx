import { useEffect, useState } from "react";
import AdminSub from "./AdminSub";


const Admin = () => {
     const [applica, setApplica] = useState([]); 
    useEffect(() => {
        fetch('http://localhost:5000/applyadmin')
            .then(res => res.json())
            .then(data => setApplica(data));
    }, []);

    const handleBookingConfirm = id => {
        fetch(`http://localhost:5000/applyadmin/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'confirm' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    // update state
                    const remaining = applica.filter(booking => booking._id !== id);
                    const updated = applica.find(booking => booking._id === id);
                    updated.status = 'confirm'
                    const newBookings = [updated, ...remaining];
                    setApplica(newBookings);
                }
            })
    }


    return (
        <div>
            <h1 className="text-4xl text-center border-b-2 mt-4 font-semibold">Admin Pannel</h1>
            <h1 className="text-2xl text-center border-b-2 mt-4 font-semibold">Total Application: {applica.length}</h1>
            <div className="grid grid-cols-3 gap-6">
                 {
                    applica.map(booking =>
                        <AdminSub 
                        key={booking._id}
                        booking={booking}
                        handleBookingConfirm={handleBookingConfirm}
                        ></AdminSub>
                    )
                 }
            </div>
        </div>
    );
};

export default Admin;