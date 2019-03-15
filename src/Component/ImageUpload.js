import React, { Component } from 'react';
import {storage} from '../firebase';


class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            imgurl: '',
            imgProgress: 0 
         }
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.imageUpload = this.imageUpload.bind(this);
    }
    fileSelectedHandler = event => {
        if(event.target.files[0]) {
            const image = event.target.files[0];
          this.setState(() => ({image}));
        }
    }
    imageUpload = () => {
        const {image} = this.state;
        const uploadSelectedImage = storage.ref(`image/${image.name}`).put(image);
        uploadSelectedImage.on('state_changed',
        (snapshot) => {
           //It showing the progress bar when file is uploading.
           const imgProgress = Math.round((snapshot.bytesTrasferred / snapshot.totalBytes) * 100);  
           this.setState({imgProgress});  
        }, 
        (error) => {
             //Showing error
             console.log(error);
        },
        () => {
             //this function fetch the data from firebase and set the fetched Url on state of the component
             storage.ref('image').child(image.name).getDownloadURL().then(imgurl => {
                 this.setState({imgurl});
             })
        });
    }
    render() {
        return(
            <div>
               <progress value={this.state.imgProgress} max="100"/>
               <br />
               <input type="file" onChange={this.fileSelectedHandler}/>
               <button onClick={this.imageUpload}>Upload</button>
               <br />
               <img src={this.state.imgurl || 'http://via.placeholder.com/150'} alt="Uploaded images" height="200" width="300" />
                
            </div>
        );
    }
}

export default ImageUpload;