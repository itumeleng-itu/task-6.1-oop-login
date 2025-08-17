class UserAuth {
  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl;
  }

  async signup(username, email, password) {
    const res = await fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    return res.json();
  }

  async login(username, password) {
    const res = await fetch(`${this.baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return res.json();
  }

  async logout() {
    const res = await fetch(`${this.baseUrl}/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  }

  async getProfile() {
    const res = await fetch(`${this.baseUrl}/profile`);
    return res.json();
  }
}

window.UserAuth = UserAuth;
