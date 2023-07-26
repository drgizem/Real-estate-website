import { collection, getDocs,doc,getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Home } from "../types";

export const RentalLoader=async()=>{
  const homeRef=collection(db,"rentals")
  const rentals=await getDocs(homeRef)
  let rentalHomes:Home[]=[]
  rentals.forEach((doc:any)=>{
    rentalHomes.push({id:doc.id,...doc.data()})
  })

  return rentalHomes
}
export const SaleLoader=async()=>{
  const homeRef=collection(db,"buy")
  const sales=await getDocs(homeRef)
  let rentalHomes:Home[]=[]
  sales.forEach((doc:any)=>{
    rentalHomes.push({id:doc.id,...doc.data()})
  })

  return rentalHomes
}
export const SavedjobsLoader=async(id:string)=>{
  const userRef=doc(db,"users",`${id}`)
  const listRef=await getDoc(userRef)
  const dbList=listRef.data()
  return dbList!.saved
}