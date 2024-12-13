export interface SignupRequestBody {
  name: string;
  email: string;
  password: string;
  code: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface AcademicInfoRequestBody {
  rollNumber: string;
  department: string;
  year: number;
  division: string;
  jwtPayload: any;
}
