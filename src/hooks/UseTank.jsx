import { useQuery } from "@tanstack/react-query";
import USeAxioseSecure from "./USeAxioseSecure";


const UseTank = () => {
    const axiosSecure = USeAxioseSecure();
    //const { user} = useAuth();
    const {refetch,data: users = [] } = useQuery({
        queryKey: ['cart'],
        queryFn: async() => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    return [users,refetch]
};

export default UseTank;