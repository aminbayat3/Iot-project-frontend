import { authAxios } from "./axios";

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await authAxios.post("/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data; 
};

export const getDocuments = async (page = 1, perPage = 10) => {
  const response = await authAxios.get(`/documents?page=${page}&perPage=${perPage}`);
  return response.data; 
};

export const getDocumentById = async (id) => {
  const response = await authAxios.get(`/documents/${id}`);
  return response.data;
};