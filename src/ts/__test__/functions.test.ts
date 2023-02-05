/**
 * @jest-environment jsdom
 */

import { IMovie } from "../models/Movie";
import { movieSort } from "../functions";

const movies: IMovie[] = [
  {
    Title: "ZebraLand",
    imdbID: "1",
    Type: "animation",
    Poster: "n/a",
    Year: "1624",
  },
  {
    Title: "ZebraLand",
    imdbID: "1",
    Type: "animation",
    Poster: "n/a",
    Year: "1624",
  },
  {
    Title: "Astroid on Earth",
    imdbID: "2",
    Type: "horror",
    Poster: "n/a",
    Year: "2023",
  },
  {
    Title: "Catizar",
    imdbID: "3",
    Type: "drama",
    Poster: "n/a",
    Year: "2007",
  },
];

describe("movieSort", () => {
  test("sorts movies in ascending order", () => {
    const sortedMovies = movieSort(movies);
    expect(sortedMovies).toEqual([
      {
        Title: "Astroid on Earth",
        imdbID: "2",
        Type: "horror",
        Poster: "n/a",
        Year: "2023",
      },
      {
        Title: "Catizar",
        imdbID: "3",
        Type: "drama",
        Poster: "n/a",
        Year: "2007",
      },
      {
        Title: "ZebraLand",
        imdbID: "1",
        Type: "animation",
        Poster: "n/a",
        Year: "1624",
      },
      {
        Title: "ZebraLand",
        imdbID: "1",
        Type: "animation",
        Poster: "n/a",
        Year: "1624",
      },
    ]);
  });

  test("sorts movies in descending order", () => {
    const sortedMovies = movieSort(movies, false);
    expect(sortedMovies).toEqual([
      {
        Title: "ZebraLand",
        imdbID: "1",
        Type: "animation",
        Poster: "n/a",
        Year: "1624",
      },
      {
        Title: "ZebraLand",
        imdbID: "1",
        Type: "animation",
        Poster: "n/a",
        Year: "1624",
      },
      {
        Title: "Catizar",
        imdbID: "3",
        Type: "drama",
        Poster: "n/a",
        Year: "2007",
      },
      {
        Title: "Astroid on Earth",
        imdbID: "2",
        Type: "horror",
        Poster: "n/a",
        Year: "2023",
      },
    ]);
  });

  test("sorts the movies in ascending order if desc is false", () => {
    const sortedMovies = movieSort(movies, false);
    expect(sortedMovies[0].Title).toBe("ZebraLand");
    expect(sortedMovies[1].Title).toBe("ZebraLand");
    expect(sortedMovies[2].Title).toBe("Catizar");
    expect(sortedMovies[3].Title).toBe("Astroid on Earth");
  });
});
