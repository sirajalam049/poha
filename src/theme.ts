import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: '#F7D060',

        },
        secondary: {
            main: '#FF6D60',
        },
        error: {
            main: '#98D8AA',
        },
        background: {
            default: '#F3E99F'
        },
        info: {
            main: 'rgb(26,115,232)'
        },
        text: { primary: '#48484A' }
    },

});

export default theme;