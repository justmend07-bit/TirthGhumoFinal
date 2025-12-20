import { url } from "zod";

const packages = [
    {
    id: 1,
    title: "1 Day Mrignnath Trek",
    subtext: "",
    isPopular: false,
    image: "images/packages/Mrignath.jpg",
    tags: ["Trek", "Sight-seeing", "Adventure"],
    price: "₹939",
    available: false,
    url: "/mrignnath",
  },
  {
    id: 2,
    title: "Tamia",
    subtext: "",
    isPopular: true,
    image: "images/packages/Tamia.webp",
    tags: [ "Special Tents", "Meals Included"],
    price: "₹6,700",
    available: true,
    url: "/tamia/Register",
  },
  // {
  //   id: 3,
  //   title: "Manali",
  //   subtext: "",
  //   isPopular: true,
  //   image: "images/packages/1.png",
  //   tags: ["Flights", "5-Star Hotel", "Tours"],
  //   price: "₹8,999",
  //   available: false,
  //   url: "/manali",
  // },
  
  // {
  //   id: 4,
  //   title: "Rishikesh-Haridwar",
  //   subtext: "Sacred Journeys",
  //   isPopular: true,
  //   image: "images/packages/1.png",
  //   tags: ["4-Star Hotel", "Guided Tours", "Breakfast"],
  //   price: "₹8,250",
  //   available: false,
  //   url: "/rishikesh-haridwar",
  // },
  
//   {
//     id: 5,
//     title: "Ramadan Umrah Special",
//     subtext: "Last 10 Nights  •  Iftar & Suhoor",
//     image: "images/packages/1.png",
//     tags: ["5-Star Hotel", "Meals Included", "Guided Prayers"],
//     price: "$3,200",
//   },
//   {
//     id: 6,
//     title: "Family Umrah Package",
//     subtext: "4 Persons  •  12 Days",
//     image: "images/packages/1.png",
//     tags: ["Flights", "Family Room", "Breakfast"],
//     price: "$1,550",
//   },
];

export default packages;
