import axios from "axios";

export const callApi = (axiosRequestConfig, schema, id, dto) => {
  return axios(axiosRequestConfig)
    .then(response => {
      if (response.error) {
        return Promise.reject(response);
      }
      return { response };
    })
    .catch(error => {
      return { error };
    });
};
