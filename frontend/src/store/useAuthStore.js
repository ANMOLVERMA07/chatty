import {create} from "zustand";
import { axiosInstance } from "../utils/axiosInstance.js";
import toast from "react-hot-toast";

export const authStore = create((set) => ({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,


    signup:async(data)=> {
        set({ isSigningUp: true});
        try {
            const res = await axiosInstance.get("/auth/signup",data);
            set({ authUser:res.data});
            toast.success("Signup successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp:false });
        }
    },

    login: async(data) => {
        set({ isLoggingIn:true});
        try {
            const res = await axiosInstance.get("/auth/login",data);
            set({authUser:res.data});
            toast.success("Login Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn:false});
        }
    },

    logout: async() => {
        try {
            await axiosInstance.get("/auth/logout");
            set({authUser:null});
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}))