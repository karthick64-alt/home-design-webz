// Login form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(loginForm);
        const email = formData.get('email');
        const password = formData.get('password');
        
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Set current user
            localStorage.setItem('currentUser', JSON.stringify(user));
            showNotification('Login successful!', 'success');
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1000);
        } else {
            showNotification('Invalid email or password', 'error');
        }
    });
}

// Signup form
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(signupForm);
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        
        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        
        const user = {
            id: Date.now(),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            password: password,
            createdAt: new Date().toISOString()
        };
        
        // Get existing users
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if email already exists
        if (users.find(u => u.email === user.email)) {
            showNotification('Email already registered', 'error');
            return;
        }
        
        // Add new user
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Set current user
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        showNotification('Account created successfully!', 'success');
        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 1000);
    });
}

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

// Get current user
function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

// Logout
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Facebook Login
const facebookLogin = document.getElementById('facebookLogin');
if (facebookLogin) {
    facebookLogin.addEventListener('click', () => {
        // Simulate Facebook login (in production, this would use Facebook SDK)
        showNotification('Facebook login would be implemented with Facebook SDK', 'info');
        
        // For demo purposes, create a temporary user
        const demoUser = {
            id: Date.now(),
            firstName: 'Facebook',
            lastName: 'User',
            email: `facebook_${Date.now()}@demo.com`,
            password: null,
            loginMethod: 'facebook',
            createdAt: new Date().toISOString()
        };
        
        // Get existing users
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if user exists, if not add them
        let user = users.find(u => u.loginMethod === 'facebook' && u.email === demoUser.email);
        if (!user) {
            users.push(demoUser);
            localStorage.setItem('users', JSON.stringify(users));
            user = demoUser;
        }
        
        // Set current user
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        showNotification('Logged in with Facebook!', 'success');
        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 1000);
    });
}

// Google Login
const googleLogin = document.getElementById('googleLogin');
if (googleLogin) {
    googleLogin.addEventListener('click', () => {
        // Simulate Google login (in production, this would use Google Sign-In API)
        showNotification('Google login would be implemented with Google Sign-In API', 'info');
        
        // For demo purposes, create a temporary user
        const demoUser = {
            id: Date.now(),
            firstName: 'Google',
            lastName: 'User',
            email: `google_${Date.now()}@demo.com`,
            password: null,
            loginMethod: 'google',
            createdAt: new Date().toISOString()
        };
        
        // Get existing users
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if user exists, if not add them
        let user = users.find(u => u.loginMethod === 'google' && u.email === demoUser.email);
        if (!user) {
            users.push(demoUser);
            localStorage.setItem('users', JSON.stringify(users));
            user = demoUser;
        }
        
        // Set current user
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        showNotification('Logged in with Google!', 'success');
        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 1000);
    });
}

// Facebook Signup
const facebookSignup = document.getElementById('facebookSignup');
if (facebookSignup) {
    facebookSignup.addEventListener('click', () => {
        // Simulate Facebook signup (in production, this would use Facebook SDK)
        showNotification('Facebook signup would be implemented with Facebook SDK', 'info');
        
        // For demo purposes, create a new user
        const demoUser = {
            id: Date.now(),
            firstName: 'Facebook',
            lastName: 'User',
            email: `facebook_${Date.now()}@demo.com`,
            password: null,
            loginMethod: 'facebook',
            createdAt: new Date().toISOString()
        };
        
        // Get existing users
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Add new user
        users.push(demoUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Set current user
        localStorage.setItem('currentUser', JSON.stringify(demoUser));
        
        showNotification('Account created with Facebook!', 'success');
        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 1000);
    });
}

// Google Signup
const googleSignup = document.getElementById('googleSignup');
if (googleSignup) {
    googleSignup.addEventListener('click', () => {
        // Simulate Google signup (in production, this would use Google Sign-In API)
        showNotification('Google signup would be implemented with Google Sign-In API', 'info');
        
        // For demo purposes, create a new user
        const demoUser = {
            id: Date.now(),
            firstName: 'Google',
            lastName: 'User',
            email: `google_${Date.now()}@demo.com`,
            password: null,
            loginMethod: 'google',
            createdAt: new Date().toISOString()
        };
        
        // Get existing users
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Add new user
        users.push(demoUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Set current user
        localStorage.setItem('currentUser', JSON.stringify(demoUser));
        
        showNotification('Account created with Google!', 'success');
        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 1000);
    });
}


