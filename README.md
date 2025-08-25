# User Auth Demo

![App Screenshot](public/repo-image.png)

A simple Node.js + Express + SQLite user authentication demo with sign up, login, and profile pages.

---

## Setup & Run

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd task-6.1
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start the server**
   ```sh
   nodemon server
   ```
   The app will run at [http://localhost:3000](http://localhost:3000).

4. **Open in your browser**
   - Go to [http://localhost:3000](http://localhost:3000)

---

## Example Credentials

You can create your own accounts, or use these for testing (if already created):

- **Username:** `testuser`
- **Email:** `test@example.com`
- **Password:** `test123`

---

## Notes

- All user data is stored in a local SQLite database (`users.db`).
- Only one user can be "logged in" at a time (for demo simplicity).
- To reset users, delete the `users.db` file and restart the server.

---

## Repo Image

Place your repo image at:  
```
public/repo-image.png
```
This image will appear at the top of