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
    img.src = this.props.src;
    img.onload = this.fitImage(img)

  }

  componentDidUpdate(){

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
        width: w})
    fabric.Image.fromURL(this.props.src, (oImg)=>{
          oImg.scaleToHeight(h);
          oImg.scaleToWidth(w);
          this.fabricCanvas.add(oImg)
          this.fabricCanvas.renderAll()
          this.setState({readyCanvas:true}, ()=>{
            this.props.mountFabric(this.fabricCanvas)
          })
          
          

    })
    
  }

  componentWillUnmount() {
  }


  render() {
    return (
      <ul>{(this.state.readyCanvas) ?
          (<canvas ref={this.props.canvasId}
      id={this.props.canvasId} styles={{"display":"none"}}/>) : (
      <canvas ref={this.props.canvasId}
      id={this.props.canvasId}/>)
        
      }</ul>


    )
  }
}

export default Canvas;