import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import "../style/Card.css";
import MovieCard from "../components/Card/MovieCard";
import { toast } from "react-toastify";

function SearchPage() {
  const location = useLocation();
  const { query } = location.state;
  const [searchedMovieList, setSearchedMovieList] = useState({});
  const [resultName, setResultName] = useState("");

  useEffect(() => {
    async function searchMovie() {
      try {
        const response = await axios.get(`https://km4-challenge-5-api.up.railway.app/api/v1/search/movie?query=${query}&page=1`);
        console.log(JSON.stringify(response.data.data));
        setSearchedMovieList(response.data.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response.data.message);
          return;
        }
        toast.error(error.message);
      }
    }
    setResultName(query);
    searchMovie();
  }, [query]);

  return (
    <>
      <Header />
      <Container>
        <h2 className="text-danger p-4">Result Found: {resultName}</h2>
        <div className="d-flex flex-wrap justify-content-center">{searchedMovieList.length > 0 && searchedMovieList.map((movie, i) => <MovieCard key={i} title={movie.title} poster={movie.poster_path} to={`/detail/${movie.id}`} />)}</div>
      </Container>
    </>
  );
}

export default SearchPage;
