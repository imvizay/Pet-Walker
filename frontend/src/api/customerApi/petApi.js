
import axios from "axios";
import api from "../axios";

export const getPetTypes = () => api.get("/pet-type/")

export const getPetBreeds = (petTypeId) => api.get(`/pet-breed/?pet_type=${petTypeId}`)