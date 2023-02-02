import { IOmdbResponse } from "./../models/IOmdbResponse";
import { IMovie } from "./../models/Movie";
import axios from "axios";

// export const getData = async (searchText: string): Promise<IMovie[]> => {
//   return axios
//     .get<IOmdbResponse>("http://omdbapi.com/?apikey=416ed51a&s=" + searchText)
//     .then((data) => {
//       return data.data.Search;
//     })
//     .catch(() => {
//       return [];
//     });
// };

export const getData = async (searchText: string): Promise<IMovie[]> => {
  try {
    const response = await axios.get<IOmdbResponse>(
      `http://omdbapi.com/?apikey=416ed51a&s=${searchText}`
    );

    return response.data.Search;
  } catch (error) {
    return [];
  }
};
