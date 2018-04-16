import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { firebaseApp } from '../firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { userRef } from '../firebase';
import Error from './Error';
// injectTapEventPlugin();
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            error: {
                message: ''
            }
        }
    }
    signUp() {
        const { email, password } = this.state;
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            .then(userInfo => {
                const nestedRef = userRef.child(userInfo.uid + '/');
                nestedRef.set({
                    email: userInfo.email,
                    role: this.props.match.params.role,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    phoneNumber: this.state.phoneNumber,
                })
                    .then(result => {
                        this.props.history.push("/list");
                    }).catch(error => {
                        this.setState({ error })
                    });
            })
            .catch(error => {
                console.log("errr", error)
                this.setState({ error })
            });
    }


    render() {
        console.log(this.props)
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title='Welcome to Banquet Booking App' style={{ marginLeft: '-12%', width: '123.5%' }} />
                    <h1 style={{ textAlign: 'center' }}>Banquet APP</h1>
                    <div className='form-block' style={{ margin: '5%' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h2>Sign Up</h2>
                        </div>
                        <div className='form-group' style={{ marginLeft: '20%', marginRight: '20%' }}>
                            <div> <input className="form-control reg-input" type="text" placeholder='email' onChange={event => this.setState({ email: event.target.value })} /></div>
                            <div> <input className="form-control reg-input" type="text" placeholder='First Name' onChange={event => this.setState({ firstName: event.target.value })} /></div>
                            <div> <input className="form-control reg-input" type="text" placeholder='Last Name' onChange={event => this.setState({ lastName: event.target.value })} /></div>
                            <div> <input className="form-control reg-input" type="text" placeholder='Phone Number' onChange={event => this.setState({ phoneNumber: event.target.value })} /></div>

                            <div><input className='form-control reg-input' type="password" placeholder='Password' onChange={event => this.setState({ password: event.target.value })} /></div>
                        </div>

                        <div style={{ marginTop: '5px', textAlign: 'center' }}>
                            <button className='btn btn-primary' type='button' onClick={() => this.signUp()}>Sign Up</button>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '5px' }}>
                            <Link to='/signin'> Already a user? Sign in instead</Link>
                        </div>
                        <Error />
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default SignUp;
