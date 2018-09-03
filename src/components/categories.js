
const categories = [
  {
    "ref": "news",
    "name": "News",
    "description": "",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqmECOtI2rA3V0vgwNFhdT8G68BzNOERtLgiCY9guBklcDtsXy"
  },
  {
    "ref": "cars",
    "name": "Cars",
    "description": "",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeKHT6nke7lWqcr0-XeVfH4BShjJHCPoL-YqU62twMNk64OcMYqQ"
  },
  {
    "ref": "investments",
    "name": "Investments",
    "description": "",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj5lRU_he4MD1HbYV7FI2Gan-Foc16ZBxhFP5fHUxmcEOgiVxL"
  }
];

export const getCategories = () => {
    return categories
}
export const getCategory = (ref) => {
    return categories.find(item => item.ref === ref)
}
