import Label from "./Label";
import Input from "./Input";
import "./ShowPasswordField.css";

import { useState } from "react";

function ShowPasswordField({ id, placeholder, children }) {
	const [inputType, setInputType] = useState("password");

	const showPassword = () => setInputType(inputType === "password" ? "text" : "password");

	return (
		<div className="ShowPasswordField">
			<Label htmlFor={id}>{children}</Label>
			<Input id={id} type={inputType} placeholder={placeholder} />
			<i
				className={`ShowPasswordFieldIcon ${
					inputType === "password" ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"
				}`}
				onClick={showPassword}
			></i>
		</div>
	);
}

export default ShowPasswordField;
