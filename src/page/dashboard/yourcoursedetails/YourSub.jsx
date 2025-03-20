
const YourSub = ({booking}) => {
    const {course_id, course_name, number_of_instructor, starting_date,price }=booking;
    return (
        <div className="">
        <div className="card w-1/2 bg-base-100 shadow-xl p-8 text-xl">
            <h1>Course ID: {course_id}</h1>
            <h1>Course Name: {course_name}</h1>
            <h1>No.of Instructor: {number_of_instructor}</h1>
            <h1>Start Date: {starting_date}</h1>
            <h1>Total Price: {price}</h1>
        
        </div>
    </div>
    );
};

export default YourSub;