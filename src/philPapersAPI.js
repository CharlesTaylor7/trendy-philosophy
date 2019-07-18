const apiId = '904518';
const apiKey = '5KLo4qkvXNl4t8s5';
export const fetchCategories = () => fetch(`https://philpapers.org/philpapers/raw/categories.json?apiId=${apiId}&apiKey=${apiKey}`);

export const fetchRecords = () => fetch()