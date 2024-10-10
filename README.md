
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign In / Sign Up</title>
    <style>
        body {
            background-image: url('https://img.freepik.com/free-vector/retro-styled-pattern-background_1048-6593.jpg');
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
        }
        .container {
            background-color: rgba(255, 255, 255, 0.8);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        .hidden {
            display: none;
        }
        button, input {
            margin: 10px;
            padding: 10px;
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
