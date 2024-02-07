import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Register = () => {
    const [registerError, setRegisterError] = useState("");
    const [registerSuccess, setRegisterSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.pass.value;
        const accepted = e.target.terms.checked;
        console.log(email, password, accepted);

        // reser error & success message
        setRegisterError("");
        setRegisterSuccess("");

        if (password.length < 6) {
            setRegisterSuccess("Password should be at leasr 6 characters or longer");
            return;
        } else if (!/[A-Z]/.test(password)) {
            setRegisterError("Your password not full-fill our requirement");
            return;
        } else if (!accepted) {
            setRegisterError("Please accepted our terms and conditions.");
            return;
        }

        // Create user
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user);
                setRegisterSuccess("Registration Successfully!");

                sendEmailVerification(result.user).then(() => {
                    alert("Verification email send to ", email);
                });
            })
            .catch((error) => {
                console.log(error);
                setRegisterError(error.message);
            });
    };
    return (
        <section className="w-full mt-10 flex items-center justify-center">
            <div className="w-full md:w-[480px] mx-auto p-4 bg-slate-800 shadow-md rounded-2xl">
                <h2 className="text-2xl font-semibold text-center pb-5">Registration</h2>
                <form onSubmit={handleRegister} className="flex flex-col gap-3">
                    <input type="text" name="name" placeholder="Type your name" required className="input input-bordered input-success w-full" />
                    <input type="email" name="email" placeholder="Type your email" required className="input input-bordered input-success w-full" />
                    <div className="flex items-center relative">
                        <input type={showPassword ? "text" : "password"} name="pass" placeholder="Password" required className="input input-bordered input-success w-full" />

                        <button className="absolute right-2" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                        </button>
                    </div>
                    <div className="form-control">
                        <label className="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" name="terms" id="terms" className="checkbox checkbox-accent" />
                            <span className="label-text">I agree with the terms & conditions</span>
                        </label>
                    </div>
                    <button className="btn btn-success">Register</button>
                    <p>
                        I have an account. <Link to="/login">Login</Link>
                    </p>
                </form>
                {registerError && <p className="text-red-500">{registerError}</p>}
                {registerSuccess && <p className="text-green-600">{registerSuccess}</p>}
            </div>
        </section>
    );
};

export default Register;
