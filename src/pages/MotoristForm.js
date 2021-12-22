import { Grid } from '@mui/material';

/* import * as areaService from "../service/areaService" */
import * as MotoristService from '../service/MotoristService'
import React, {useState} from "react";
import Controls from "../components/controls/Controls";
import { UseForm, Form } from "../components/UseForm";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "others", title: "Others" },
];

const initialFieldValues = {
  motoristId: 0,
  motoristFirstName: "",
  motoristLastName: "",
  motoristEmail: "",
  motoristMobile: "",
  motoristGender: "male",
  motoristPassword: "",
  /* departmentId: "",
  hireDate: new Date(),
  isPermanent: false, */
};

export default function MotoristForm() {

  const validate =(fieldValues = values) =>{
    let temp = {...errors}
    if('motoristFirstName' in fieldValues)
    temp.motoristFirstName = fieldValues.motoristFirstName?"":"This field is required."
    if('motoristEmail' in fieldValues)
    temp.motoristEmail = (/$^|.+@.+..+/).test(fieldValues.motoristEmail) ?"":"Invalid Email."
    if('motoristMobile' in fieldValues)
    temp.motoristMobile = fieldValues.motoristMobile.length > 9 ?"":"Minimum 10 numbers required."
    /* if('departmentId' in fieldValues)
    temp.departmentId = fieldValues.departmentId.length !==0 ? "":"This field is required." */
    setErrors({
      ...temp
    })

    if(fieldValues === values)
    return Object.values(temp).every(x => x === "")
  }
  const { values, setValues, resetForm, handleInputChange, errors, setErrors } = UseForm(initialFieldValues, true, validate);


//const [records, setRecords] = useState(MotoristService.getAll(values));

  const handleSubmit = e =>{
    e.preventDefault()
    
      MotoristService.create(values)
    
    
   /* axios.post("http://localhost:8080/apiv1/motorist/save", values)
   .then(response => {
     console.log(response)
   })
   .catch(error => {
     console.log(error)
   }) */

  

  }
  

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
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
            label="Last Name"
            name="motoristLastName"
            value={values.motoristLastName}
            onChange={handleInputChange}
            error={errors.motoristLastName}
          />
          <Controls.Input
            variant="outlined"
            label="Email"
            name="motoristEmail"
            value={values.motoristEmail}
            onChange={handleInputChange}
            error={errors.motoristEmail}
          />
          <Controls.Input
            variant="outlined"
            label="Mobile"
            name="motoristMobile"
            value={values.motoristMobile}
            onChange={handleInputChange}
            error={errors.motoristMobile}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            variant="outlined"
            name="motoristGender"
            label="Gender"
            color="primary"
            value={values.motoristGender}
            genderItems={genderItems}
            onChange={handleInputChange}
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
  );
}
