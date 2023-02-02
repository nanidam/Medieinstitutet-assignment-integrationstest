import { IMovie } from "../../models/Movie";
// import { getData } from "../movieservice";

export const movies: IMovie[] = [
  {
    Title: "MovieTitle1",
    imdbID: "imdb-1337",
    Type: "horror",
    Poster: "n/a",
    Year: "2023",
  },
  {
    Title: "MovieTitle2",
    imdbID: "imdb-0000",
    Type: "drama",
    Poster: "n/a",
    Year: "1650",
  },
];

// export const getData = async (searchText: string): Promise<IMovie[]> => {
//   return new Promise((resolve) => {
//     if (!searchText) {
//       throw new Error("Something went wrong");
//     } else {
//       resolve(movie);
//     }
//   });
// };

export async function getData(): Promise<IMovie[]> {
  return new Promise((resolve) => {
    resolve(movies);
  });
}
