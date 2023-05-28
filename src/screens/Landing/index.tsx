import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Tab, Tabs, TextField, Typography } from '@mui/material';
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
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}



const Landing: FC = () => {

    const [currTab, setCurrTab] = useState('params')

    return (
        <Formik
            initialValues={{
                method: '',
                url: '',
                params: [{ key: '', value: '' }],
                body: {}
            }}
            onSubmit={(data) => {
                axios.request(data)
                console.log({ data })
            }}
        >
            {
                formikProps => {
                    return (
                        <div style={{ position: 'fixed', left: 0, right: 0, top: 0, bottom: 0, padding: 36 }}>
                            <Container>
                                <Box width={'100%'} display={'flex'} >
                                    <Box>
                                        <FormControl style={{ width: 136 }} >
                                            <InputLabel id={'req-method'} >{'Method'}</InputLabel>
                                            <Select
                                                labelId='req-method'
                                                name={'method'}
                                                label={'Method'}
                                                fullWidth
                                                onChange={formikProps.handleChange}
                                                value={formikProps.values.method}
                                            >
                                                {
                                                    ['GET', 'DELETE', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'PATCH', 'PURGE', 'LINK', 'UNLINK'].map((x) => (
                                                        <MenuItem value={x} key={x} >{x}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box flex={1} mx={0.5}>
                                        <TextField
                                            name={'url'}
                                            label={'URL'}
                                            onChange={formikProps.handleChange}
                                            value={formikProps.values.url}
                                            fullWidth
                                        />
                                    </Box>
                                    <Button variant='contained' type="submit" onClick={formikProps.submitForm} >SEND</Button>
                                </Box>

                                {/* params, header or body */}
                                <Box>
                                    <Tabs value={currTab} onChange={(e, v) => { setCurrTab(v) }}  >
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

                                <Box height={'500px'} marginTop={1} padding={3} border={'1px Solid'} >
                                    <Editor />
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