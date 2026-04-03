export interface Pet {
  id: string
  name: string
  type: "cat" | "dog"
  level: number
  exp: number
  maxExp: number
  image: string
  discoveredBy: string
  location: string
  x: number
  y: number
}

export interface OwnPet {
  id: string
  name: string
  type: "cat" | "dog"
  breed: string
  age: string
  image: string
  verified: boolean
  missing: boolean
}

export interface MissingPetAlert {
  id: string
  name: string
  type: "cat" | "dog"
  breed: string
  image: string
  lastSeen: string
  ownerName: string
  x: number
  y: number
  timeAgo: string
}

export const PETS: Pet[] = [
  {
    id: "1",
    name: "Marmalade",
    type: "cat",
    level: 3,
    exp: 65,
    maxExp: 100,
    image: "/images/cat-1.jpg",
    discoveredBy: "@pawlover92",
    location: "Maple Street Park",
    x: 35,
    y: 28,
  },
  {
    id: "2",
    name: "Tux",
    type: "cat",
    level: 2,
    exp: 80,
    maxExp: 100,
    image: "/images/cat-2.jpg",
    discoveredBy: "@catlady",
    location: "Riverside Cafe",
    x: 62,
    y: 55,
  },
  {
    id: "3",
    name: "Biscuit",
    type: "dog",
    level: 4,
    exp: 30,
    maxExp: 100,
    image: "/images/dog-1.jpg",
    discoveredBy: "@dogwalker",
    location: "Oak Avenue",
    x: 25,
    y: 65,
  },
  {
    id: "4",
    name: "Patches",
    type: "dog",
    level: 1,
    exp: 45,
    maxExp: 100,
    image: "/images/dog-2.jpg",
    discoveredBy: "@pawlover92",
    location: "Central Plaza",
    x: 75,
    y: 35,
  },
  {
    id: "5",
    name: "Callie",
    type: "cat",
    level: 5,
    exp: 90,
    maxExp: 100,
    image: "/images/cat-3.jpg",
    discoveredBy: "@streetvet",
    location: "Sunshine Alley",
    x: 50,
    y: 78,
  },
]

export const MY_PETS: OwnPet[] = [
  {
    id: "own-1",
    name: "Luna",
    type: "cat",
    breed: "British Shorthair",
    age: "3 years",
    image: "/images/my-pet-1.jpg",
    verified: true,
    missing: false,
  },
  {
    id: "own-2",
    name: "Charlie",
    type: "dog",
    breed: "Beagle",
    age: "2 years",
    image: "/images/my-pet-2.jpg",
    verified: true,
    missing: false,
  },
]

export const MISSING_PET_ALERT: MissingPetAlert = {
  id: "missing-1",
  name: "Mango",
  type: "dog",
  breed: "Golden Retriever",
  image: "/images/mango-golden.jpg",
  lastSeen: "Oak Avenue & 5th Street",
  ownerName: "Sarah K.",
  x: 42,
  y: 40,
  timeAgo: "2 hours ago",
}
