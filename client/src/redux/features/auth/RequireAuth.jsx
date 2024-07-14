import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

    useEffect(() => {
        console.log('isLoading:', isLoading);
        console.log('isAuthenticated:', isAuthenticated);
        if (!isLoading && !isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, isLoading, navigate]);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <>{children}</> : null;
};

export default RequireAuth;
