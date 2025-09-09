document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simple demo login validation
    if(email === "demo@game.com" && password === "123456") {
        alert("Login successful!");
        window.location.href = "index.html"; // redirect to game
    } else {
        alert("Invalid email or password");
    }
});

document.getElementById('registerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    // Demo registration
    alert(`Account created for ${username}!`);
    window.location.href = "login.html"; // redirect to login
});
