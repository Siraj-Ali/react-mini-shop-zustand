import { useAuthStore } from "../stores/authStore"

export const Login = () => {
    const login = useAuthStore((state) => state.login);
    return (
        <>
            <div className="container" style={{ marginTop: 16 }}>
              <h2>Login</h2>
              <p className="muted">
                Use username: <strong>admin</strong> and password:{" "}
                <strong>1234</strong>
              </p>
              <button className="btn" onClick={() => login("user", "12455")}>
                Login
              </button>
              <button
                className="btn"
                style={{ marginLeft: 8 }}
                // onClick={() => logout()}
              >
                Logout
              </button>
            </div>
        </>
    )
}