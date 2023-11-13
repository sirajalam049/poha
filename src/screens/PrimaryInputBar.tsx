import { Box, Select, MenuItem, Typography, Divider, InputBase, Button } from '@mui/material'
import { FormikProps } from 'formik'
import { FC } from 'react'

export interface PrimaryInputBarProps {
    formikProps: FormikProps<any>
}

const PrimaryInputBar: FC<PrimaryInputBarProps> = ({ formikProps }) => {

    return (
        <Box display={'flex'} borderRadius={1} border='1px solid var(--Light-Grey, #D9D9D9)' height={48}>
            <Select
                sx={{
                    "& fieldset": { border: 'none' }
                }}
                name={'method'}
                size='small'
                style={{ width: 128, height: '100%', paddingLeft: 2 }}
                onChange={formikProps.handleChange}
                value={formikProps.values.method}
                inputProps={{
                    style: {
                        marginLeft: 8
                    }
                }}
            >
                {
                    ['GET', 'POST', 'PUT', 'PATCH', 'DELETE',].map((x) => (
                        <MenuItem value={x} key={x} >{
                            <Typography variant='body2' >{x}</Typography>
                        }</MenuItem>
                    ))
                }
            </Select>
            <Divider orientation='vertical' style={{ margin: '6px 0px', height: 36 }} />
            <Box flex={1} pl={2} >
                <InputBase
                    onChange={formikProps.handleChange}
                    value={formikProps.values.url}
                    placeholder='Enter URL'
                    sx={{ "& [type=text]": { fontSize: 14, fontWeight: 500 } }}
                    fullWidth
                    style={{ height: 48 }}
                />
            </Box>
            <Button
                disabled={formikProps.isSubmitting}
                type="submit"
                onClick={formikProps.submitForm}
                variant='contained'
                style={{ width: 128, backgroundColor: formikProps.isSubmitting ? undefined : '#1A73E8', color: '#fff', borderRadius: '0px 4px 4px 0px' }}
                disableElevation
            >
                <Typography variant='button' fontWeight={700} >
                    {
                        formikProps.isSubmitting ? 'LOADING...' : 'SEND'
                    }
                </Typography>
            </Button>
        </Box>
    )
}



export default PrimaryInputBar