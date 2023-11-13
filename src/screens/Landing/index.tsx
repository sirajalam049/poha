import { Box, Button, Container, FormControl, MenuItem, Select, Tab, Tabs, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Formik } from 'formik';
import React, { FC, useState } from 'react';
import { Editor } from '../../components/Editor';
import QueryParamsInput from '../../features/QueryParamsInput';

interface TabPanelProps {
    children?: React.ReactNode;
    currValue: string;
    value: string;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, currValue, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== currValue}
            id={`simple-tabpanel-${currValue}`}
            aria-labelledby={`simple-tab-${currValue}`}
            {...other}
        >
            {value === currValue && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}



const Landing: FC = () => {

    const [currTab, setCurrTab] = useState('params')
    const [res, setRes] = useState();
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
                    setRes(res.data)
                } catch (err) { console.log({ err }) }
                finally { setLoading(false) }

            }}
        >
            {
                formikProps => {
                    return (
                        <div style={{ padding: 36 }}>
                            <Container>

                                {/* Input Box */}
                                <Box width={'100%'} display={'flex'} >
                                    <Box>
                                        <FormControl style={{ width: 136 }} >
                                            <Select
                                                name={'method'}
                                                size='small'
                                                fullWidth
                                                onChange={formikProps.handleChange}
                                                value={formikProps.values.method}
                                            >
                                                {
                                                    ['GET', 'POST', 'PUT', 'PATCH', 'DELETE',].map((x) => (
                                                        <MenuItem value={x} key={x} >{
                                                            <Typography variant='body2' >{x}</Typography>
                                                        }</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box flex={1} mx={0.5}>
                                        <TextField
                                            name={'url'}
                                            size='small'
                                            placeholder='Enter the API URL'
                                            onChange={formikProps.handleChange}
                                            value={formikProps.values.url}
                                            fullWidth
                                            style={{ fontSize: 14 }}
                                        />
                                    </Box>
                                    <Button color='info' disableElevation style={{ width: 100 }} variant='contained' type="submit" onClick={formikProps.submitForm} >
                                        SEND
                                    </Button>
                                </Box>

                                {/* params, header or body */}
                                <Box maxHeight={400} overflow={'scroll'} >
                                    <Tabs textColor='inherit' indicatorColor='primary' value={currTab} onChange={(e, v) => { setCurrTab(v) }}  >
                                        <Tab label="Params" value={'params'} />
                                        <Tab label="Headers" value={'headers'} />
                                        <Tab label="Body" value={'body'} />
                                    </Tabs>
                                    <Box border={'1px Solid'}  >
                                        <TabPanel value={'params'} currValue={currTab} >
                                            <QueryParamsInput formikProps={formikProps} />
                                        </TabPanel>
                                        <TabPanel value={'headers'} currValue={currTab} >
                                            Show Headers
                                        </TabPanel>
                                        <TabPanel value={'body'} currValue={currTab} >
                                            Show Body
                                        </TabPanel>
                                    </Box>
                                </Box>


                                {/* Response Box */}
                                <Box position={'relative'} height={'500px'} marginTop={1} border={'1px Solid'} >
                                    <Editor data={res} />
                                    {
                                        loading ? <Box
                                            position={'absolute'}
                                            top={0} bottom={0}
                                            left={0} right={0}
                                            style={{ background: 'white', opacity: 0.9 }}
                                            display={'flex'}
                                            justifyContent={'center'}
                                            alignItems={'center'}
                                        >
                                            Loading Data...
                                        </Box> : null
                                    }
                                </Box> 
                            </Container>
                        </div>
                    )
                }
            }
        </Formik >
    );
}


export default Landing;