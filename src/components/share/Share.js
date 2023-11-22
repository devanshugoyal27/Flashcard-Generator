import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { IoShareSocial, IoMailSharp } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { FaWhatsapp, FaTwitter } from "react-icons/fa";
import { IoMdClose, IoMdDoneAll } from "react-icons/io";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const Share = ({ SetIsOpen, id }) => {
  // Close the Share modal
  const closeHandler = () => {
    SetIsOpen(false);
  };

  // State to manage the copy & success toggle
  const [copy, setCopy] = useState(false);

  // Function to handle the click event for copying the link
  const handleCopyClick = () => {
    setCopy(true);
    const linkToCopy = url;
    navigator.clipboard.writeText(linkToCopy);

    // Reset the copy button after 3 seconds
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };

  // Get the current URL
  const url = window.location.href

  // Function to handle the click event for sharing the link
  const handleShareClick = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "share",
          url: url,
        });
        console.log("Successfully shared");
      } else {
        console.log("Web Share API not supported");
      }
    } catch (error) {
      console.error("Error sharing:", error.message);
    }
  };

  return (
    <>
    {/* Share modal */}
      <div className="fixed z-[9999] inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="md:w-[500px] w-[350px] h-[250px] bg-white p-11 flex flex-col gap-3 justify-between relative rounded-md">
         {/* Close button */}
          <div
            onClick={closeHandler}
            className="absolute top-3 right-3 cursor-pointer"
          >
            <IoMdClose size={20} />
          </div>
          <h1 className="font-bold">Share</h1>

          {/* url and copy/share buttons */}
          <div className="flex gap-3 justify-center items-center">
            <div className="border-2 p-2 truncate border-dashed text-sm">
              <p>
                <span className="text-gray-700">Link:</span>

                <span className="font-semibold ml-2">
                  {url}
                </span>
              </p>
            </div>
            <div className="text-gray-700 cursor-pointer">
              {copy ? (
                <IoMdDoneAll />
              ) : (
                <FaRegCopy size={20} onClick={handleCopyClick} />
              )}
            </div>
            <div className="text-gray-700 cursor-pointer">
              <IoShareSocial onClick={handleShareClick} size={22} />
            </div>
          </div>

            {/* Social media share buttons */}
          <div className="flex  justify-between">
            <FacebookShareButton url={url}>
              <FaFacebookSquare
                size={26}
                className="text-blue-800 cursor-pointer"
              />
            </FacebookShareButton>

            <LinkedinShareButton url={url}>
              <BsLinkedin size={26} className="text-blue-800 cursor-pointer" />
            </LinkedinShareButton>

            <WhatsappShareButton url={url}>
              <FaWhatsapp size={26} className="text-green-700 cursor-pointer" />
            </WhatsappShareButton>

            <TwitterShareButton url={url}>
              <FaTwitter size={26} className="text-blue-600 cursor-pointer" />
            </TwitterShareButton>

            <EmailShareButton url={url}>
              <IoMailSharp size={26} className="text-gray-700 cursor-pointer" />
            </EmailShareButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Share;
