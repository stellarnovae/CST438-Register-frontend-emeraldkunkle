import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'
import Grid from '@mui/material/Grid';
import {DataGrid} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

// NOTE:  for OAuth security, http request must have
//   credentials: 'include' 
//

// properties year, semester required
//  shgsf
//  NOTE: because SchedList is invoked via <Route> in App.js  
//  props are passed in props.location

class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = { student: {name: '', email: ''} };
  } 
  


  // Add student
  addStudent = (student) => {
    const token = Cookies.get('XSRF-TOKEN');
	console.log(student);
    fetch(`${SERVER_URL}/addStudent`,
      { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json',
                   'X-XSRF-TOKEN': token  }, 
        body: JSON.stringify(student)
      })
    .then(res => {
        if (res.ok) {
          toast.success("Student successfully added", {
              position: toast.POSITION.BOTTOM_LEFT
          });
        } else {
          toast.error("Error when adding", {
              position: toast.POSITION.BOTTOM_LEFT
          });
          console.error('Post http status =' + res.status);
        }})
    .catch(err => {
      toast.error("Error when adding", {
            position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err);
    })
  } 
  
    handleNameChange = (event) => {
       var tempStudent = this.state.student;
	   tempStudent.name = event.target.value;
	   this.setState({student: tempStudent})
    }
	
	handleEmailChange = (event) => {
       var tempStudent2 = this.state.student;
	   tempStudent2.email = event.target.value;
	   this.setState({student: tempStudent2})
    }
  
  render() {
  
  return(
		<div>
		<AppBar position="static" color="default">
		            <Toolbar>
               <Typography variant="h6" color="inherit">
                  { 'Add New Student' }
                </Typography>
            </Toolbar>
		</AppBar>
		<div className="App">
            <div style={{width:'100%'}}>
                For DEBUG:  display state.
                {JSON.stringify(this.state)}
            </div>
			<Grid container spacing={3} justifyContent="center" alignItems="center" paddingTop={10}>
			<Grid item>
                  <TextField autoFocus fullWidth label="Student Name:" name="name" 
					onChange={this.handleNameChange}
					/>
				  </Grid>
			<Grid item>
                  <TextField autoFocus fullWidth label="Student Email:" name="email"  
				    onChange={this.handleEmailChange}
				    />
				  </Grid>
			</Grid>
			<Button color="primary" onClick={this.addStudent(this.state.student)}>Add</Button>
			</div>
		</div>
      ); 
  }
}

export default AddStudent;