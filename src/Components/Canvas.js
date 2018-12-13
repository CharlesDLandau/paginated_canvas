// react, fabric and styles
import React, { Component } from 'react';
import { fabric } from 'fabric';

class Canvas extends Component {
  constructor(props){
    super(props);
    this.state = {
    };

  }

  componentDidMount(){

    var canvasOpts = {
        backgroundColor: 'white',
        selection:false,
      }
    this.fabricCanvas = new fabric.Canvas(this.props.canvasId, canvasOpts)


    
    var img = new Image();
    img.src = this.props.src
    img.onload = this.imageHandler(img) 
  }

  imageHandler(img){
       


      this.fabricCanvas.setWidth(img.width)
      this.fabricCanvas.setHeight(img.height)
      this.fabricCanvas.calcOffset()
      fabric.Image.fromURL(img.src, (oImg)=>{
            this.fabricCanvas.add(oImg)
            this.props.registerFabric(this.fabricCanvas);
      })
    
  }

  componentWillUnmount() {
  }

  renderMain(){
    return <canvas ref={this.props.canvasId}
      id={this.props.canvasId}/>
  }

  render() {
    const renderMain = this.renderMain()
    return (
      <ul>{renderMain}</ul>
    )
  }
}

export default Canvas;