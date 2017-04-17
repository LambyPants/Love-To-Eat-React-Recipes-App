import React, { Component } from 'react';
import axios from 'axios';
import {
  Link,
} from 'react-router-dom';



class UpdateAndDestroyButtons extends Component {
	 constructor(props) {
    super(props);
  this.state = {};
  this.deleteButton = this.deleteButton.bind(this);
  }


deleteButton(){
     axios.delete(`${this.props.url}/${this.props.uniqueID}`)
 .then(res => {
 console.log("Deleted");
 }).catch(function (error) {
    console.log(error);
 });
 this.props.loadCommentsFromServer(this.props.editValue); 
}


	
  render() {
    return (
      <div>
     
	<Link to={`/edit/${this.props.uniqueID}`}> <button className="btn btn-warning btn-xs"> Edit </button> </Link>

	<button className="btn btn-danger btn-xs" onClick={this.deleteButton}> Delete </button>
    </div>
);
}}

export default UpdateAndDestroyButtons;
