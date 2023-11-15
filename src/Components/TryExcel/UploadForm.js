// // Based on https://gist.github.com/AshikNesin/e44b1950f6a24cfcd85330ffc1713513

// // import React from 'react'
// import axios, { AxiosResponse } from 'axios';
// import React from "react";
// import { render } from "react-dom";
// import { Box, Grommet, grommet } from "grommet";




// export class UploadForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userId: 0,
//       file: null,
//     };
//   }



//   async submit(e) {
//     e.preventDefault();
  
//     const url = `https://localhost:7251/finalUpload/${this.state.userId}`;
//     const formData = new FormData();
//     formData.append('file', this.state.file, this.state.file.name); // add the file to the form data
//     const config = {
//       headers: {
//         'content-type': 'multipart/form-data',
//       },
//     };
    
//     try {
//       const response = await axios.post(url, formData, config);
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//   }
  
//   setFile(e) {
//     this.setState({ file: e.target.files[0] });
//   }

//   render() {
//     return (
    
//       <form onSubmit={e => this.submit(e)}>
//         <h1>File Upload</h1>
//         <input type="file" onChange={e => this.setFile(e)} />
//         <button type="submit">Upload</button>
//       </form>

    
//     );
//   }
// }
