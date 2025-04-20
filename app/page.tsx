"use client"
import { Doctor, DoctorCategory } from "@/types";
import Hero from "./_Components/Hero";
import Search from "./_Components/Search";
import { getAllDoctors, getCategories } from "./_services/GlobalApi";
import { useEffect, useState } from "react";
import Categories from "./_Components/Categories";
import Loading from "./_Components/Loading";
import DoctorList from "./_Components/DoctorList";

export default function Home() {
  const[categories,setCategories]=useState<DoctorCategory[]>([])
  const[loading,setLoading]=useState(false)
  const[doctorsList,setDoctorsList]=useState<Doctor[]>([])
  const[filteredDoctorList,setFilteredDoctorList]=useState<Doctor[]>([])
  useEffect(()=>{
    getCategoriesData()
    getDoctors()
  },[])

  const getCategoriesData=async()=>{
    setLoading(true)
    try {
      const result=await getCategories()
      
       setCategories(result?.categories)
    } catch (error) {
      console.log(error);
      
    }finally{
      setLoading(false)
    }
    
    
  }

  const getDoctors=async()=>{
    setLoading(true)

    try {
      const result=await getAllDoctors()
      setDoctorsList(result?.doctors)
      setFilteredDoctorList(result?.doctors)

    } catch (error) {
      console.log(error);
      
    }finally{
      setLoading(false)

    }
  }

  return (
  <div>
    <Hero/>
    <Search filteredDoctorList={filteredDoctorList} doctorsList={doctorsList} setFilteredDoctorList={setFilteredDoctorList}/>
    <Categories categories={categories}/>
     <DoctorList doctorsList={filteredDoctorList} loading={loading}/>
   </div>
  );
}
