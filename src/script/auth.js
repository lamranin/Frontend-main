import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const signUp = async (userData) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: userData }),
        });

        if (!response.ok) {
            let errorMessage = 'Failed to sign up';
            if (response.headers.get('Content-Type')?.includes('application/json')) {
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (error) {
                    console.error('Error parsing error response:', error);
                }
            }
            toast.error(errorMessage);

        } else {
            const responseData = await response.json();
            toast.success('Signed up successfully!', { autoClose: 2000 }, { position: "top-center" });
            return responseData.user;
        }


    } catch (error) {
        console.error('Error signing up:', error);

    }
}

export const signIn = async (userData) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            let errorMessage = 'Failed to sign in';
            if (response.headers.get('Content-Type')?.includes('application/json')) {
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (error) {
                    console.error('Error parsing error response:', error);
                }
            }
            toast.error(errorMessage);
        } else {
            const responseBody = await response.json();
            localStorage.setItem('token', responseBody.accessToken);
            localStorage.setItem('userId', responseBody.userId);
            return responseBody;
        }
    } catch (error) {
        console.error('Error signing in:', error);

    }
}
