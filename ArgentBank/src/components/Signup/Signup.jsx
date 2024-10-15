// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";



const Signup = () => {
    return (
        <main className="login">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon" />
                <h1>Sign Up</h1>
                <form >
                    <div className="input-wrapper">
                        <label htmlFor="email">email</label>
                        <input
                            type="text"
                            id="email"
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">password</label>
                        <input
                            type="text"
                            id="password"
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="firstName">firstName</label>
                        <input
                            type="text"
                            id="firstName"
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="lastName">lastName</label>
                        <input
                            type="text"
                            id="lastName"
                            required
                        />
                    </div>
                    <button type='submit' className="sign-in-button">Sign Up</button>
                </form>
            </section>
        </main>
    )
}

export default Signup
