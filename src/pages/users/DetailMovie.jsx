import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Carousel } from "react-bootstrap";
import NavbarComponent from "../../components/Header/NavbarComponent";
import { StarFill } from "react-bootstrap-icons";
import { toast } from "react-toastify";

import "../../style/Detail.css";

function DetailMovie() {
  const [detailMovie, setDetailMovie] = useState({});
  const params = useParams();

  useEffect(() => {
    const getDetailMovie = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`https://km4-challenge-5-api.up.railway.app/api/v1/movie/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(JSON.stringify(response.data.data));
        const data = response.data.data;
        setDetailMovie(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // If not valid token
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            // Temporary solution
            return (window.location.href = "/");
          }

          toast.error(error.response.data.message);
          return;
        }
        toast.error(error.message);
      }
    };

    getDetailMovie();
  }, [params]);

  return (
    <>
      <NavbarComponent />
      <Carousel controls={false}>
        <Carousel.Item>
          <img className="Carousel-img d-block w-100" src={`https://image.tmdb.org/t/p/original${detailMovie?.backdrop_path}`} alt="First slide" />
          <Carousel.Caption className="Movie-caption">
            <h2 className="Movie-caption-title">{detailMovie?.title}</h2>
            <p className="Movie-genres">
              {detailMovie?.genres &&
                detailMovie?.genres?.length > 0 &&
                detailMovie?.genres?.map((genre, i) => {
                  return i === detailMovie?.genres.length - 1 ? genre.name : `${genre.name}, `;
                })}
            </p>
            <p className="Movie-caption-text">{detailMovie?.overview}</p>
            <p className="Movie-rate">
              <StarFill className="Icon-star" />
              {detailMovie?.vote_average ? detailMovie.vote_average.toFixed(1) : "-"}
            </p>
            <Button className="Movie-caption-button" variant="danger">
              Watch Trailer
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default DetailMovie;
