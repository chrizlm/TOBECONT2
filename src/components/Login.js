import { Grid } from '@mui/material'
import React from 'react'
import Controls from './controls/Controls'
import { UseForm, Form } from './UseForm'
import * as MotoristService from '../service/MotoristService'
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles({
    formdetail : {
        alignContent : 'center'
    }
})


const initialFieldValues = {
    motoristId: 0,
    motoristFirstName: "",
    motoristPassword: "",
    /* departmentId: "",
    hireDate: new Date(),
    isPermanent: false, */
  };

export default function Login() {

    const classes = useStyle();

    const validate =(fieldValues = values) =>{
        let temp = {...errors}
        if('motoristFirstName' in fieldValues)
        temp.motoristFirstName = fieldValues.motoristFirstName?"":"This field is required."
        if('motoristPassword' in fieldValues)
        temp.motoristPassword = fieldValues.motoristPassword?"":"This field is required."
        /* if('departmentId' in fieldValues)
        temp.departmentId = fieldValues.departmentId.length !==0 ? "":"This field is required." */
        setErrors({
          ...temp
        })
    
        if(fieldValues === values)
        return Object.values(temp).every(x => x === "")
      }

    const { values, setValues, resetForm, handleInputChange, errors, setErrors } = UseForm(initialFieldValues, true, validate);

    const handleSubmit = e =>{
        e.preventDefault()
        
          MotoristService.create(values)
        
        
       /* axios.post("http://localhost:8080/api/motorist/create", values)
       .then(response => {
         console.log(response)
       })
       .catch(error => {
         console.log(error)
       }) */
    
      
    
      }
    return (
        <>
        <Form onSubmit={handleSubmit}>
      <Grid container >
        <Grid item sm={12} className={classes.formdetail}>
          <Controls.Input
            variant="outlined"
            label="First Name"
            name="motoristFirstName"
            value={values.motoristFirstName}
            onChange={handleInputChange}
            error={errors.motoristFirstName}
          />
          <Controls.Input
            variant="outlined" 
            label="Password"
            name="motoristPassword"
            value={values.motoristPassword}
            onChange={handleInputChange}
            error={errors.motoristPassword}
          />
          <div>
            <Controls.MuiButton
            type="submit"
            text="Submit"
            />
            <Controls.MuiButton
            text="reset"
            color="default"
            onClick={resetForm}
            />
          </div>
          </Grid>
          </Grid>
          </Form>
        </>
    )
}
