import React, { useEffect, useState } from "react";
import "./PotentialLead.css";
import axios from "axios";

const PotentialLead = () => {
  const [potentialLead, setPotentialLead] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [bookingPerPage] = useState<number>(10); // Number of leads per page

  const indexOfLastLead = currentPage * bookingPerPage;
  const indexOfFirstLead = indexOfLastLead - bookingPerPage;

  // Add a check to make sure potentialLead is an array
  const currentLeads = Array.isArray(potentialLead)
    ? potentialLead.slice(indexOfFirstLead, indexOfLastLead)
    : [];

  // Ensure potentialLead is an array and calculate totalPages safely
  const totalPages = Array.isArray(potentialLead)
    ? Math.ceil(potentialLead.length / bookingPerPage)
    : 0;

  // Page range logic
  const pageRange = 5; // Number of page numbers to show at a time
  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await axios.get("/api/leads/potentials", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200 && Array.isArray(response.data.data)) {
            setPotentialLead(response.data.data);
          } else {
            setPotentialLead([]); // Reset potentialLead to an empty array if data is not an array
          }
        } else {
          console.log("No token found, please log in again");
        }
      } catch (error) {
        console.error("Error fetching leads", error);
        setPotentialLead([]); // Handle error by resetting potentialLead to an empty array
      }
    };

    fetchLeads();
  }, []);

  return (
    <div className="table-container">
      <h1>Potential Leads</h1>
      {Array.isArray(potentialLead) && potentialLead.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Lead No</th>
                <th>Lead Name</th>
                <th>Status</th>
                <th>Created On</th>
                <th>Contact No</th>
                <th>Company Name</th>
                <th>Handler Employee</th>
              </tr>
            </thead>
            <tbody>
              {currentLeads.map((lead: any, index: number) => (
                <tr key={lead.LeadId}>
                  <td>{index + 1 + indexOfFirstLead}</td> {/* Adjust Sr No */}
                  <td>{lead.LeadNo}</td>
                  <td>{lead.LeadName}</td>
                  <td>{lead.LeadStatus}</td>
                  <td>{lead.CreatedOn}</td>
                  <td>{lead.ContactNo}</td>
                  <td>{lead.CompanyName}</td>
                  <td>{lead.HandlerEmp}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt; Prev
            </button>
            <div className="page-numbers">
              {Array.from(
                { length: endPage - startPage + 1 },
                (_, index) => startPage + index
              ).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={currentPage === pageNumber ? "active" : ""}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next &gt;
            </button>
          </div>
        </>
      ) : (
        <p>No Potential Leads Available</p>
      )}
    </div>
  );
};

export default PotentialLead;
