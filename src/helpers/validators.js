

export const sameAs = (field, getValues) => (value) => {
    const compareTo = getValues()[field];
    if (compareTo !== value) {
      return 'Passwords do not match';
    }
   
    return true;
}