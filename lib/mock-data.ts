export type BedStatus = "available" | "limited" | "full";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  available: boolean;
  consultationFee?: number;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  area: string;
  phone: string;
  distance: number; // in km
  status: BedStatus;
  beds: {
    total: number;
    available: number;
    occupied: number;
  };
  specialties: string[];
  doctors: Doctor[];
  lastUpdated: string; // ISO timestamp
}

export const mockHospitals: Hospital[] = [
  {
    id: "1",
    name: "Aga Khan University Hospital",
    address: "Stadium Road, Karachi",
    area: "Stadium Road",
    phone: "+92 21 111 911 911",
    distance: 2.5,
    status: "available",
    beds: {
      total: 500,
      available: 45,
      occupied: 455,
    },
    specialties: ["Emergency", "ICU", "Cardiology", "Surgery"],
    doctors: [
      { id: "d1", name: "Dr. Ifhtikar Ahmed", specialty: "HEART SURGEON", available: true, consultationFee: 5000 },
      { id: "d2", name: "Dr. Zubair Aslam", specialty: "NEURO SPECIALIST", available: true, consultationFee: 6000 },
      { id: "d3", name: "Dr. Ayesha Malik", specialty: "CARDIOLOGIST", available: false },
      { id: "d4", name: "Dr. Hassan Raza", specialty: "GENERAL SURGEON", available: true, consultationFee: 4000 },
    ],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Jinnah Postgraduate Medical Centre",
    address: "Rafiqui Shaheed Road, Karachi",
    area: "JPMC",
    phone: "+92 21 99201300",
    distance: 3.2,
    status: "limited",
    beds: {
      total: 1200,
      available: 12,
      occupied: 1188,
    },
    specialties: ["Emergency", "ICU", "Trauma", "General"],
    doctors: [
      { id: "d5", name: "Dr. Muhammad Ali", specialty: "TRAUMA SURGEON", available: true, consultationFee: 3500 },
      { id: "d6", name: "Dr. Fatima Sheikh", specialty: "EMERGENCY MEDICINE", available: true, consultationFee: 3000 },
      { id: "d7", name: "Dr. Usman Khan", specialty: "ORTHOPEDIC SURGEON", available: false },
      { id: "d8", name: "Dr. Sana Iqbal", specialty: "GENERAL PHYSICIAN", available: true, consultationFee: 2000 },
    ],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Liaquat National Hospital",
    address: "National Stadium Road, Karachi",
    area: "Stadium Road",
    phone: "+92 21 111 456 111",
    distance: 4.1,
    status: "available",
    beds: {
      total: 350,
      available: 28,
      occupied: 322,
    },
    specialties: ["Emergency", "ICU", "Neurology", "Orthopedics"],
    doctors: [
      { id: "d9", name: "Dr. Ahmed Rizwan", specialty: "NEUROLOGIST", available: true, consultationFee: 5500 },
      { id: "d10", name: "Dr. Mariam Hassan", specialty: "ORTHOPEDIC SPECIALIST", available: true, consultationFee: 4500 },
      { id: "d11", name: "Dr. Bilal Siddiqui", specialty: "NEURO SURGEON", available: false },
      { id: "d12", name: "Dr. Hina Abbas", specialty: "PHYSIOTHERAPIST", available: true, consultationFee: 2500 },
    ],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Civil Hospital Karachi",
    address: "Rafiqui Shaheed Road, Karachi",
    area: "Civil Lines",
    phone: "+92 21 99215700",
    distance: 3.8,
    status: "full",
    beds: {
      total: 1800,
      available: 0,
      occupied: 1800,
    },
    specialties: ["Emergency", "ICU", "General", "Pediatrics"],
    doctors: [
      { id: "d13", name: "Dr. Imran Shah", specialty: "PEDIATRICIAN", available: false },
      { id: "d14", name: "Dr. Nida Farooq", specialty: "PEDIATRIC SURGEON", available: false },
      { id: "d15", name: "Dr. Tariq Mahmood", specialty: "GENERAL MEDICINE", available: false },
      { id: "d16", name: "Dr. Rabia Ali", specialty: "CHILD SPECIALIST", available: false },
    ],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Ziauddin Hospital",
    address: "4/B, Shahrah-e-Ghalib, Block 6, Clifton",
    area: "Clifton",
    phone: "+92 21 35862937",
    distance: 5.5,
    status: "available",
    beds: {
      total: 200,
      available: 35,
      occupied: 165,
    },
    specialties: ["Emergency", "ICU", "Cardiology"],
    doctors: [
      { id: "d17", name: "Dr. Saad Ahmed", specialty: "CARDIAC SURGEON", available: true, consultationFee: 7000 },
      { id: "d18", name: "Dr. Zainab Malik", specialty: "CARDIOLOGIST", available: true, consultationFee: 5000 },
      { id: "d19", name: "Dr. Faisal Qureshi", specialty: "HEART SPECIALIST", available: true, consultationFee: 5500 },
    ],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "6",
    name: "South City Hospital",
    address: "26/1, Khayaban-e-Roomi, Block 7, Clifton",
    area: "Clifton",
    phone: "+92 21 35361261",
    distance: 6.2,
    status: "limited",
    beds: {
      total: 150,
      available: 8,
      occupied: 142,
    },
    specialties: ["Emergency", "ICU", "General"],
    doctors: [
      { id: "d20", name: "Dr. Omar Farooq", specialty: "GENERAL SURGEON", available: true, consultationFee: 4000 },
      { id: "d21", name: "Dr. Aisha Khan", specialty: "GYNECOLOGIST", available: false },
      { id: "d22", name: "Dr. Hamza Ali", specialty: "UROLOGIST", available: true, consultationFee: 4500 },
    ],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Dow University Hospital",
    address: "Baba-e-Urdu Road, Karachi",
    area: "Dow Medical College",
    phone: "+92 21 99215751",
    distance: 4.5,
    status: "available",
    beds: {
      total: 400,
      available: 52,
      occupied: 348,
    },
    specialties: ["Emergency", "ICU", "General", "Surgery"],
    doctors: [
      { id: "d23", name: "Dr. Waseem Akram", specialty: "GENERAL SURGEON", available: true, consultationFee: 3500 },
      { id: "d24", name: "Dr. Saba Rizvi", specialty: "DERMATOLOGIST", available: true, consultationFee: 3000 },
      { id: "d25", name: "Dr. Asad Iqbal", specialty: "ENT SPECIALIST", available: true, consultationFee: 3200 },
      { id: "d26", name: "Dr. Nadia Sheikh", specialty: "OPHTHALMOLOGIST", available: false },
    ],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "8",
    name: "National Medical Centre",
    address: "Main Korangi Road, Karachi",
    area: "Korangi",
    phone: "+92 21 35091800",
    distance: 8.3,
    status: "limited",
    beds: {
      total: 180,
      available: 5,
      occupied: 175,
    },
    specialties: ["Emergency", "General"],
    doctors: [
      { id: "d27", name: "Dr. Kamran Hussain", specialty: "GENERAL PHYSICIAN", available: true, consultationFee: 2000 },
      { id: "d28", name: "Dr. Sara Ahmed", specialty: "FAMILY MEDICINE", available: false },
    ],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "9",
    name: "Al-Khidmat Hospital",
    address: "Main University Road, Karachi",
    area: "Gulshan-e-Iqbal",
    phone: "+92 21 34940000",
    distance: 7.1,
    status: "available",
    beds: {
      total: 120,
      available: 22,
      occupied: 98,
    },
    specialties: ["Emergency", "General"],
    doctors: [
      { id: "d29", name: "Dr. Yasir Malik", specialty: "GENERAL PRACTITIONER", available: true, consultationFee: 1500 },
      { id: "d30", name: "Dr. Amina Hassan", specialty: "INTERNAL MEDICINE", available: true, consultationFee: 2500 },
      { id: "d31", name: "Dr. Zohaib Khan", specialty: "EMERGENCY DOCTOR", available: true, consultationFee: 2000 },
    ],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "10",
    name: "Memon Medical Institute",
    address: "Main National Highway, Karachi",
    area: "Gulistan-e-Johar",
    phone: "+92 21 34550000",
    distance: 9.5,
    status: "full",
    beds: {
      total: 250,
      available: 0,
      occupied: 250,
    },
    specialties: ["Emergency", "ICU", "General"],
    doctors: [
      { id: "d32", name: "Dr. Salman Memon", specialty: "GENERAL SURGEON", available: false },
      { id: "d33", name: "Dr. Lubna Memon", specialty: "GYNECOLOGIST", available: false },
      { id: "d34", name: "Dr. Adnan Sheikh", specialty: "ANESTHESIOLOGIST", available: false },
    ],
    lastUpdated: new Date().toISOString(),
  },
];
