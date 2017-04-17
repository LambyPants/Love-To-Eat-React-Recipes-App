import React, { Component } from 'react';
import IngredientList from './IngredientList';
import axios from 'axios';
import UpdateAndDestroyButtons from './updateAndDestroyButtons'

class Home extends Component {
    constructor(props) {
       super(props);
       this.state = {
           recipes: []
       };
       this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    }
    
 loadCommentsFromServer(e) {
    console.log("loading recipes from database!");
    axios.get('/recipes')
      .then(response => {
        this.setState({ recipes: response.data.recipes});
      })
        .catch(function (error) {
    console.log(error);
  }); 
     
 }
  
  componentDidMount(){
      this.loadCommentsFromServer();
  }
    
    displayRecipes() {
      let resultsArray = [];
        this.state.recipes.map((recipe) =>  {
       
              return resultsArray.push(
               <div key={recipe['_id']} className="col-sm-6 col-md-4">
                    <div className="thumbnail">
               <img src={recipe.cloudinaryURL} alt={recipe.name} />
                 <div className="caption">
                <h3>{recipe.name} </h3>
                <p>{recipe.description}</p>
                   <IngredientList recipe={recipe} />
                    </div>
                    <UpdateAndDestroyButtons uniqueID={recipe['_id']} url={'/recipes'} loadCommentsFromServer={()=>this.loadCommentsFromServer()} />
                  </div>
               </div>
               );
        });
        return resultsArray;
    }
    render() {
        return(
            <div className="container">
            
            <h1> Home! </h1>
            <div className="row">
            {this.displayRecipes()}
            </div>
            </div>
            );
    }
}

export default Home;