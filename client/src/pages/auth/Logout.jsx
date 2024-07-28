import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '@/redux/features/auth/authSlice';
import { useLogoutMutation } from '@/redux/features/auth/authApiSlice';
import io from 'socket.io-client';

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();
    const socket = io(import.meta.env.VITE_BACKEND_URL);

    useEffect(() => {
        const performLogout = async () => {
            try {
                const response = await logout().unwrap();
                if (response.status === 'success') {
                    // Emit logout event to server
                    socket.emit('userLogout');

                    // Properly disconnect the Socket.IO connection
                    socket.disconnect();

                    // Dispatch the logout action
                    dispatch(logoutAction());

                    // Navigate to the login page
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

        // Cleanup function to disconnect socket on component unmount
        return () => {
            if (socket.connected) {
                socket.emit('userLogout');
                socket.disconnect();
            }
        };
    }, [logout, dispatch, navigate]);

    return <div>Logging out...</div>;
};

export default Logout;
