import React, { Component } from 'react';
import '../../../src/App.css'

class LandingPage extends Component {
     constructor(props) {
        super(props);

    }

    OnClickHandlersignUp = (e) => {
        this.props.history.push("/signup")
    }

     OnClickHandlerlogin = (e) => {
        this.props.history.push("/login")
    }

    componentDidMount = (e) => {
     
    }


    render() {
      
        return (
      
        <div className="mainContainer">
                <div className="flexContainer-row">
                    <div className="flex-left">   
                    </div>
                    <div className="flex-right">
                        <button className="button-grey" onClick={this.OnClickHandlersignUp}>SignUp</button>
                        <button className="button-dark" onClick={this.OnClickHandlerlogin}>Login</button>
                    </div>
                </div> 

                <div className="flexContainer-column">
                    <div className="flex-top">
                        <div className="flexContainer-row">
                            <div className="flex-left">
                            </div>
                            <div className="flex-right">
                                <p className="tittle"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
                                <p className="tittle">Cloud-Ways &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
                                
                            </div>
                        </div>
                    </div>
                </div>

        </div>
      
        )
    }
}

export default LandingPage;