// react, fabric and styles
import React, { Component } from 'react';
import { fabric } from 'fabric';

class Canvas extends Component {
  constructor(props){
    super(props);
    this.state = {
      readyCanvas:false
    };


  }

  componentDidMount(){

    var img = new Image();
    img.validate="always"
    img.src = this.props.src;
    img.onload = ()=> {this.fitImage(img)}
    img.onerror = (e) => {this.handleImgLoadError(e)}

  }

  componentDidUpdate(){

  }

  handleImgLoadError(e){
    console.log(e)
  }

  fitImage(img){
    //Calculate scale
    var scale_width = window.innerWidth / img.width;
    var scale_height = window.innerHeight / img.height;
    var scale = Math.min(scale_width, scale_height) * .6;

    //Resize
    var h = img.height * scale;
    var w = img.width * scale;
    

    this.fabricCanvas = new fabric.Canvas(this.props.canvasId, 
      {...this.props.canvasOpts,
        height: h,
        width: w,
        selectable:false,
        evented:false,
        hasControls:false,
      })

    fabric.Image.fromURL(this.props.src, (oImg)=>{
        this.setState({readyCanvas:true}, ()=>{
              this.props.mountFabric(this.fabricCanvas, oImg, h, w)
            })
      })
    
  }

  componentWillUnmount() {
  }


  render() {              
            
    return (
      <ul><canvas ref={this.props.canvasId}
        id={this.props.canvasId}

         /></ul>


    )
  }
}

export default Canvas;