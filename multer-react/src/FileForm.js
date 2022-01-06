import React, {Component} from 'react';
import axios from 'axios';

class FileForm extends Component{

  handleSubmit = (e)=>{
    e.preventDefault();
    // console.log("Form Submitted");
    const file = document.getElementById('file-field').files[0];
    const file2 = document.getElementById('file-field2').files[0];
    const url = 'http://localhost:3000/uploadFiles';
    const config = {
      headers: {'Content_Type': 'multipart/form-data' }
    };
    const data = new FormData();
    data.append('meme', file);
    data.append('meme', file2);
    // for(let pair of data.entries()) {
    //   console.log(pair[0]);
    //   console.log(pair[1]);
    // }
    axios.post(url, data, config).then(response => {
      console.log(response.data);
    })
  }

  render(){
    return(
      <div>
        <h1>Sanity Check</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="file" name="meme" id="file-field" />
          <input type="file" name="meme" id="file-field2" />
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}

export default FileForm;