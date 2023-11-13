import { Box } from '@mui/material'
import React, { FC } from 'react'
import { Editor } from '../components/Editor'
import { AxiosResponse } from 'axios'


export interface ResBodyBoxProps {
    axiosResponse?: AxiosResponse
}

const ResBodyBox: FC<ResBodyBoxProps> = ({ axiosResponse }) => {

    return (
        <Box border={'1px solid var(--Light-Grey, #D9D9D9)'} flex={1} mt={2} borderRadius={1} p={2} >
            <Editor data={axiosResponse?.data} />
        </Box>
    )
}

export default ResBodyBox