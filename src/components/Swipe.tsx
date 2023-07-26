import { Card, Col, Container, Row } from "react-bootstrap"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState,useEffect, useRef } from "react";
import { Home } from "../types";
import { RentalLoader } from "../firebase/functions";


export const Swipe= () => {
  const [rentals, setRentals] = useState<Home[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    RentalLoader().then((products) => {
      setRentals(products);
    });
  }, []);

  const slideLeft = () => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollBy({ left: -500, behavior: 'smooth' });
    }
  };

  const slideRight = () => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollBy({ left: 500, behavior: 'smooth' });
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <div>
            <div className="swiper-title">
              <h4>Rentals For You</h4>
              <div>
                <ArrowBackIosIcon onClick={slideLeft} />
                <ArrowForwardIosIcon onClick={slideRight} />
              </div>
            </div>
            <div className="swiper-homes" ref={sliderRef}>
              {rentals.map((data, index) => (
                <Card key={index} className="swiper-rental mx-1">
                  <Card.Img src={data.image} alt="" />
                  <h3 className="rentals-title">{data.name}</h3>
                  <Card.Text><strong>${data.price}</strong>/month </Card.Text>
                  <Card.Text>
                    {data.room} bds / {data.bathroom} ba
                  </Card.Text>
                  <Card.Text>{data.address}</Card.Text>
                </Card>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};



