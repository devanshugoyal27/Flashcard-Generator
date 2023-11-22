import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { deleteFlashcard } from "../../redux/actions/actions";
import { Link } from "react-router-dom";

const MyFlashCardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formData);
  const [visibleFlashcards, setVisibleFlashcards] = useState(6);

  // Function to handle "See all" click and show more flashcards
  const handleSeeMoreClick = () => {
    setVisibleFlashcards((prevVisibleFlashcards) => prevVisibleFlashcards + 6);
  };

  return (
    <>
      {formData.length === 0 ? (
        // Displayed when there are no flashcards
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="mt-5 text-2xl">You don't have any flashcards</h1>

          {/* Button to navigate to flashcard creation */}
          <button
            onClick={() => navigate("/")}
            className="p-3 border-2 bg-red-500 font-bold text-white rounded-md hover:bg-red-600"
          >
            Create FlashCard
          </button>
        </div>
      ) : (
        // Displayed when there are flashcards
        <div className=" md:max-w-[1100px] mx-auto gap-3 grid lg:grid-cols-3 sm:grid-cols-2 justify-center ">
          {formData.slice(0, visibleFlashcards).map((formData, i) => (
            <div key={formData.id} className="">
              <div className="md:w-[360px] w-[320px] h-[230px] border-2 rounded-md bg-white mx-2 my-5 p-4 flex flex-col justify-between">
                <div className="flex gap-4 flex-col">
                  <div className="flex gap-3">
                    {/* Displaying flashcard image or a default image */}
                    {formData.file ? (
                      <img
                        src={formData.file}
                        alt="load"
                        className="w-[70px] h-[70px] rounded-sm"
                      />
                    ) : (
                      <img
                        src="https://generator-flashcard.vercel.app/static/media/dummy_image.7c118d410059de3c522d.jpg"
                        alt="loading"
                        className="rounded-full w-[60px] h-[60px]"
                      />
                    )}

                    {/* Displaying flashcard group name and card count */}
                    <div>
                      <h1 className="font-bold text-lg ml-2 mt-1">
                        {formData.createGroup}
                      </h1>
                      <span className="font-semibold text-gray-500 ml-2">
                        {(formData.inputList || []).length}{" "}
                        {(formData.inputList || []).length > 1
                          ? "Cards"
                          : "Card"}
                      </span>
                    </div>
                  </div>

                  {/* Displaying flashcard description */}
                </div>
                <p className="mt-4 line-clamp-2">{formData.description}</p>
                <div className="flex justify-between items-end">
                  {/* Link to view the details of the flashcard */}
                  <Link
                    className="text-red-500 text-md font-semibold flex gap-4"
                    to={`/CardsDetails/${formData.id}`}
                  >
                    <p>View Card</p>{" "}
                    <span className="mt-1">
                      <FaArrowRightLong />
                    </span>
                  </Link>

                  {/* Button to delete the flashcard */}
                  <span className="text-red-500 mt-9 cursor-pointer">
                    <MdDelete
                      size={24}
                      onClick={() => dispatch(deleteFlashcard(formData.id))}
                    />
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Button to see more flashcards if available */}
          {visibleFlashcards < formData.length && (
            <div className="flex justify-end">
              <button
                className="text-red-500 font-bold absolute bottom-5 right-[170px]"
                onClick={handleSeeMoreClick}
              >
                See all
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MyFlashCardPage;
