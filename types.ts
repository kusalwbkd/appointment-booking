export type DoctorCategory = {
    name: string;
    icon: {
      url: string;
    };
  };
  
  export type DoctorCategoryResponse = {
  
    categories: DoctorCategory[];

  };
  
// Type for a single doctor
export type Doctor = {
  name: string;
  address: string;
  about: string;
  category: DoctorCategory[];
  startTime: string;
  endTime: string;
  date:string|null
  patients: string;
  yearsOfExperaince: number;
  image: {
    url:string
  }
  id:string
};

// Type for the full API response
export type DoctorsDataResponse = {
  
    doctors: Doctor[];
  
};

export interface Appoitment {
  id: string;
  time: string;
}

export interface AppoitmentData {
 
    appoitments: Appoitment[];
  
}

export interface BookedDataResponse{
  appoitments:{
    doctor:Doctor[]
  }
}
export interface BookingData{
  date:string,
  time:string,
  doctor:Doctor,
  id:string
}