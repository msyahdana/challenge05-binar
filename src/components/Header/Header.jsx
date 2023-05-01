import React, { useState, useEffect } from "react";
import { Button, Carousel } from "react-bootstrap";
import axios from "axios";
import "../../style/Navbar.css";
import NavbarComponent from "./NavbarComponent";

const baseUrl = process.env.REACT_APP_BASEURL;
const apiKey = process.env.REACT_APP_APIKEY;

function Header() {
  const [detailMovie, setDetailMovie] = useState({});
  const [detailMovie2, setDetailMovie2] = useState({});
  const [detailMovie3, setDetailMovie3] = useState({});

  useEffect(() => {
    async function getDetailMovie() {
      try {
        const response = await axios.get(`${baseUrl}/movie/373571?api_key=${apiKey}&language=en-US`);
        const response2 = await axios.get(`${baseUrl}/movie/76600?api_key=${apiKey}&language=en-US`);
        const response3 = await axios.get(`${baseUrl}/movie/505642?api_key=${apiKey}&language=en-US`);
        setDetailMovie(response.data);
        setDetailMovie2(response2.data);
        setDetailMovie3(response3.data);
      } catch (error) {
        alert(error);
      }
    }

    getDetailMovie();
  }, []);

  return (
    <>
      <NavbarComponent />
      <Carousel>
        <Carousel.Item>
          <img className="Carousel-img d-block w-100" src={`https://image.tmdb.org/t/p/original${detailMovie?.backdrop_path}`} alt="First slide" />
          <Carousel.Caption className="Movie-caption">
            <h2 className="Movie-caption-title">{detailMovie?.title}</h2>
            <p className="Movie-caption-text">{detailMovie?.overview}</p>
            <Button className="Movie-caption-button" variant="danger">
              Watch Trailer
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="Carousel-img d-block w-100" src={`https://image.tmdb.org/t/p/original${detailMovie2?.backdrop_path}`} alt="First slide" />
          <Carousel.Caption className="Movie-caption">
            <h2 className="Movie-caption-title">{detailMovie2?.title}</h2>
            <p className="Movie-caption-text">{detailMovie2?.overview}</p>
            <Button className="Movie-caption-button" variant="danger">
              Watch Trailer
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="Carousel-img d-block w-100" src={`https://image.tmdb.org/t/p/original${detailMovie3?.backdrop_path}`} alt="First slide" />
          <Carousel.Caption className="Movie-caption">
            <h2 className="Movie-caption-title">{detailMovie3?.title}</h2>
            <p className="Movie-caption-text">{detailMovie3?.overview}</p>
            <Button className="Movie-caption-button" variant="danger">
              Watch Trailer
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default Header;
