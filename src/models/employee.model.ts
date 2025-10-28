export interface Employee {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  employeeId: string;
  joinDate: string;
  email: string;
  phone: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  employeeType: 'Full-Time' | 'Part-Time' | 'Internship' | 'Freelance';
  workLocation: 'On-Site' | 'Remote';
  gender: 'Male' | 'Female' | "Other";
  birthDate: string;
  address: string;
  performance: number;
  salary: number;
  attendance: { date: string, status: 'Present' | 'Absent' | 'Late' }[];
}
