<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HomePage</title>
    <style>
        /* Enable dark mode by setting a dark background and light text */
        body {
            background-color: #121212;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
            margin: 0;
        }

        .container {
            background-color: #1e1e1e;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
        }

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

        .hidden {
            display: none;
        }

        #startButton {
            /* Hides the "Press || This" button after being clicked */
            visibility: hidden;
        }

        #authButtons button {
            width: 150px;
        }
    </style>
</head>
<body>

<div class="container">
    <button id="startButton">Press || This</button>

    <div id="authButtons" class="hidden">
        <button id="signInButton">Sign In</button>
        <button id="signUpButton">Sign Up</button>
    </div>

    <div id="signUpForm" class="hidden">
        <h3>Create Account</h3>
        <input type="text" id="newUsername" placeholder="Username"><br>
        <input type="password" id="newPassword" placeholder="Password"><br>
        <button id="createAccountButton">Create Account</button>
    </div>

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

    startButton.addEventListener('click', () => {
        authButtons.classList.toggle('hidden');
        startButton.style.visibility = 'hidden';  // Hide the "Press || This" button when clicked
    });

    signUpButton.addEventListener('click', () => {
        authButtons.classList.add('hidden');
        signUpForm.classList.remove('hidden');
    });

    signInButton.addEventListener('click', () => {
        authButtons.classList.add('hidden');
        signInForm.classList.remove('hidden');
    });

    document.getElementById('createAccountButton').addEventListener('click', () => {
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;

        if (newUsername && newPassword) {
            const user = { username: newUsername, password: newPassword };
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            message.textContent = `Account created! Welcome, ${newUsername}.`;
            signUpForm.classList.add('hidden');
            // Redirect to home page or perform additional actions
        } else {
            message.textContent = 'Please enter both a username and a password.';
        }
    });

    document.getElementById('loginButton').addEventListener('click', () => {
        const loginUsername = document.getElementById('loginUsername').value;
        const loginPassword = document.getElementById('loginPassword').value;

        const user = users.find(u => u.username === loginUsername && u.password === loginPassword);

        if (user) {
            message.textContent = `Welcome back, ${loginUsername}!`;
            signInForm.classList.add('hidden');
            // Redirect to home page or perform additional actions
        } else {
            message.textContent = 'Invalid login information.';
        }
    });
</script>

</body>
</html>
