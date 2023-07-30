import { Card, Col, Container, Row } from "react-bootstrap"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState,useEffect, useRef } from "react";
import { Home } from "../types";
import { SaleLoader } from "../firebase/functions";
import { useNavigate } from "react-router-dom";

export const SwipeSale= () => {
  const [sales, setSales] = useState<Home[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);
  const navigate=useNavigate()


  useEffect(() => {
    SaleLoader().then((products) => {
      setSales(products);
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
  const handleRoute=(id:string)=>{
    navigate(`/buy/${id}`)
  }
  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col>
          <div>
            <div className="swiper-title">
              <h4>Homes For You</h4>
              <div>
                <ArrowBackIosIcon onClick={slideLeft} />
                <ArrowForwardIosIcon onClick={slideRight} />
              </div>
            </div>
            <div className="swiper-homes" ref={sliderRef}>
              {sales.map((data, index) => (
                <Card key={index} className="swiper-rental mx-1" onClick={()=>handleRoute(data.id)}>
                  <Card.Img src={data.image} alt="" />
                  <h3 className="rentals-title">{data.name}</h3>
                  <Card.Text><strong>${data.price}</strong></Card.Text>
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



