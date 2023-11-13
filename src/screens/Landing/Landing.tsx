import { FC, useState } from 'react'
import { AppBar, Box } from '@mui/material'
import { Formik } from 'formik'
import PrimaryInputBar from '../PrimaryInputBar'
import ReqSecondaryInput from '../ReqSecondaryInput'
import ResBodyBox from '../ResBodyBox'
import axios, { AxiosResponse } from 'axios'

export interface LandingProps { }

const Landing: FC<LandingProps> = (props) => {

    const [res, setRes] = useState<AxiosResponse>();
    const [loading, setLoading] = useState(false)

    return (
        <Formik
            initialValues={{
                method: 'GET',
                url: 'https://jsonplaceholder.typicode.com/todos/',
                params: [{ key: '', value: '' }],
                body: {}
            }}
            onSubmit={async (data) => {
                try {
                    setLoading(true)
                    const params = data.params.reduce(
                        (obj, item) => {
                            if (item.key && item.value) obj[item.key] = item.value
                            return obj
                        }, {} as any);
                    const res = await axios.request({ url: data.url, data: data.body, params, method: data.method, })
                    setRes(res)
                } catch (err) { console.log({ err }) }
                finally { setLoading(false) }

            }}
        >
            {
                formikProps => {
                    return (
                        <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }} >
                            <AppBar style={{ height: 48, backgroundColor: 'var(--Light-Grey, #D9D9D9)' }} color='default' position='static' >
                            </AppBar>
                            <Box flex={1} display={'flex'} flexDirection={'column'} style={{ backgroundColor: '#F4F4F6' }} p={4} >
                                <Box display={'flex'} flexDirection={'column'} flex={1} bgcolor={'#fff'} p={2}>
                                    <PrimaryInputBar formikProps={formikProps} />
                                    <ReqSecondaryInput formikProps={formikProps} />
                                    <ResBodyBox axiosResponse={res} />
                                </Box>
                            </Box>
                        </Box >
                    )
                }
            }
        </Formik>
    )
}

export default Landing