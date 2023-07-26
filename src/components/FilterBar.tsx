import { useState } from "react"
import { Container,Row,Col,Form } from "react-bootstrap"
import { Filter} from "../types"

type Props={
  handleDetail(e:React.ChangeEvent<HTMLSelectElement>):void,
  filter:Filter
}
export const FilterBar=({filter,handleDetail}:Props)=>{


  return (
    <Container className="filter">
      <Row>
        <Col>
        <Form.Select value={filter.type} name="type" onChange={handleDetail}>
          <option value="home">Home Type</option>
          <option value="House">Houses</option>
          <option value="Apartment">Apartments</option>
          <option value="Condo">Condos</option>
        </Form.Select>
        </Col>
        <Col>
        <Form.Select value={filter.room} name="room" onChange={handleDetail}>
          <option value="0">Bedrooms</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="0">Any</option>
        </Form.Select>
        </Col>
        <Col>
        <Form.Select value={filter.bathroom} name="bathroom" onChange={handleDetail}>
          <option value="0">Bathrooms</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="0">Any</option>
        </Form.Select>
        </Col>
        <Col>
        <Form.Select value={filter.pet} name="pet" onChange={handleDetail}>
          <option value="pet">Pet</option>
          <option value="true">Allows</option>
          <option value="false">No pet</option>
        </Form.Select>
        </Col>
        <Col>
        <Form.Select value={filter.parking} name="parking" onChange={handleDetail}>
          <option value="parking">Parking</option>
          <option value="true">On-site Parking</option>
          <option value="false">No parking</option>
        </Form.Select>
        </Col>
        <Col>
        <Form.Select value={filter.price} name="price" onChange={handleDetail}>
          <option value="10000">Max Price</option>
          <option value="2000">$2000</option>
          <option value="3000">$3000</option>
          <option value="4000">$4000</option>
          <option value="10000">Any</option>
        </Form.Select>
        </Col>
      </Row>
    </Container>
  )
}