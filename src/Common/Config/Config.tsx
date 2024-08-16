export const getCOnfigHeader = () => {
  const userDetailsString = localStorage.getItem("userDetails");
  const userDetails = userDetailsString ? JSON.parse(userDetailsString) : {};
  const token = userDetails.idToken;

  const configHeaders = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: token,
    },
  };

  return configHeaders;
};
// export const baseUrl="http://localhost:8080"
export const baseUrl = "https://soulcrm.soulsoft.in";
