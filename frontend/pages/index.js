import { useState } from "react"

export default function LoginForm({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

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
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center align-center">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className=""></input>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                <button type="submit" disabled={loading}> {loading ? 'Loading...' : "Log in"}</button>
            </div>
        </form>
    );
}