import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const api = axios.create(
    {
        baseURL: API_BASE_URL,
        headers:{
            "Content-Type": "application/json"
        }
    }
);

//members

export const createMember = (memberData)=>{
    return api.post("/api/v1/members",memberData);
}

export const getMemberById = (id)=>{
    return api.get(`/api/v1/members/${id}`);
}

export const getAllMembers = ()=>{
    return api.get("/api/v1/members")
}

//Destinations
export const createDestination= (destination)=>{
    return api.post("/api/v1/destinations/saving",destination);
}

export const getAllDestinations = ()=>{
    return api.get("/api/v1/destinations")
}

export const getDestinationById = (id)=>{
    return api.get(`/api/v1/destinations/${id}`);
}

//Bookings

export const createBooking = (booking)=>{
    return api.post("/bookings/save",booking);
}

export const getBookingsById = (id)=>{
    return api.get(`/bookings/${id}`);
}

//AI part

export const aiRecommendation = (recommendationData)=>{
    return api.post("/api/v1/ai/recommendations", recommendationData);
}
