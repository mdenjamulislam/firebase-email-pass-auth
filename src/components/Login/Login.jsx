import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import auth from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

const Login = () => {
    const [showPassword, setShowPassword] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [loginSuccess, setLoginSuccess] = useState();

    const emailRef = useRef(null);

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.pass.value;

        console.log(email, password);
        // reser error & success message
        setErrorMessage("");
        setLoginSuccess("");

        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                if (result.user.emailVerified) {
                    setLoginSuccess("Login Successfully!");
                } else {
                    alert("Please check your email and verify.");
                }
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    };

    const handleForgetPass = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const email = emailRef.current.value;
        if (!email) {
            console.log("Please rpovide an email address.");
            return;
        } else if (!emailRegex.test(email)) {
            console.log("Please provide a valid email.");
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then((result) => {
                setLoginSuccess("Recovery Email send Successfully!");
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    };
    return (
        <section className="w-full mt-10 flex items-center justify-center">
            <div className="w-full md:w-[480px] mx-auto p-4 bg-slate-800 shadow-md rounded-2xl">
                <h2 className="text-2xl font-semibold text-center pb-5">Login</h2>
                <form onSubmit={handleLogin} className="flex flex-col gap-3">
                    <input ref={emailRef} type="email" name="email" placeholder="Type email" required className="input input-bordered input-success w-full" />
                    <div className="flex items-center relative">
                        <input type={showPassword ? "text" : "password"} name="pass" placeholder="Password" required className="input input-bordered input-success w-full" />

                        <button className="absolute right-2" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                        </button>
                    </div>
                    <div className="flex items-center justify-between gap-5">
                        <div className="form-control">
                            <label className="cursor-pointer flex items-center gap-2">
                                <input type="checkbox" name="terms" id="terms" className="checkbox checkbox-accent" />
                                <span className="label-text">Remember me</span>
                            </label>
                        </div>
                        <div className="form-control">
                            <a onClick={handleForgetPass} className="cursor-pointer">
                                Forget Password
                            </a>
                        </div>
                    </div>
                    <button className="btn btn-primary">Login</button>
                    <p>
                        Don't have any account? <Link to="/register">Register Now</Link>
                    </p>
                </form>
                {errorMessage && <p className="text-warning">{errorMessage}</p>}
                {loginSuccess && <p className="text-green-600">{loginSuccess}</p>}
            </div>
        </section>
    );
};

export default Login;
