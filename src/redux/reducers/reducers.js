// Retrieve flashcard data from local storage or initialize an empty array
const localStoreData = JSON.parse(localStorage.getItem("formData"));

// Initial state for the flashcard data, using data from local storage if available
const initialState = {
  formData: localStoreData ? localStoreData : [],
};

// Redux reducer function for flashcard data
const flashCardData = (state = initialState, action) => {
  switch (action.type) {
    // Action type for creating a new flashcard
    case "CREATE_FLASHCARD":
      // Create a new array with the new flashcard added
      const updatedFormData = [...state.formData, action.payload];

      // Update local storage with the new flashcard data
      localStorage.setItem("formData", JSON.stringify(updatedFormData));

      // Return the updated state with the new flashcard data
      return {
        ...state,
        formData: updatedFormData,
      };

    // Action type for deleting a flashcard
    case "DELETE_FLASHCARD":
      // Create a new array with the specified flashcard removed
      const remainFlashcards = state.formData.filter(
        (card) => card.id !== action.payload
      );

      // Update local storage with the remaining flashcard data
      localStorage.setItem("formData", JSON.stringify(remainFlashcards));

      // Return the updated state with the remaining flashcard data
      return {
        ...state,
        formData: remainFlashcards,
      };

    // Default case for handling unknown action types
    default:
      return state;
  }
};

export default flashCardData;
