import { useEffect, useState } from "react"
import { Container,Row, Card } from "react-bootstrap"
import { Filter, Home } from "../types"
import { RentalLoader, SavedjobsLoader } from "../firebase/functions"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuthContext } from "../context/AuthContext";
import { useLoaderData, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { FilterBar } from "./FilterBar";


export const Rent=()=>{
  const [savedJobs,setSavedJobs]=useState<Home[]>([])
  const [set,setSet]=useState(false)
  const [filter,setFilter]=useState<Filter>(
    {
      room:"0",
      bathroom:"0",
      price:"10000",
      parking:"",
      pet:"",
      type:""
    })
  const [filteredhomes,setFilteredHomes]=useState<Home[]>([])
  const user=useAuthContext()
  const navigate=useNavigate()

  const homesData=useLoaderData() as {item:Home[]}

  useEffect(()=>{
    if(user.uid !==""){
      SavedjobsLoader(user.uid).then((data)=>{
        setSavedJobs(data)
      })
    }
  },[])

  const onFilter=()=>{
    setSet(true)
    if(filter.type===""&& filter.pet===""&& filter.parking===""){
      const filterhomes=homesData.item.filter((home)=> {
        return (Number(home.room) >=Number(filter.room)
         && Number(home.bathroom) >=Number(filter.bathroom)
        && Number(home.price)<=Number(filter.price))})
        setFilteredHomes(filterhomes)
    }else if(filter.type==="" && filter.pet===""){
      const filterhomes=homesData.item.filter((home)=> {
        return (Number(home.room) >=Number(filter.room)
         && Number(home.bathroom) >=Number(filter.bathroom)
        && Number(home.price)<=Number(filter.price)
        && String(home.parking)===filter.parking)})
        setFilteredHomes(filterhomes)
    }else if(filter.type==="" && filter.parking===""){
      const filterhomes=homesData.item.filter((home)=> {
        return (Number(home.room) >=Number(filter.room)
         && Number(home.bathroom) >=Number(filter.bathroom)
        && Number(home.price)<=Number(filter.price)
        && String(home.pet)===filter.pet )})
        setFilteredHomes(filterhomes)
    } else if(filter.pet==="" && filter.parking===""){
      const filterhomes=homesData.item.filter((home)=> {
        return (Number(home.room) >=Number(filter.room)
         && Number(home.bathroom) >=Number(filter.bathroom)
        && Number(home.price)<=Number(filter.price)
        && home.type===filter.type)})
        setFilteredHomes(filterhomes)
    }else if(filter.type===""){
      const filterhomes=homesData.item.filter((home)=> {
        return (Number(home.room) >=Number(filter.room)
         && Number(home.bathroom) >=Number(filter.bathroom)
        && Number(home.price)<=Number(filter.price)
        && String(home.pet)===filter.pet 
        && String(home.parking)===filter.parking)})
        setFilteredHomes(filterhomes)
    }else if(filter.pet===""){
      const filterhomes=homesData.item.filter((home)=> {
        return (Number(home.room) >=Number(filter.room)
         && Number(home.bathroom) >=Number(filter.bathroom)
        && home.type===filter.type
        && Number(home.price)<=Number(filter.price)
        && String(home.parking)===filter.parking)})
        setFilteredHomes(filterhomes)
    } else if(filter.parking===""){
      const filterhomes=homesData.item.filter((home)=> {
        return (Number(home.room) >=Number(filter.room)
         && Number(home.bathroom) >=Number(filter.bathroom)
        && home.type===filter.type
        && Number(home.price)<=Number(filter.price)
        && String(home.pet)===filter.pet )})
        setFilteredHomes(filterhomes)
    } 
  }
const handleSave=async(data:Home)=>{
  if(user.email ===""){
    navigate("/login")
  }else {
    const saved=homesData.item.find((item)=>item.name===data.name)
    const userRef=doc(db,"users",`${user.uid}`)
    const listRef=await getDoc(userRef)
    const dbList=listRef.data()
    const newList={...dbList}
    const index=newList.saved.findIndex((item:Home)=>item.name===data.name)
    if(index===-1){
      const newSaved=[...dbList!.saved,saved]
      setDoc(userRef,{...dbList,saved:newSaved})
      setSavedJobs(newSaved)
    }else{
      updateDoc(userRef,{...dbList})
      setSavedJobs({...savedJobs})
    }
  } 
}
const deleteSaved=async(data:Home)=>{
  const userRef=doc(db,"users",`${user.uid}`)
  const listRef=await getDoc(userRef)
  const dbList=listRef.data()
  const newList=dbList!.saved.filter((item:Home)=>item.name!==data.name)
  setDoc(userRef,{...dbList,saved:newList})
  setSavedJobs(newList)
}
const handleInclude=(data:Home)=>{
  if(savedJobs.length>0){
    const index=savedJobs.findIndex((item:any)=>item.name===data.name)
    if(index===-1){
      return false
    }else{
      return true
    }
  }
}
const handleRoute=(id:string)=>{
  navigate(`/rent/${id}`)
}
const handleFilter=(e:React.ChangeEvent<HTMLSelectElement>)=>{
  const {name,value}=e.target
  setFilter((pre)=>{
    return {...pre,[name]:value}
  })
}

  return (<>
    <FilterBar handleDetail={handleFilter} filter={filter} onFilter={onFilter}/>
    <Container className="rentals">
        <Row className="rental-homes">
      {set ? filteredhomes.map((data,index)=>{
      return <Card key={index} className="rental" >
      <div className="save-icon" >
       {(savedJobs && handleInclude(data)) ? <FavoriteIcon fontSize="large" onClick={()=>deleteSaved(data)}/> : <FavoriteBorderIcon fontSize="large" onClick={()=>handleSave(data)}/> } </div>
      <div onClick={()=>handleRoute(data.id)}>
      <Card.Img src={data.image} alt="" />
      <h3 className="mb-2">{data.name}</h3>
      <Card.Text><strong>${data.price}</strong>/month </Card.Text>
      <Card.Text>
        {data.room} bds / {data.bathroom} ba
      </Card.Text>
      <Card.Text className="mt-2">{data.address}</Card.Text></div>
    </Card>
    }) : homesData.item.map((data,index)=>{
      return <Card key={index} className="rental" >
      <div className="save-icon" >
       {(savedJobs && handleInclude(data)) ? <FavoriteIcon fontSize="large" onClick={()=>deleteSaved(data)}/> : <FavoriteBorderIcon fontSize="large" onClick={()=>handleSave(data)}/> } </div>
      <div onClick={()=>handleRoute(data.id)}>
      <Card.Img src={data.image} alt="" />
      <h3 className="mb-2">{data.name}</h3>
      <Card.Text><strong>${data.price}</strong>/month </Card.Text>
      <Card.Text>
        {data.room} bds / {data.bathroom} ba
      </Card.Text>
      <Card.Text className="mt-2">{data.address}</Card.Text></div>
    </Card>
    }) }
      </Row>
    </Container>
    </>)
}

export const RentLoader=async()=>{
  const item=await RentalLoader()
  return {item}
}