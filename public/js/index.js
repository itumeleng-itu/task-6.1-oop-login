const auth = new UserAuth();

document.addEventListener("DOMContentLoaded", async () => {
    const res = await auth.getProfile();
    if (res.ok) window.location.href = "profile.html";
});

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;

    const result = await auth.login(username, password);

    if (result.ok) {
    window.location.href = "profile.html";
    } else {
    document.getElementById("loginMsg").textContent =
        result.message || "Login failed. Check your credentials.";
    }
});
