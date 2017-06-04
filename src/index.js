import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/shared/App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import registerServiceWorker from './registerServiceWorker';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

injectTapEventPlugin()

const Setup = () => {
    return <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <App />
    </MuiThemeProvider>
}

ReactDOM.render(<Setup />, document.getElementById('root'));

registerServiceWorker();
