import axiosInstance from "./base";

export const postImage = async (imageData: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', imageData);
    const response = await axiosInstance.post("/images", formData);
    return response.data;
}