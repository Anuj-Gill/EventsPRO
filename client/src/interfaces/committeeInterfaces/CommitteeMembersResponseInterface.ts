interface AcademicInfo {
  department: string;
  year: number;
  division?: string;
  rollNo: string;
}

interface Role {
  roleName: string;
}

export interface Member {
  id: number;
  name: string;
  email: string;
  academicInfo: AcademicInfo;
  role: Role;
}

export type CommitteeMembersResponse = [Member[], Member[]];
