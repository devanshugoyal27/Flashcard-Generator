// Action creator for creating a new flashcard
export const createFlashcard = (formData) => {
  return {
    // Action type indicating the creation of a flashcard
    type: "CREATE_FLASHCARD",
    // Payload containing the data of the new flashcard
    payload: formData,
  };
};

// Action creator for deleting a flashcard
export const deleteFlashcard = (id) => {
  return {
    // Action type indicating the deletion of a flashcard
    type: "DELETE_FLASHCARD",
    // Payload containing the ID of the flashcard to be deleted
    payload: id,
  };
};
