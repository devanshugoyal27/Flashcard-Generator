import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TbFileUpload } from "react-icons/tb";
import ValidationForm from "../../Schema/ValidationForm";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { createFlashcard } from "../../redux/actions/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MdOutlineDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const initialValues = {
  createGroup: "",
  description: "",
  file: null,
  inputList: [{ id: uuidv4(), term: "", definition: "", file2: null }],
};

const InputField = () => {
  const [preview, setPreview] = useState(null);
  const [previews, setpreviews] = useState([null]); // Using array for multiple previews
  const [isFirstInputFilled, setIsFirstInputFilled] = useState(true);
  const dispatch = useDispatch();

  return (
    <>
      {/* Formik is used for form handling */}
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationForm}
        onSubmit={(values, { resetForm }) => {
          const formDataWithId = {
            ...values,
            id: uuidv4(), // Generate a new UUID for each form submission
          };

          // Handle form submission (e.g., dispatching to Redux)

          dispatch(createFlashcard(formDataWithId));

          console.log(formDataWithId);

          // Show success toast
          toast.success("Flashcard created successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });

          // Reset the form
          resetForm();
        }}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            {/* 1st input feild  */}
            <div className="md:max-w-[1100px] mx-auto h-85 shadow-md mt-8 bg-white p-4 pl-6 rounded-xl ">
              <div className="flex flex-col gap-5 mt-3 ">
                <div className="flex md:items-center flex-col md:flex-row">
                  <div className="flex flex-col ">
                    <label
                      className="font-bold text-gray-500 mb-2"
                      htmlFor="name"
                    >
                      Create Group*
                    </label>
                    <Field
                      type="text"
                      placeholder="e.g. Web Development"
                      name="createGroup"
                      className="p-[8px] text-md border-2 rounded-md md:w-[270px] w-full"
                      id="name"
                      onChange={(event) => {
                        setFieldValue("createGroup", event.target.value);
                        setIsFirstInputFilled(false);
                      }}
                    />
                    <div>
                      <ErrorMessage
                        name="createGroup"
                        component="p"
                        className="text-red-600 font-bold-text-xl absolute"
                      />
                    </div>
                  </div>
                  <div className="mt-8 flex items-end justify-end">
                    <label
                      className="py-[10px] px-6 border-2 md:ml-5 text-blue-700 font-bold rounded-md  "
                      htmlFor="file"
                    >
                      <TbFileUpload
                        size={25}
                        color="blue"
                        className="inline mr-2"
                      />
                      {values.file ? "Change Image" : "Upload Image"}
                    </label>
                    <input
                      type="file"
                      name="file"
                      accept="image/*"
                      className="hidden"
                      id="file"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                          setFieldValue("file", reader.result);
                          setPreview(reader.result);
                        };
                      }}
                    />
                  </div>
                  <div className="flex items-center ml-[150px] md:m-0">
                    {values.file && (
                      <div className="flex items-end justify-end gap-3">
                        <img
                          src={preview}
                          alt="preview"
                          width={100}
                          height={100}
                          className="md:ml-4 mt-5"
                        />
                        <button
                          type="button"
                          className="text-red-500 ml-3 font-bold"
                          onClick={() => {
                            // Clear the selected file when the button is clicked
                            setFieldValue("file", null);
                          }}
                        >
                          - Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-bold text-gray-500" htmlFor="desc">
                    Add Description
                  </label>
                  <Field
                    as="textarea"
                    rows="6"
                    cols="6"
                    id="desc"
                    name="description"
                    placeholder="Write your description here (Max length is 500 words)"
                    className="resize-none text-md border-2 rounded-md md:w-[70%] p-2 "
                  />
                  <div>
                    <ErrorMessage
                      name="description"
                      component="p"
                      className="text-red-600 font-bold-text-xl absolute"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* 2nd input Field  */}
            <div
              className={`md:max-w-[1100px] mx-auto h-55 shadow-md mt-8 bg-white p-4 mb-5 pl-6 rounded-xl ${
                isFirstInputFilled ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {/* FieldArray is used for handling an array of form inputs */}
              <FieldArray
                name="inputList"
                render={(arrayHelpers) => {
                  return (
                    <div>
                      {/* Mapping over the array of inputs */}
                      {values.inputList.map((inputList, i) => {
                        return (
                          <div
                            key={inputList.id}
                            className="flex gap-6 mt-6 flex-col lg:flex-row"
                          >
                            <span className="w-10 h-10 text-center p-1 text-lg font-bold rounded-full bg-red-300">
                              {i + 1}
                            </span>
                            <div className="flex flex-col">
                              <label
                                className="font-bold text-gray-500 mb-2"
                                htmlFor={`inputList[${i}].term`}
                              >
                                Enter Term*
                              </label>
                              <Field
                                type="text"
                                name={`inputList[${i}].term`}
                                id={`inputList[${i}].term`}
                                placeholder="e.g. What is web ?"
                                className="p-[8px] text-md border-2 rounded-md lg:w-[250px]"
                              />
                              <div>
                                <ErrorMessage
                                  name={`inputList[${i}].term`}
                                  component="p"
                                  className="text-red-600 font-bold-text-xl absolute"
                                />
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <label
                                className="font-bold text-gray-500 mb-2"
                                htmlFor={`inputList[${i}].definition`}
                              >
                                Enter Defination*
                              </label>
                              <Field
                                type="text"
                                name={`inputList[${i}].definition`}
                                id={`inputList[${i}].definition`}
                                placeholder="A system of interconnected public webpages accessible through"
                                className="p-[8px] text-md border-2 rounded-md lg:w-[300px]"
                              />
                              <div>
                                <ErrorMessage
                                  name={`inputList[${i}].definition`}
                                  component="p"
                                  className="text-red-600 font-bold-text-xl absolute"
                                />
                              </div>
                            </div>
                            {/* slelect image  */}

                            <div className="md:mt-7 mt-4 flex items-end justify-end sm:inline-block">
                              {inputList.file2 ? (
                                <div className="flex gap-3 mt-[-45px] justify-center items-center">
                                  <img
                                    src={previews[i]}
                                    alt="preview"
                                    width={100}
                                    height={100}
                                    className="md:ml-4 mt-5"
                                  />
                                  <div className="flex flex-col gap-2 mt-5">
                                    <button
                                      type="button"
                                      className="text-red-500 ml-[-4px]"
                                      onClick={() => {
                                        setFieldValue(
                                          `inputList[${i}].file2`,
                                          null
                                        );
                                      }}
                                    >
                                      <MdOutlineDelete size={26} />
                                    </button>
                                    <label
                                      className="text-blue-500 cursor-pointer"
                                      htmlFor={`inputList[${i}].file2`}
                                    >
                                      <FaEdit size={22} />
                                      <input
                                        type="file"
                                        disabled={isFirstInputFilled}
                                        className="hidden"
                                        id={`inputList[${i}].file2`}
                                        onChange={(event) => {
                                          setFieldValue(
                                            `inputList[${i}].file2`,
                                            event.currentTarget.files[0]
                                          );
                                        }}
                                      />
                                    </label>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className="flex items-end justify-end">
                                    <label
                                      className="py-[10px] px-6 border-2 md:ml-5 text-blue-700 font-bold rounded-md "
                                      htmlFor={`inputList[${i}].file2`}
                                    >
                                      <TbFileUpload
                                        size={25}
                                        color="blue"
                                        className="inline mr-2"
                                      />
                                      Select Image
                                    </label>
                                    <input
                                      type="file"
                                      className="hidden"
                                      id={`inputList[${i}].file2`}
                                      onChange={(event) => {
                                        const file2 = event.target.files[0];
                                        const reader2 = new FileReader();
                                        reader2.readAsDataURL(file2);
                                        reader2.onload = () => {
                                          setFieldValue(
                                            `inputList[${i}].file2`,
                                            reader2.result
                                          );

                                          // Update the previews array with the new image
                                          setpreviews((prevPreviews) => {
                                            const newPreviews = [
                                              ...prevPreviews,
                                            ];
                                            newPreviews[i] = reader2.result;
                                            return newPreviews;
                                          });
                                        };
                                      }}
                                    />
                                  </div>
                                </>
                              )}
                            </div>

                            {/* remove button  */}
                            {i > 0 && (
                              <button
                                className="text-red-500 font-semibold mt-10 cursor-pointer "
                                onClick={() => arrayHelpers.remove(i)}
                              >
                                - Remove
                              </button>
                            )}
                          </div>
                        );
                      })}
                      {/* Button to add more inputs */}
                      <h2
                        className="text-blue-600 font-semibold mt-10 cursor-pointer inline-block "
                        onClick={() =>
                          arrayHelpers.push({
                            id: uuidv4(),
                            term: "",
                            definition: "",
                            file2: null,
                          })
                        }
                      >
                        + Add more
                      </h2>
                    </div>
                  );
                }}
              />
            </div>
            {/* create flashcard button  */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="py-2 border-2 bg-red-600 font-bold text-white rounded-md hover:bg-red-500 px-12 mb-[150px] mt-10 "
              >
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
};

export default InputField;
