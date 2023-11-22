import React, { useState, useRef } from "react";
import {
  IoIosArrowRoundBack,
  IoIosArrowForward,
  IoIosArrowBack,
} from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { FaShare } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { MdLocalPrintshop } from "react-icons/md";
import { useSelector } from "react-redux";
import Share from "../share/Share";

import { useReactToPrint } from "react-to-print";

const CardsDetails = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, SetIsOpen] = useState(false);

  // Extracting 'id' from useParams
  const { id } = useParams();

  // Fetching form data from Redux store based on 'id'
  const formData = useSelector((state) =>
    state.formData.find((card) => card.id === id)
  );

  // Calculating total number of pages based on the number of flashcards
  const totalPages = formData.inputList.length;

  // Function to handle moving to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Function to handle moving to the previous page
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Reference for printing the component
  const componentRef = useRef();

  // Function to handle printing using 'react-to-print' library
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div ref={componentRef} className="lg:max-w-[1100px] mx-auto print-style">
        {/* Header section with back button and group name */}
        <div className="flex gap-6 mt-4">
          <Link to="/myflashcard">
            <IoIosArrowRoundBack size={30} className="hide-on-print" />
          </Link>
          <h1 className="font-bold text-lg print-bold">
            {formData.createGroup}
          </h1>
        </div>

        {/* Description section */}
        <div>
          <p className="ml-14 text-gray-600">{formData.description}</p>
        </div>

        {/* Flashcards and Definitions section */}
        <div className="flex md:justify-between mt-4 print-style flex-col md:flex-row items-center justify-center">
          {/* Flashcards list */}
          <div className="bg-white md:w-[250px] w-[350px] h-[300px] border-2 p-4 rounded-md box">
            <h2 className="text-gray-700 mb-2 print-bold">Flashcards</h2>
            <hr className="w-[220px] mx-auto print-width" />
            {formData.inputList.map((item, index) => (
              <p
                key={index}
                className={`text-sm my-2 font-semibold cursor-pointer ${
                  index === currentPage ? "text-blue-600" : ""
                }`}
                onClick={() => setCurrentPage(index)}
              >
                {item.term}
              </p>
            ))}
          </div>

          {/* Individual flashcard with image and definition */}
          {formData.inputList.map((item, index) => (
            <div
              key={index}
              className={`bg-white lg:w-[570px] w-[97%] h-[350px] border-2 md:p-8 py-4 rounded-md flex md:justify-between flex-col lg:flex-row items-center box m-2 ${
                index === currentPage ? "block" : "hidden"
              }`}
            >
              <img
                src={item.file2}
                alt=""
                className="w-[250px] h-[200px] print-margin"
              />
              <div className="p-6">{item.definition}</div>
            </div>
          ))}

          {/* Share, Download, and Print options */}
          <div className="flex flex-col gap-3 hide-on-print">
            <div
              onClick={() => SetIsOpen(true)}
              className="bg-white w-[250px] h-[40px] border-2 p-4 rounded-md flex items-center text-gray-700 cursor-pointer"
            >
              <FaShare /> <p className="text-md ml-6 font-semibold">Share</p>{" "}
            </div>
            {isOpen && <Share SetIsOpen={SetIsOpen} id={id} />}
            <div
              onClick={handlePrint}
              className="bg-white w-[250px] h-[40px] border-2 p-4 rounded-md flex items-center text-gray-700 cursor-pointer"
            >
              <IoMdDownload size={20} />
              <p className="text-md ml-6 font-semibold">Download</p>
            </div>
            <div
              onClick={handlePrint}
              className="bg-white w-[250px] h-[40px] border-2 p-4 rounded-md flex items-center text-gray-700 cursor-pointer"
            >
              <MdLocalPrintshop />
              <p className="text-md ml-6 font-semibold">Print</p>
            </div>
          </div>
        </div>

        {/* Navigation buttons for switching between flashcards */}
        <div className="flex justify-center items-center mt-4 gap-5 hide-on-print mb-4">
          <button onClick={handlePrevPage}>
            <IoIosArrowBack size={20} />
          </button>
          <span className="mx-4">{`Page ${
            currentPage + 1
          } / ${totalPages}`}</span>
          <button onClick={handleNextPage}>
            <IoIosArrowForward size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default CardsDetails;
