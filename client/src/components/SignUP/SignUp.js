import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import backendServer from '../../WebConfig/webconfig';
import {Redirect} from 'react-router';
import {add_user} from '../../actions/user_action'
import { connect } from 'react-redux';

const connection_to_redux = (state) => {
    return {
        user: state.user
    }
}


class SignUp extends Component {

        constructor(props) {
        super(props);
          this.state = {
            firstName: "",
            userID : "",
            password  : "",
            lastName :"",
            emailID : "" ,
            phoneNumber:"",
            authFlag:false,
            error_message:""
        }

    }

    OnClickHandlerback = (e) => {
        this.props.history.push("/")
    }

     OnClickHandlerlogin = (e) => {
        this.props.history.push("/login")
    }

    componentDidMount = (e) => {
        this.setState({
                authFlag : false
            })
    }

    firstNameChangeHandler = (e) => {
            this.setState({
                firstName : e.target.value
            })
        }
    passwordChangeHandler = (e) => {
            this.setState({
                password : e.target.value
            })
        }
    lastNameChangeHandler = (e) => {
            this.setState({
                lastName : e.target.value
            })
        }
    emailIDChangeHandler = (e) => {
            this.setState({
                emailID : e.target.value
            })
        }
    phoneNumberChangeHandler = (e) => {
            this.setState({
                phoneNumber : e.target.value
            })
        }
    
    submitRegister =  async (e) => 
        {
                console.log("submitRegister");
                e.preventDefault();
                const data = {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    emailID: this.state.emailID,
                    phoneNumber: this.state.phoneNumber,
                    password: this.state.password

                }

            const response =  await axios.post(`${backendServer}/signup`,data)
            console.log(response);
            if(response.data.authFlag === "S"){
                //add data to redux
                this.props.dispatch(add_user(response.data))
                //add data to local storage
                localStorage.setItem('emailID', response.data.emailID)
                localStorage.setItem('type', response.data.type)
                localStorage.setItem('userID', response.data.userID)
                localStorage.setItem('firstName', response.data.firstName)
                localStorage.setItem('lastName', response.data.lastName)
                this.props.history.push("/dashboard")

            }else{
                            this.setState({
                            authFlag: true,
                            error_message: <div>
                                {

                                    response.data.message.map((error_message, index) => {
                                        return (
                                            <div key={index}>
    
                                                    <li>{error_message}</li>
                                                
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        })
            }

         }

    render() {

        
      
        return (
             <div className="mainContainerSignup">
                <div className="flexContainer-row">
                    <div className="flex-left">   
                    </div>
                    <div className="flex-right">
                        <button className="button-grey" onClick={this.OnClickHandlerback}>Back</button>
                        <button className="button-dark" onClick={this.OnClickHandlerlogin}>Login</button>
                    </div>
                </div> 
                <div className="flexContainer-row">
                     <div className="flex-left-signup">
                       
                    </div>
                    <div className="flex-right-signup">
                            <div className="flexContainer-column">
                                <div className="flex-top-signup">
                                   <h3>Create Account</h3>
                                </div>
                                <div className="flex-top-signup">
                                    <input type="text" className="inputFiled" placeholder=" First Name" onChange={this.firstNameChangeHandler}/>
                                </div>
                                 <div className="flex-top-signup">
                                    <input type="text" className="inputFiled" placeholder="Last name" onChange={this.lastNameChangeHandler} />
                                </div>
                                 <div className="flex-top-signup">
                                    <input type="text" className="inputFiled" placeholder="Email ID" onChange={this.emailIDChangeHandler}/>
                                </div>
                                 <div className="flex-top-signup">
                                    <input type="text" className="inputFiled" placeholder="Phone Number" onChange={this.phoneNumberChangeHandler}/>
                                </div>
                                 <div className="flex-top-signup">
                                    <input type="password" className="inputFiled" placeholder="Password" onChange={this.passwordChangeHandler}/>
                                </div>
                               
                                 <div className="flex-top-signup">
                                    <button className="button-dark" onClick={this.submitRegister}>Register</button>
                                </div>
    
                                 {this.state.authFlag && <div className="ErrorMessage">{this.state.error_message} </div>}
                            </div> 
                    </div>
                
                </div>

        </div>
        )
    }
}

export default connect(connection_to_redux)(SignUp);