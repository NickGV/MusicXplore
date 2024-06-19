import getToken from "../auth/auth";

export const search = async (query, type) => {
  const token = await getToken();

  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=50`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();
  return data;
};
