import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function dashboard() {

    const router = useRouter();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post("http://localhost:3000/api/admin/dashboard",
                    undefined,
                    {withCredentials: true}
                );

                const result = await response.data;
                setData(result);
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false);
            }
        }

        fetchData()
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:3000/api/auth/logout",
                undefined,
                {withCredentials: true}
            );

            router.replace('/');
        } catch (error) {
            setError(error)
        }
    }

    

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <>
            <div className="flex flex-row justify-between bg-gray-800 text-white min-h-12 text-center font-light">
                <div className="flex justify-center border-r border-gray-400 min-h-12">
                    <h1 className="self-center px-7">dashboard</h1>
                </div>
                <button type="button" onClick={handleLogout} className="bg-none mr-3 font-medium">Logout</button>
            </div>
            <div>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        </>
    )
}