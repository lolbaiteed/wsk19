export default function dashboard() {
    async function fetchData() {
        try {
            const resp = await fetch('http://localhost:3000/api/admin/dashboard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
            })

            if (!resp.ok) throw new Error;

            const data = await resp.json()

            console.log(data);
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                console.error(error.message);
            }
        }

    }

    fetchData();

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}