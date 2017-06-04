import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/shared/App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import registerServiceWorker from './registerServiceWorker';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

injectTapEventPlugin()

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#ffd905',
  }
});

const Setup = () => {
    return <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <App />
    </MuiThemeProvider>
}

ReactDOM.render(<Setup />, document.getElementById('root'));

registerServiceWorker();
