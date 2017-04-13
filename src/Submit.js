import React, { Component } from 'react';

import Dropzone from 'react-dropzone';
import request from 'superagent';

import Ingredients from './Ingredients';
import IngredientList from './IngredientList';

const CLOUDINARY_UPLOAD_PRESET = 'rxnuoauc';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dlksliyac/upload';



class Submit extends Component {
    constructor(props){
        super(props);
        this.state={
            recipes: JSON.parse(localStorage.getItem('recipes')) || [],
            newRecipe: {
                name: "New Recipe",
                description: "Description",
                ingredients: [],
            },
                uploadedFileCloudinaryUrl: ''
            }
       
        this.submitRecipe = this.submitRecipe.bind(this);
        this.onImageDrop = this.onImageDrop.bind(this);
    }
    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });
        this.handleImageUpload(files[0]);
        
    }
    handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }
    
    submitRecipe() {
        console.log(this.name.value);
        console.log(this.description.value);
        let newRecipe = this.state.newRecipe;
        newRecipe.name = this.name.value;
        newRecipe.description = this.description.value;
        newRecipe.image = this.state.uploadedFileCloudinaryUrl;
        this.setState({newRecipe});
       
        let recipes = this.state.recipes;
        recipes.push(newRecipe);
        this.setState({recipes});
        localStorage.setItem('recipes', JSON.stringify(recipes));
         console.log(recipes);
        this.props.history.push('/');
    }
    
    addIngredient(quantity, ingredient) {
        console.log("Add ingredients in Submit.js", quantity, ingredient);
        let newRecipe = this.state.newRecipe;
        newRecipe.ingredients.push({quantity:quantity, ingredient:ingredient});
        this.setState({newRecipe: newRecipe});
        console.log(newRecipe);
    }
    
    render() {
        return(
            <div className="container">
         
            <div className="row">
                <div className="col-xs-12 col-sm-12">
                   <h1> Submit! </h1>
                  <form>
                  <Dropzone
                  multiple={false}
                  accept="image/*"
                  onDrop={this.onImageDrop}>
                  <p> Drop an image or click to upload an image file </p>
                  </Dropzone>
                  <div>
                    
                          <div>
                            {this.state.uploadedFileCloudinaryUrl === '' ? null :
                            <div>
                              <p>{this.state.uploadedFile.name}</p>
                              <img alt={this.state.uploadedFile.name} src={this.state.uploadedFileCloudinaryUrl} />
                            </div>}
                          </div>
                        </div>
                  
                  <div className="form-group">
                   <label htmlFor="name"> Name: </label>
                   <input
                   ref={(input) =>{this.name = input;}}
                   type="text"
                   className="form-control" 
                   id="name" 
                   placeholder="Enter the name of your recipe!" />
                   </div>
                   <div className="form-group">
                     <label htmlFor="description"> Description </label>
                   <textarea 
                   ref={(input) => {this.description = input}}
                   className="form-control" 
                   id="description" 
                   placeholder="Enter a brief description" />
                   </div>  
                   <IngredientList recipe={this.state.newRecipe}/>
                  <Ingredients addIngredient={(quantity, ingredient) => {this.addIngredient(quantity, ingredient)}} />

                    <button className="btn btn-default" type="submit" onClick={this.submitRecipe}> Submit Your Dish! </button>
                   </form>
                </div>
                </div>
            
            </div>
            )
    }
}


export default Submit