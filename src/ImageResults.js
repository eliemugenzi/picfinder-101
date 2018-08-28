import React, { Component } from "react";
import PropTypes from "prop-types";
import { GridList, GridTile } from "material-ui/GridList";
import IconButton from "material-ui/IconButton";
import ZoomIn from "material-ui/svg-icons/action/zoom-in";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

class ImageResult extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      currentImg: ""
    };
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  };
  handleOpen = img => {
    this.setState({
      currentImg: img,
      open: true
    });
  };
  render() {
    let imageListContent;
    const { images } = this.props;
    if (images) {
      imageListContent = (
        <GridList cols={3}>
          {images.map(img => (
            <GridTile
              title={img.tags}
              key={img.id}
              subtitle={
                <span>
                  By <strong>{img.user}</strong>
                </span>
              }
              actionIcon={
                <IconButton
                  onClick={this.handleOpen.bind(this, img.largeImageURL)}
                >
                  <ZoomIn color="white" />
                </IconButton>
              }
            >
              <img src={img.largeImageURL} alt={img.tags} />
            </GridTile>
          ))}
        </GridList>
      );
    } else {
      imageListContent = null;
    }

    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose.bind(this)}
      />
    ];
    return (
      <div>
        {imageListContent}
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
        >
          <img src={this.state.currentImg} alt="" style={{ width: "100%" }} />
        </Dialog>
      </div>
    );
  }
}

ImageResult.propTypes = {
  images: PropTypes.array.isRequired
};

export default ImageResult;
