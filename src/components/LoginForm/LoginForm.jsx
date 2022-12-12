import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";

function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload={
            "email":state.email,
            "password":state.password,
        }
        axios.post(API_BASE_URL+'login', payload)
            .then(function (response) {
                if(response.data.code === 200){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Login successful. Redirecting to home page..'
                    }))
                    redirectToHome();
                    props.showError(null)
                }
                else if(response.data.code === 204){
                    props.showError("Username and password do not match");
                }
                else{
                    props.showError("Username does not exists");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToRegister = () => {
        props.history.push('/register'); 
        props.updateTitle('Register');
    }
   
        const renderForm = (
    <div className="form">
            <form>
                
        <div className="input-container">
        <h6 className="header-desc">Sign in to your account </h6>
        <p className="body-desc1">Get into the right atmosphere for your creativity</p>
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
                <label htmlFor="exampleInputEmail"><p>Email</p></label>
                <input type="email"
                    //    className="form-control" 
                       id="number" 
                       required 
                       placeholder="Your Email"
                    //    aria-describedby="numberHelp"
                       value={state.number}
                       onChange={handleChange}
                />
                </div>
            </div>

                <div className='input2'>
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
        <div className="button-container">
                <button 
                    type="submit"
                    onClick={handleSubmitClick}
                >
                    LOGIN
                </button>
        </div>
        </div>
        <p className="body-desc">Have an account ? <span className="text-tick"  onClick={() => redirectToRegister() }>Register</span></p>
        <p className="body-desc">By clIckIng register, you agree to our <span className="text-tick">Terms and Data Policy</span></p>
        </form>
</div>
);

  return (
    <div className="login">
      <div className="login-form">
        <div className="title">
          <h5>SIGN IN</h5>
          </div>
          {renderForm}
      </div>
            <div style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
    </div>

 );

}

export default withRouter(LoginForm);