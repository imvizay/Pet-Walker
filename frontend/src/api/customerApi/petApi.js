
import axios from "axios";
import api from "../axios";



export const getPet = () => api.get('/all-pets/')
export const updatePet = (id) => api.get(`/pet/update/${id}`)
export const removePet = (id) => api.get(`/pet/remove/${id}`)



export const getPetTypes = () => api.get("/pet-type/")

export const getPetBreeds = (petTypeId) => api.get(`/pet-breed/?pet_type=${petTypeId}`)