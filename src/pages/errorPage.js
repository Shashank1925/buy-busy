import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
export default function ErrorPage() {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate(-1)
        }, 3000)
    }, [navigate]);

    return (
        <div>
            <h1 style={{
                color: "red",
                fontSize: "larger",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>404 Page not found</h1>
        </div>
    )
}