import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import backendServer from '../../WebConfig/webconfig';
import {Redirect} from 'react-router';
import {add_user} from '../../actions/user_action'
import { connect } from 'react-redux';
import GenericHeader from '../GenricHeader/GenericHeader';

const connection_to_redux = (state) => {
    return {
        user: state.user
    }
}

class Dashboard extends Component {

       constructor(props) {
        super(props);
          this.state = {
            userID : "",
            emailID : "" ,
            type:""
        }

    }

    componentDidMount() {
       //get the data from local storage 
       const data_to_be_stored = {
            userID: localStorage.getItem('userID'),
            emailID: localStorage.getItem('emailID'),
            type: localStorage.getItem('type')

        }
        //dispatch data to redux
        this.props.dispatch(add_user(data_to_be_stored))

    }
     
    render() {
      
        return (
      
        <div className="mainContainerDashboard">   
            <div className="flexContainer-column">
                <div className="flex-top-header">
                    <GenericHeader props={this.props}/> 
                </div>
                <div className="flex-top-header">
                    <div className="flexContainer-row-withoutgap">
                        <div className="flex-left-searchbar">
                            <div className="flexContainer-row-withoutgap">
                                    <div className="flex-right">
                                        <h2>date</h2>
                                    </div>
                                    <div className="flex-left">
                                        <input type="text" placeholder="Search......" className="searchbar" />
                                    </div>
                            </div>
                           
                        </div>
                        <div className="flex-right">
                            <button className="button-grey">Search</button>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
        
      
        )
    }
}

export default connect(connection_to_redux)(Dashboard);