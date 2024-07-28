import { showAlert } from './alert.js';

export const signup = async (name, email, password, passwordConfirm) => {
    if (password !== passwordConfirm) {
        showAlert('error', 'Passwords do not match');
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/api/v1/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
                passwordConfirm
            })
        });
             
        const data = await res.json();
        console.log(data);

        if (data.status === 'success') {
            showAlert('success', 'Signed up successfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        } else {
            throw new Error(data.message || 'Signup failed');
        }
    } catch (err) {
        console.error(err);
        showAlert('error', err.message);
    }
};
