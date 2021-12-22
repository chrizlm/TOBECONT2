import { Grid, Box } from '@mui/material';

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
};

export default function MotoristDetails(props) {


  const handleSubmit = e =>{
    e.preventDefault()
  }

  const { values, setValues, resetForm, handleInputChange, errors, setErrors } = UseForm(initialFieldValues, true);
  

  return (
    <Box>
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
    </Box>
  );
}
