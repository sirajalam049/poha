import { Box } from '@mui/material'
import React, { FC } from 'react'
import QueryParamsInput from '../features/QueryParamsInput'
import { FormikProps } from 'formik'

export interface ReqSecondaryInputProps {
    formikProps: FormikProps<any>
}

const ReqSecondaryInput: FC<ReqSecondaryInputProps> = ({ formikProps }) => {

    return (
        <Box border={'1px solid var(--Light-Grey, #D9D9D9)'} flex={1} mt={2} borderRadius={1} p={2} >
            <QueryParamsInput formikProps={formikProps} />
        </Box>
    )
}

export default ReqSecondaryInput