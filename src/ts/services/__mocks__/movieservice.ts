import { IMovie } from "../../models/Movie";
// import { getData } from "../movieservice";

const movie: IMovie[] = [
  {
    Title: "MovieTitle",
    imdbID: "imdb-id",
    Type: "horror",
    Poster: "n/a",
    Year: "2023",
  },
];

export const getData = async (searchText: string): Promise<IMovie[]> => {
  return new Promise((resolve) => {
    if (!searchText) {
      throw new Error("Something went wrong");
    } else {
      resolve(movie);
    }
  });
};
