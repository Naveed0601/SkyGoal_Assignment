import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const CustomerDetails = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");

  console.log(process.env.CustomerDetails);

  useEffect(() => {
    fetchCustomers();
  }, [page, search]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        `https://skygoal-assignment.onrender.com/customerDetails`,
        {
          params: { page, limit, search },
        }
      );
      console.log(response);
      setCustomers(response.data.customers);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4">
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="block w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
      />
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">S.No</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Mobile</th>
              <th className="border border-gray-300 px-4 py-2">
                Date of Birth
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.s_no} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {customer.s_no}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.name_of_customer}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.mobile_number}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(customer.dob).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default CustomerDetails;
