import { useState } from "react";
import loginService from "../services/login";

const LoginForm = ({ loginUser }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (event) => {
		event.preventDefault();

		const user = await loginService.login({
			username,
			password,
		});

		loginUser(user);
	};

	return (
		<div>
			<h2>Login</h2>

			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						value={username}
						onChange={(event) => setUsername(event.target.value)}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	);
};

export default LoginForm;
