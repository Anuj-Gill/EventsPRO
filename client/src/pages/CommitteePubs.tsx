import React, { useState } from "react";
import useCommitteePubs from "../hooks/useCommitteePubs";
import Loading from "../components/Helpers/Loading";
import { roleState } from "../store/atoms/RoleState";
import { useRecoilValue } from "recoil";
import { addCommitteePubs } from "../api/committeeApi";
import { Trash2, Edit, Plus } from "lucide-react";

// Pub Item Interface
interface PubItem {
  id?: string;
  name: string;
  contact: string;
}

const CommitteePubs: React.FC = () => {
  const { pubs, error, loading, refetch } = useCommitteePubs();
  const role = useRecoilValue(roleState);
  const isHeadRole = role.includes("Head");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPub, setCurrentPub] = useState<PubItem>({ name: "", contact: "" });

  // Add Pub Handler
  const handleAddPub = async () => {
    try {
      await addCommitteePubs(currentPub);
      refetch();
      setIsAddModalOpen(false);
      setCurrentPub({ name: "", contact: "" });
    } catch (error) {
      console.error("Failed to add publication", error);
    }
  };

  if (loading) return <Loading text="Fetching Committee Pubs" />;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Committee Publications</h1>
        {isHeadRole && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-md hover:from-green-500 hover:to-green-400"
          >
            <Plus className="inline-block w-5 h-5 mr-2" />
            Add Publication
          </button>
        )}
      </div>

      {/* Add Publication Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add New Publication</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={currentPub.name}
                onChange={(e) =>
                  setCurrentPub((prev) => ({ ...prev, name: e.target.value }))
                }
                className="mt-1 block w-full border border-gray-700 bg-gray-800 text-gray-200 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="contact" className="block text-sm font-medium text-gray-300">
                Contact
              </label>
              <input
                id="contact"
                type="text"
                value={currentPub.contact}
                onChange={(e) =>
                  setCurrentPub((prev) => ({ ...prev, contact: e.target.value }))
                }
                className="mt-1 block w-full border border-gray-700 bg-gray-800 text-gray-200 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-md text-sm hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPub}
                disabled={!currentPub.name || !currentPub.contact}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-md text-sm hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Publications Table */}
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Contact
              </th>
              {isHeadRole && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {pubs.length > 0 ? (
              pubs.map((pub: PubItem) => (
                <tr key={pub.id} className="hover:bg-gray-800/50">
                  <td className="px-6 py-4 text-sm text-gray-300">{pub.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{pub.contact}</td>
                  {isHeadRole && (
                    <td className="px-6 py-4 text-right text-sm">
                      <button
                        onClick={() => console.log("Edit pub", pub.id)}
                        className="text-blue-500 hover:text-blue-400 mr-4"
                      >
                        <Edit className="inline-block w-5 h-5" />
                      </button>
                      <button
                        onClick={() => console.log("Delete pub", pub.id)}
                        className="text-red-500 hover:text-red-400"
                      >
                        <Trash2 className="inline-block w-5 h-5" />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isHeadRole ? 3 : 2} className="px-6 py-4 text-center text-gray-500">
                  No publications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommitteePubs;
