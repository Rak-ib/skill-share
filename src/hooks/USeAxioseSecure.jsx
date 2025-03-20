import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const USeAxioseSecure = () => {
    
    return axiosSecure;
};

export default USeAxioseSecure;