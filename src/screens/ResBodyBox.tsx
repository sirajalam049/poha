import { Box, CircularProgress } from '@mui/material'
import React, { FC } from 'react'
import { Editor } from '../components/Editor'
import { AxiosResponse } from 'axios'


export interface ResBodyBoxProps {
    loading: boolean
    axiosResponse?: AxiosResponse
}

const ResBodyBox: FC<ResBodyBoxProps> = ({ axiosResponse, loading = false }) => {

    return (
        <Box border={'1px solid var(--Light-Grey, #D9D9D9)'} flex={1} mt={2} borderRadius={1} p={2} >
            {
                loading ? <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height="100%" width="100%" ><CircularProgress color='secondary' /></Box> :
                    <Editor data={axiosResponse?.data} />
            }
        </Box>
    )
}

export default ResBodyBox