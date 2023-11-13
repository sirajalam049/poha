import React, { FC, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import FullScreenLoader from '../components/FullScreenLoader';
import Landing from './Landing/Landing';


const Layout: FC = () => {

    return (
        <>
            <Routes>
                <Route path='/' Component={Landing} />
                {/* <AppNavigation /> */}
            </Routes>
        </>
    )
}



const RootLayout: FC = () => {
    const [isAppInit, setIsAppInit] = useState<boolean>(false);



    useEffect(() => {
        Promise.all([
        ]).then(() => {
            setIsAppInit(true);
        }).catch(() => {
            setIsAppInit(true);
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
                {
                    (isAppInit) ? (<Layout />) : (<FullScreenLoader />)
                }
        </>
    )
}

export default RootLayout;

