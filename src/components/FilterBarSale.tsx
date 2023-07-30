import { Container,Row,Col,Form, Button } from "react-bootstrap"

type Props={
  handleDetail(e:React.ChangeEvent<HTMLSelectElement>):void,
  filter:{
    room:string,
    bathroom:string,
    type:string
  },
  onFilter():void
}
export const FilterBarSale=({filter,handleDetail,onFilter}:Props)=>{

  return (
    <Container className="filter">
      <Row>
        <Col>
        <Form.Select value={filter.type} name="type" onChange={handleDetail}>
          <option >Home Type</option>
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
        <Col> <Button onClick={onFilter}>Show Results</Button></Col>
      </Row>
    </Container>
  )
}