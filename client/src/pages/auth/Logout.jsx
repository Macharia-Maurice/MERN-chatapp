import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '@/redux/features/auth/authSlice';
import { useLogoutMutation } from '@/redux/features/auth/authApiSlice';

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();

    useEffect(() => {
        const performLogout = async () => {
            try {
                const response = await logout().unwrap();
                if (response.status === 'success') {
                    dispatch(logoutAction());
                    navigate('/login');
                } else {
                    console.error('Logout failed: ', response.message);
                    navigate('/login');
                }
            } catch (error) {
                console.error('Logout failed: ', error);
                navigate('/login');
            }
        };

        performLogout();
    }, [logout, dispatch, navigate]);

    return <div>Logging out...</div>;
};

export default Logout;
