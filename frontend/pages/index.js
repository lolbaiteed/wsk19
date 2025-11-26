import { useState } from "react"
import { useRouter } from "next/navigation";

export default function LoginForm({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const resp = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({email: email, password: password}),
            });


            const data = await resp.json();

            if (resp.ok) {
                setEmail('');
                setPassword('');
                router.push('/admin/dashboard');
            }

            if (onLoginSuccess) {
                onLoginSuccess(data)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen min-w-screen flex justify-center align-center">
            <div className="w-full max-w-xs">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 -pb-8 mb-4">
                    <div className="mb-4">
                        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
                    </div>
                    <div className="mb-6">
                        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"></input>
                    </div>
                    <div className="flex items-center justify-center">
                        <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"> {loading ? 'Loading...' : "Log in"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}