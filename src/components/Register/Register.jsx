import { createUserWithEmailAndPassword } from "firebase/auth"
import auth from "../../firebase/firebase.config"
import { useState } from "react"

const Register = () => {
    const [registerError, setRegisterError] = useState("");
    const [registerSuccess, setRegisterSuccess] = useState('');

    const handleRegister = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.pass.value
        console.log(email, password)

        // reser error & success message
        setRegisterError('');
        setRegisterSuccess("");


        // Create user
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user)
                setRegisterSuccess("Registration Successfully!");
            })
            .catch((error) => {
                console.log(error)
                setRegisterError(error.message)
            })
    }
    return (
        <section className="w-full mt-10 flex items-center justify-center">
            <div className="w-full md:w-[480px] mx-auto p-4 bg-slate-800 shadow-md rounded-2xl">
                <h2 className="text-2xl font-semibold text-center pb-5">Registration</h2>
                <form onSubmit={handleRegister} className="flex flex-col gap-3">
                    <input type="email" name="email" placeholder="Type here" className="input input-bordered input-success w-full" />
                    <input type="password" name="pass" placeholder="Password" className="input input-bordered input-success w-full" />
                    <button className="btn btn-success">Register</button>
                </form>
                {registerError && <p className="text-red-500">Email Already in use. Pls try another email.</p>}
                {registerSuccess && <p className="text-green-600">{ registerSuccess}</p>}
            </div>
        </section>
    )
}

export default Register
