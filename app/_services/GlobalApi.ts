import { AppoitmentData, DoctorCategoryResponse, DoctorsDataResponse } from "@/types"
import request, { gql } from "graphql-request"

const MASTER_URL  = `https://ap-south-1.cdn.hygraph.com/content/${process.env.NEXT_PUBLIC_MASTER_URL_KEY}/master`

export const getCategories = async ():Promise<DoctorCategoryResponse>=>{
    const query = gql`
    query MyQuery {
  categories {
    name
    icon {
      url
    }
  }
}`
    const result = await request(MASTER_URL, query) as DoctorCategoryResponse

    return result
}

export const getAllDoctors = async ():Promise<DoctorsDataResponse>=>{
  const query = gql`
  query MyQuery {
  doctors {
    about
    address
    category {
      name
      icon {
        url
      }
    }
    startTime
    endTime
    name
    patients
    yearsOfExperaince
     image {
      url
    }
    id
  }
}
  
  `
  const result = await request(MASTER_URL, query) as DoctorsDataResponse

  return result
}

export const getDoctoresbyCategory = async ({categoryName}:{categoryName:string}):Promise<DoctorsDataResponse>=>{
  const query = gql`
 query MyQuery {
  doctors(where: {category_every: {name: "${categoryName}"}}) {
    id
    name
    image {
      url
    }
    patients
    startTime
    yearsOfExperaince
    about
    address
    category {
      name
      icon {
        url
      }
    }
    endTime
  }
}
  `
  const result = await request(MASTER_URL, query) as DoctorsDataResponse

  return result
}

export const getDoctoresDetailsbyId = async ({doctorId}:{doctorId:string}):Promise<DoctorsDataResponse>=>{
  const query = gql`
     query MyQuery {
  doctors(where: {id: "${doctorId}"}) {
    about
    address
    category {
      name
      icon {
        url
      }
    }
    id
    image {
      url
    }
    name
    patients
    startTime
    yearsOfExperaince
    endTime
  }
}
  `
  const result = await request(MASTER_URL, query) as DoctorsDataResponse

  return result
}

export const getTimeSlots=async({date,id}:{date:string,id:string}):Promise<AppoitmentData>=>{
  const query=gql`
  query MyQuery {
  appoitments(
    where: {date: "${date}", doctor: {id: "${id}"}}
  ) {
    time
    id
  }
}
  `
  const result = await request(MASTER_URL, query) as AppoitmentData

  return result
}
