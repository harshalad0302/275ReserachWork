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

class Login extends Component {
    constructor(props) {
        super(props);
            this.state = {
            emailID: "",
            userID : "",
            password: "",
            type : "",
            authFlag:false,
            error_message:""
        }

    }

    OnClickHandlerback = (e) => {
        this.props.history.push("/")
    }

     OnClickHandlersignup = (e) => {
        this.props.history.push("/signup")
    }

    componentDidMount = (e) => {
     
    }
    UserNameChangeHandler = (e) => {
            this.setState({
                emailID : e.target.value
            })
        }
    PasswordChangeHandler = (e) => {
            this.setState({
                password : e.target.value
            })
        }

         submitLogin =  async (e) => 
        {
                console.log("login submitted");
                e.preventDefault();
                const data = {
                    emailID: this.state.emailID,
                    password: this.state.password
                }

            const response =  await axios.post(`${backendServer}/login`,data)
            console.log(response);
            if(response.data.authFlag === "S"){
                this.props.dispatch(add_user(response.data))
                //adding data to local storage 
                localStorage.setItem('emailID', response.data.emailID)
                localStorage.setItem('type', response.data.type)
                localStorage.setItem('userID', response.data.userID)
                localStorage.setItem('firstName', response.data.firstName)
                localStorage.setItem('lastName', response.data.lastName)
                this.props.history.push("/dashboard");
                
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
                        <button className="button-dark" onClick={this.OnClickHandlersignup}>SignUp</button>
                    </div>
                </div> 
                <div className="flexContainer-row">
                     <div className="flex-left-signup">
                       
                    </div>
                    <div className="flex-right-signup">
                            <div className="flexContainer-column">
                                <div className="flex-top-signup">
                                   <h3>Clod-Ways Account</h3>
                                </div>
                                <div className="flex-top-signup">
                                    <input type="text" className="inputFiled" placeholder="username" onChange={this.UserNameChangeHandler}/>
                                </div>
                                 <div className="flex-top-signup">
                                    <input type="password" className="inputFiled" placeholder="password" onChange={this.PasswordChangeHandler}/>
                                </div>            
                                 <div className="flex-top-signup">
                                    <button className="button-dark" onClick={this.submitLogin}>Login</button>
                                </div>
                                 <div className="flex-top-signup">
                                    {this.state.authFlag && <div className="ErrorMessage">{this.state.error_message} </div>}
                                 </div>
                            </div> 
                    </div>
                
                </div>

        </div>
        )
    }
}

export default connect(connection_to_redux)(Login);