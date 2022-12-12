import React, {useState} from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";

function RegistrationForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        confirmPassword: "",
        name:"",
        phoneNumber:"",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = () => {
        if(state.email.length && state.password.length 
            && state.name.length && state.phoneNumber.length) {
            props.showError(null);
            const payload={
                "email":state.email,
                "password":state.password,
                "name":state.name,
                "phoneNumber":state.phoneNumber,
            }
            axios.post(API_BASE_URL+'register', payload)
                .then(function (response) {
                    if(response.data.code === 200){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Registration successful. Redirecting to home page..'
                        }))
                        redirectToHome();
                        props.showError(null)
                    } else{
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });    
        } else {
            props.showError('Please enter valid username and password')    
        }
        
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login'); 
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            sendDetailsToServer()    
        } else {
            props.showError('Passwords do not match');
        }
    }

        const renderForm = (
    <div className="form">
            <form>
        <div className="input-container">
        <h6 className="header-desc">Create your account to join </h6>
        <p className="body-desc1">Create an account and discover the best market place</p>
        </div>

        <div className="input1">
                <div className="input-container">
                <label htmlFor="exampleInputName"><p>Name</p></label>
                <input type="text" 
                    //    className="form-control" 
                       id="name" 
                       required 
                       placeholder="Your Name"
                    //    aria-describedby="nameHelp"
                       value={state.name}
                       onChange={handleChange}
                />
                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>

                
                <div className="input-container">
                <label htmlFor="exampleInputPhone number"><p>Phone number</p></label>
                <input type="text"
                    //    className="form-control" 
                       id="number" 
                       required 
                       placeholder="Your Number"
                    //    aria-describedby="numberHelp"
                       value={state.number}
                       onChange={handleChange}
                />
                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>



                <div className="input-container">
                <label htmlFor="exampleInputEmail"><p>Email</p></label>
                <input type="email" 
                    //    className="form-control" 
                       id="email" 
                       required 
                       placeholder="Your Email"
                    //    aria-describedby="EmailHelp"
                       value={state.email}
                       onChange={handleChange}
                />
                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>

                <div className="input-container">
                    <label htmlFor="exampleInputPassword1"><p>Password</p></label>
                    <input type="password" 
                        // className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange} 
                    />
                </div>

                {/* <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange} 
                    />
                </div> */}
                </div>

        <div className="button-container">
                <button 
                    type="submit"
                    onClick={handleSubmitClick}
                >
                    REGISTER
                </button>
        </div>

        <p className="body-desc">Have an account ? <span className="text-tick" onClick={() => redirectToLogin()}>Sign in</span></p>
        <p className="body-desc">By clckng register, you agree to our <span className="text-tick">Terms and Data Policy</span></p>
        </form>
    </div>
    );

    
  return (
    <div className="login">
      <div className="login-form">
        <div className="title">
          <h5>WELCOME</h5>
          </div>
          {renderForm}
      </div>
            <div style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
    </div>
  );

}

export default withRouter(RegistrationForm);