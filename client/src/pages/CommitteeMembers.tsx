import React, { useState, useEffect } from "react";
import { getCommitteeMembers } from "../api/committeeApi";

interface AcademicInfo {
  department: string;
  year: number;
  division?: string;
  rollNo: string;
}

interface Role {
  roleName: string;
}

interface Member {
  id: number;
  name: string;
  email: string;
  academicInfo: AcademicInfo;
  role: Role;
}

const CommitteeMembers: React.FC = () => {
  const [heads, setHeads] = useState<Member[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  const fetchMembers = async () => {
    try {
      const response = await getCommitteeMembers();
      setHeads(response.data.members[0]);
      setMembers(response.data.members[1]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  console.log(heads, members);

  return (
    <div className="container mx-auto px-20 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Committee Members</h1>

      {/* Heads Table */}
      {heads?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Heads</h2>
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Roll No/Emp ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Department
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {heads.map((head) => (
                  <tr key={head.id} className="hover:bg-gray-800/50">
                    <td className="px-6 py-4 text-sm text-gray-300">{head.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{head.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{head.role.roleName}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{head.academicInfo.rollNo}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{head.academicInfo.year}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{head.academicInfo.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Members Table */}
      {members?.length > 0 ? (
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Members</h2>
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Roll No/Emp ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Department
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-800/50">
                    <td className="px-6 py-4 text-sm text-gray-300">{member.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{member.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{member.role.roleName}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{member.academicInfo.rollNo}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{member.academicInfo.year}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{member.academicInfo.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-gray-400 text-center">No members found</div>
      )}
    </div>
  );
};

export default CommitteeMembers;
