import { LinearProgress } from '@mui/material';
import React, { FC } from 'react';


export const FullScreenLoader: FC = () => {
    return (
        <div style={{
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <LinearProgress style={{width: 300}} />
        </div>
    )
}

export default FullScreenLoader;
