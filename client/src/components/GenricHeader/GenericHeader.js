import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import backendServer from '../../WebConfig/webconfig';
import {Redirect} from 'react-router';
import {remove_user} from '../../actions/user_action'
import { connect } from 'react-redux';
import DefaultProfilePcture from '../../assests/Image/Profile_Picture_default.png';
import HeaderImage from '../../assests/Image/HeaderImagePlane.jfif';

const connection_to_redux = (state) => {
    return {
        user: state.user
    }
}

class GenericHeader extends Component {

       constructor(props) {
        super(props);
          this.state = {
            userID : "",
            emailID : "" ,
            type:""
        }

    }
    
   submitLogout = async(e) => {
         localStorage.clear();
         this.props.dispatch(remove_user())
        this.props.props.history.push("/")
       

    }
  
    render() {
      
        return (
      
        <div className="flexContainer-column">
            <div className="flex-top-header">
               <div className="flexContainer-row-withoutgap">
                    <div className="flex-left">
                        <img src={HeaderImage} className="headerImage" />
                    </div>
                    <div className="flex-right"> 
                        <div className="flexContainer-row-withoutgap">
                            <div className="flex-right">
                                <img src={DefaultProfilePcture} className="DefaultProfileStyle"></img>
                            </div>
                        <div className="flex-left">
                            <div className="dropdown">
                                <button className="button-dark">{localStorage.getItem('firstName')}</button>
                                <div className="dropdown-content">
                                    <a>Your Account</a>
                                    <a onClick={this.submitLogout}>Logout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
               </div>
            </div>
         {this.state.authFlag && <div className="ErrorMessage">{this.state.error_message} </div>}
        </div>
      
        )
    }
}

export default connect(connection_to_redux)(GenericHeader);