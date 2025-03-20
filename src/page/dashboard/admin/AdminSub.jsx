

const AdminSub = ({ booking,handleBookingConfirm }) => {
    const { _id,
        per_name,
        p_num,
        con_name,
        profile,
        nid,
        uniID,
        date,
        price,
        description,
        education,
        email,
        status } = booking;

    console.log(price, description, education)

    return (
        <div className="">
            <div className="card  bg-base-100 shadow-xl p-8 text-xl">
                <h1>Name: {per_name}</h1>
                <h1>Phone: {p_num}</h1>
                <h1>Content: {con_name}</h1>
                <h1>Profile:  <img className="h-[100px]" src={profile} alt="" /> </h1>
                <h1>NID:  <img className="h-[100px]" src={nid} alt="" /> </h1>
                <h1>StuID  <img className="h-[100px]" src={uniID} alt="" /> </h1>
                <h1>Date: {date}</h1>
                <h1>Email: {email}</h1>
                <div className="mt-4">
                    {
                        status === 'confirm' ? <span className="font-bold border-2 p-2 px-6 bg-green-600  text-white">Approved</span>
                            : <button onClick={() => handleBookingConfirm(_id)} className="btn w-full text-xm border-2 bg-black text-white ">Pending</button>
                    }
                </div>

            </div>
        </div>
    );
};

export default AdminSub;