const mongoose = require('mongoose');

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

exports.users = [{
    _id: user1Id,
    username: "Test User",
    email: "test@gmail.com",
    password: "testtest",
},
{
    _id: user2Id,
    username: "Test User2",
    email: "test2@gmail.com",
    password: "testtest2",
},
]

const image1Id = mongoose.Types.ObjectId();
const image2Id = mongoose.Types.ObjectId();
const image3Id = mongoose.Types.ObjectId();

exports.images = [
    {
        _id: image1Id,
        cloudinaryId: 'bfbietavwzfnebtvll9m',
        url: 'https://res.cloudinary.com/dw7wh2hgg/image/upload/v1608839285/bfbietavwzfnebtvll9m.jpg'
    },
    {
        _id: image2Id,
        cloudinaryId: 'ivay9vlebgyuy02aei4m',
        url: 'https://res.cloudinary.com/dw7wh2hgg/image/upload/v1608839997/ivay9vlebgyuy02aei4m.jpg'
    },
    {
        _id: image3Id,
        cloudinaryId: 'zaffqysmbhegowwohi0m',
        url: 'https://res.cloudinary.com/dw7wh2hgg/image/upload/v1608840113/zaffqysmbhegowwohi0m.jpg'
    }
]

exports.rentals = [
    {
        title: "Nice view on ocean",
        city: "San Francisco",
        street: "Main street",
        category: "condo",
        image: image1Id,
        numOfRooms: 4,
        shared: true,
        description: "Very nice apartment in center of the city.",
        dailyPrice: 43,
        owner: user1Id
    },
    {
        title: "Modern apartment in center",
        city: "New York",
        street: "Time Square",
        category: "apartment",
        image: image2Id,
        numOfRooms: 1,
        shared: false,
        description: "Very nice apartment in center of the city.",
        dailyPrice: 11,
        owner: user1Id
    },
    {
        title: "Old house in nature",
        city: "Bratislava",
        street: "Letna 7",
        category: "house",
        image: image3Id,
        numOfRooms: 5,
        shared: true,
        description: "Very nice apartment in center of the city.",
        dailyPrice: 23,
        owner: user2Id
    }
]