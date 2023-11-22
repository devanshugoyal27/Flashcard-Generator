// Importing the Yup library for validation
import * as yup from "yup";

// Defining the Yup validation schema for the form
const ValidationForm = yup.object({
  // Validation for the 'createGroup' field
  createGroup: yup
    .string()
    .min(2, "Group Name must be at least 2 characters") // Minimum length validation
    .max(20, "Group Name must be at most 20 characters") // Maximum length validation
    .required("Please Enter Group Name"), // Mandatory field validation

  // Validation for the 'description' field
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters") // Minimum length validation
    .max(500, "Description must be at most 500 characters"), // Maximum length validation

  // Validation for the array of objects 'inputList'
  inputList: yup
    .array()
    .of(
      // Validation for each object in 'inputList'
      yup.object().shape({
        // Validation for the 'term' property in each object
        term: yup
          .string()
          .min(5, "Term must be at least 5 characters") // Minimum length validation
          .max(20, "Term must be at most 20 characters") // Maximum length validation
          .required("Please Enter Term"), // Mandatory field validation

        // Validation for the 'definition' property in each object
        definition: yup
          .string()
          .min(10, "Definition must be at least 10 characters") // Minimum length validation
          .max(200, "Definition must be at most 200 characters") // Maximum length validation
          .required("Please Enter Definition"), // Mandatory field validation
      })
    )
    .required("Please add at least one term and definition"), // Validation for the array itself, ensuring at least one element
});

// Exporting the Yup validation schema
export default ValidationForm;
