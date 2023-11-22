// import * as yup from "yup";
// // validation for input field
// const ValidationForm = yup.object({
//   createGroup: yup.string().min(2, 'Group Name must be at least 2 characters').max(20).required("Please Enter Group Name"),
//   description: yup
//     .string()
//     .max(500),
//   term: yup.string()
//     .min(5, "Term must be at least 5 characters")
//     .max(20, "Term must be at most 20 characters")
//     .required("Please Enter Term"),
//     defination: yup
//     .string()
//     .min(10, "Definition must be at least 10 characters")
//     .max(200, "Definition must be at most 200 characters")
//     .required("Please Enter Definition"),
// })

// export default ValidationForm;


import * as yup from "yup";

// validation for input field
const ValidationForm = yup.object({
  createGroup: yup
    .string()
    .min(2, 'Group Name must be at least 2 characters')
    .max(20, 'Group Name must be at most 20 characters')
    .required("Please Enter Group Name"),
  description: yup.string().max(500),
  inputList: yup
    .array()
    .of(
      yup.object().shape({
        term: yup
          .string()
          .min(5, "Term must be at least 5 characters")
          .max(20, "Term must be at most 20 characters")
          .required("Please Enter Term"),
        definition: yup
          .string()
          .min(10, "Definition must be at least 10 characters")
          .max(200, "Definition must be at most 200 characters")
          .required("Please Enter Definition"),
      })
    )
    .required("Please add at least one term and definition"),
});

export default ValidationForm;
