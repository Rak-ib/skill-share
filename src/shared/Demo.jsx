//import { useEffect, useState } from "react";
import UseTank from "../hooks/UseTank";


const Demo = () => {
    // const [users, setUsers] = useState([]); 
    // useEffect(() => {
    //     fetch('http://localhost:5000/users')
    //         .then(res => res.json())
    //         .then(data => setUsers(data));
    // }, []);

    //......................OR...................
    //const [users,refetch]=UseTank();
     const [users]=UseTank();

    return (
        <div className="mt-20">
             <h1 className="text-2xl">This is Demo Page</h1>
             <h2>Length: {users.length}</h2>
             
             {/* refetch(); */}
        </div>
    );
};

export default Demo;