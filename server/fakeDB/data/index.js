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
    password: "testtest",
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
        title: "Long Beach 2 Bedroom Apartment",
        city: "Long Beach",
        address: "15 W Mountain View St., 1",
        zip: "90805",
        category: "apartment",
        image: image1Id,
        description: "Spacious apartment in North Long Beach",
        bedrooms: 2,
        bathrooms: 1,
        price: 1000,
        parkingSpots: 2,
        security: "gated",
        laundry: "communal",
        leaseTerm: "12 Month",
        pets: false,
        airCon: false,
        heating: true,
        floorNumber: 1,
        elevator: false,
        dishwasher: false,
        refrigerator: true,
        smoking: false,
        owner: user1Id,
    },
    {
        title: "Terra Bella",
        city: "Irvine",
        address: "3817 View Park Ave.",
        zip: "92620",
        category: "townhouse",
        image: image2Id,
        description: "New Townhouse in North Irvine",
        bedrooms: 3,
        bathrooms: 2,
        price: 1600,
        parkingSpots: 2,
        security: "gated",
        laundry: "in unit",
        leaseTerm: "12 month",
        pets: true,
        airCon: true,
        heating: true,
        floorNumber: 1,
        elevator: false,
        dishwasher: true,
        refrigerator: true,
        smoking: false,
        owner: user1Id,
    },
    {
        title: "Long Beach 1 Bed Apartment",
        city: "Long Beach",
        address: "15 W Mountain View St.",
        zip: "90805",
        category: "apartment",
        image: image3Id,
        description: "Small apartment in North Long Beach",
        bedrooms: 1,
        bathrooms: 1,
        price: 800,
        parkingSpots: 1,
        security: "gated",
        laundry: "communal",
        leaseTerm: "month to month",
        pets: false,
        airCon: false,
        heating: true,
        floorNumber: 2,
        elevator: false,
        dishwasher: false,
        refrigerator: true,
        smoking: false,
        owner: user1Id,
    }
]