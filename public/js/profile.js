const auth = new UserAuth();

document.addEventListener("DOMContentLoaded", async () => {
    const res = await auth.getProfile();

    if (!res.ok || !res.data || res.data.loggedIn !== 1) {
    window.location.href = "index.html";
    return;
    }

    
    document.getElementById("pUsername").textContent = res.data.username;
    document.getElementById("pEmail").textContent = res.data.email;

    const createdAt = new Date(res.data.createdAt)
    document.getElementById("pCreatedAt").textContent = createdAt.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
    document.getElementById("pLoggedIn").textContent = res.data.loggedIn === 1 ? "true" : "false";
    document.getElementById("profileData").style.display = "block";
});

document.getElementById("signOutBtn").addEventListener("click", async () => {
    const out = await auth.logout();
    if (out.ok) window.location.href = "index.html";
    else document.getElementById("profileMsg").textContent = "Sign out failed.";
});