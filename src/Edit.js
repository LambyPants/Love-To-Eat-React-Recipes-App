import React, { Component } from 'react';
import axios from 'axios';
import request from 'superagent';
import Dropzone from 'react-dropzone';
import Ingredients from './Ingredients';
import IngredientList from './IngredientList';

const CLOUDINARY_UPLOAD_PRESET = 'rxnuoauc';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dlksliyac/upload';


class Edit extends Component {
	 constructor(props) {
    super(props);
      this.state={
            newRecipe: {
                name: "",
                description: "",
                cloudinaryURL: "",
                ingredients: [],
            },
                uploadedFileCloudinaryUrl: ''
            };
           this.loadRecipeFromServer = this.loadRecipeFromServer.bind(this);
           this.onImageDrop = this.onImageDrop.bind(this);
           this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
           this.handleNameChange = this.handleNameChange.bind(this);
           this.addIngredient = this.addIngredient.bind(this);
           this.submitRecipe = this.submitRecipe.bind(this);

  }
    loadRecipeFromServer() {
      axios.get(`/edit/${this.props.match.params.id}`)
      .then(response => {
        this.setState({newRecipe: response.data.foundRecipe});
        this.setState({uploadedFileCloudinaryUrl: this.state.newRecipe.cloudinaryURL});
    
      })
        .catch(function (error) {
    console.log(error);
  }); }
	
  componentDidMount(){
     console.log("This is the edit route!");
      this.loadRecipeFromServer();
    
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
    const newRecipe = this.state.newRecipe;

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      newRecipe.cloudinaryURL = this.state.uploadedFileCloudinaryUrl;
      this.setState({newRecipe:newRecipe});
      }
    )}
  
      addIngredient(quantity, ingredient) {
        console.log("Add ingredients in Edit.js", quantity, ingredient);
        let newRecipe = this.state.newRecipe;
        console.log(newRecipe.ingredients);
        newRecipe.ingredients.push({quantity:quantity, ingredient:ingredient});
        this.setState({newRecipe: newRecipe});
    }
      removeIngredientFromState(index) {
  
        let currentRecipe = this.state.newRecipe;
        console.log(currentRecipe.ingredients);
        currentRecipe.ingredients.splice(index,1);
        console.log(currentRecipe.ingredients);
        console.log(currentRecipe);
        this.setState({newRecipe:currentRecipe});
          console.log("Removed ingredients in Edit.js");
   
        
    }
  

    
  handleDescriptionChange(e){
    let newDesc = this.state.newRecipe;
    newDesc.description = e.target.value;
    this.setState({newRecipe: newDesc});
    console.log(e.target.value);
  }
    handleNameChange(e){
    let newName = this.state.newRecipe;
    newName.name = e.target.value;
    this.setState({newRecipe: newName});
    console.log(e.target.value);
  }
  submitRecipe() {
        console.log(this.state.newRecipe.name.value);
        console.log(this.state.newRecipe.description.value);
        let newRecipe = this.state.newRecipe;
        this.setState({newRecipe});
       
        axios.put(`/edit/${this.props.match.params.id}`, {recipes: this.state.newRecipe})
  .then(response => {
    console.log(response.config.data);
  });
         console.log(newRecipe);
        this.props.history.push('/');
    }
    
    
    

  render() {
    return (
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
                             
                              <img alt={this.state.uploadedFile} src={this.state.uploadedFileCloudinaryUrl} />
                            </div>}
                          </div>
                        </div>
                  
                  <div className="form-group">
                   <label htmlFor="name"> Name: </label>
                   <input
                   onChange={this.handleNameChange}
                   type="text"
                   className="form-control" 
                   id="name" 
                   value={this.state.newRecipe.name} />
                   </div>
                   <div className="form-group">
                     <label htmlFor="description"> Description </label>
                   <textarea 
                   onChange={this.handleDescriptionChange}
                   className="form-control" 
                   id="description" 
                   value={this.state.newRecipe.description}/>
                   </div>  
                   <IngredientList showButtons={true} removeIngredientFromState={(index) => {this.removeIngredientFromState(index)}} recipe={this.state.newRecipe}/>
                  <Ingredients addIngredient={(quantity, ingredient) => {this.addIngredient(quantity, ingredient)}} />

                    <button className="btn btn-default" type="submit" onClick={this.submitRecipe}> Submit Your Dish! </button>
                   </form>
                </div>
                </div>
            
            </div>
);
}}

export default Edit;
