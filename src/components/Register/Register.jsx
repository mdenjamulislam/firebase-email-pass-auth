const Register = () => {
    const handleRegister = e => {
        e.preventDefault();
        console.log(e);
    }
    return (
        <section className="w-full mt-10 flex items-center justify-center">
            <div className="w-full md:w-[480px] mx-auto p-4 bg-slate-800 shadow-md rounded-2xl">
                <h2 className="text-2xl font-semibold text-center pb-5">Registration</h2>
                <form onSubmit={handleRegister} className="flex flex-col gap-3">
                    <input type="email" name="email" placeholder="Type here" className="input input-bordered input-success w-full" />
                    <input type="current-password" name="pass" placeholder="Password" className="input input-bordered input-success w-full" />
                    <button className="btn btn-success">Register</button>
                </form>
            </div>
        </section>
    )
}

export default Register
