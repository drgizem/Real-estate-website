export type User={
  email:string,
  uid:string,
  name:string,
  query:Filter
}
export type Home={
  city:string,
  state:string,
  type:string,
  room:string,
  bathroom:string,
  price:string,
  image:string,
  name:string,
  id:string,
  description:string,
  parking:boolean,
  pet:boolean,
  features:string,
  walk:string,
  transit:string,
  address:string,
  lease:string
}
export type Filter={
  room:string,
  bathroom:string,
  price:string,
  parking:string,
  pet:string,
  type:string
}