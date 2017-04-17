import React, { Component } from 'react';
import classNames from 'classnames';

class IngredientList extends Component {
    constructor(props) {
    super(props);
  this.state = {};
  this.removeIngredient = this.removeIngredient.bind(this);
  }
         removeIngredient(e) {
         e.preventDefault();
         var index = e.target.value;
         console.log(this.props.showButtons);
       this.props.removeIngredientFromState(index);
    }
  

    
    displayIngredients() {
        
        let resultsArray = [];
        this.props.recipe.ingredients.map((item,i) => {
       
            return resultsArray.push(<li key={i}> {item.quantity} - {item.ingredient} <button value={i} onClick={this.removeIngredient} className={classNames("btn btn-xs btn-danger", {'hide':!this.props.showButtons})}>X</button></li>);
        });
        return resultsArray;
    }
    render() {
        return(
          <ul>
          {this.displayIngredients()} 
          </ul>
          
            );
    }
}

export default IngredientList;    