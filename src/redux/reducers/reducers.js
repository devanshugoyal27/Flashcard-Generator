const localStoreData = JSON.parse(localStorage.getItem("formData"));

const initialState = {
  formData: localStoreData ? localStoreData : [],
};

const flashCardData = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_FLASHCARD":
      const updatedFormData = [...state.formData, action.payload];
      localStorage.setItem("formData", JSON.stringify(updatedFormData));
      console.log('Updated FormData File:', updatedFormData);
      return {
        ...state,
        formData: updatedFormData,
      };
     
    case "DELETE_FLASHCARD":
      const remainFlashcards = state.formData.filter(
        (card) => card.id !== action.payload
      );

      localStorage.setItem("formData", JSON.stringify(remainFlashcards));

      return {
        ...state,
        formData: remainFlashcards,
      };

    default:
      return state;
  }
};

export default flashCardData;
