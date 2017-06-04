import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Routes from './Routes';
import Drawer from 'material-ui/Drawer';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleClose = () => this.setState({open: false});
  toggleDrawer = () => this.setState({open: !this.state.open});

  render() {
    const { title } = this.props;
    return <div>
      <AppBar title={title} onLeftIconButtonTouchTap={() => this.toggleDrawer()} />
      <Routes />
      <Drawer open={this.state.open} >
          <AppBar title={title} onLeftIconButtonTouchTap={() => this.handleClose()} />
      </Drawer>
    </div>
  }
}

export default App;
