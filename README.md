<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HomePage</title>
    <style>
        /* Ensure the background image is shown and covers the full screen */
        body {
            background-image: url('https://img.freepik.com/free-vector/retro-styled-pattern-background_1048-6593.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
            margin: 0;
            color: #ffffff;
        }

        /* Dark mode styling for the container */
        .container {
            background-color: rgba(30, 30, 30, 0.9); /* Dark background with transparency */
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
        }

        /* Styling for buttons and input fields with circular edges */
        button, input {
            margin: 10px;
            padding: 10px;
            border: none;
            border-radius: 30px; /* Circular edges */
            cursor: pointer;
            font-size: 16px;
        }

        button {
            background-color: #3b3b3b;
            color: #ffffff;
        }

        button:hover {
            background-color: #555555;
        }

        input {
            background-color: #2c2c2c;
            color: #ffffff;
        }

        /* Hide elements initially */
        .hidden {
            display: none;
        }

        /* Ensure the "Press || This" button is visible initially */
        #startButton {
            visibility: visible;
        }

        #authButtons button {
            width: 150px;
        }

    </style>
</head>
<body>

<div class="container">
    <!-- The button will be visible and usable when users access the page -->
    <button id="startButton">Press || This</button>

    <!-- Authentication buttons hidden initially -->
    <div id="authButtons" class="hidden">
        <button id="signInButton">Sign In</button>
        <button id="signUpButton">Sign Up</button>
    </div>

    <!-- Sign up form hidden initially -->
    <div id="signUpForm" class="hidden">
        <h3>Create Account</h3>
        <input type="text" id="newUsername" placeholder="Username"><br>
        <input type="password" id="newPassword" placeholder="Password"><br>
        <button id="createAccountButton">Create Account</button>
    </div>

    <!-- Sign in form hidden initially -->
    <div id="signInForm" class="hidden">
        <h3>Sign In</h3>
        <input type="text" id="loginUsername" placeholder="Username"><br>
        <input type="password" id="loginPassword" placeholder="Password"><br>
        <button id="loginButton">Log In</button>
    </div>

    <div id="message"></div>
</div>

<script>
    let users = JSON.parse(localStorage.getItem('users')) || [];

    const startButton = document.getElementById('startButton');
    const authButtons = document.getElementById('authButtons');
    const signInButton = document.getElementById('signInButton');
    const signUpButton = document.getElementById('signUpButton');
    const signUpForm = document.getElementById('signUpForm');
    const signInForm = document.getElementById('signInForm');
    const message = document.getElementById('message');

    // Show the authentication buttons and hide the "Press || This" button when clicked
    startButton.addEventListener('click', () => {
        authButtons.classList.remove('hidden');
        startButton.style.visibility = 'hidden';  // Hide the "Press || This" button after clicking
    });

    // Show the sign-up form
    signUpButton.addEventListener('click', () => {
        authButtons.classList.add('hidden');
        signUpForm.classList.remove('hidden');
    });

    // Show the sign-in form
    signInButton.addEventListener('click', () => {
        authButtons.classList.add('hidden');
        signInForm.classList.remove('hidden');
    });

    // Handle account creation
    document.getElementById('createAccountButton').addEventListener('click', () => {
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;

        if (newUsername && newPassword) {
            const user = { username: newUsername, password: newPassword };
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            message.textContent = `Account created! Welcome, ${newUsername}.`;
            signUpForm.classList.add('hidden');
            // Additional actions after account creation can go here (e.g., redirect to home page)
        } else {
            message.textContent = 'Please enter both a username and a password.';
        }
    });

    // Handle login
    document.getElementById('loginButton').addEventListener('click', () => {
        const loginUsername = document.getElementById('loginUsername').value;
        const loginPassword = document.getElementById('loginPassword').value;

        const user = users.find(u => u.username === loginUsername && u.password === loginPassword);

        if (user) {
            message.textContent = `Welcome back, ${loginUsername}!`;
            signInForm.classList.add('hidden');
            // Additional actions after successful login can go here (e.g., redirect to home page)
        } else {
            message.textContent = 'Invalid login information.';
        }
    });
</script>

</body>
</html>
