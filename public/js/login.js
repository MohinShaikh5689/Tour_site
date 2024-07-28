import { showAlert } from "./alert";

export const login = async (email, password) => {
    try {
        const res = await fetch('http://localhost:3000/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        
        const data = await res.json();

        if (data.status === 'success') {
            showAlert('success','Logged in successfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        } else {
            throw new Error(data.message || 'Login failed');
        }
    } catch (err) {
        console.error(err);
        showAlert('error',err.message);
    }
};

export const logout = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/v1/users/logout', {
            method: 'GET'
        });

        const data = await res.json();

        if (data.status === 'success') {
            location.reload(true);
        } else {
            throw new Error(data.message || 'Logout failed');
        }
    } catch (err) {
        console.error(err);
        showAlert('error',err.message);
    }
}

