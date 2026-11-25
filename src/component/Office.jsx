import { useState, useEffect } from "react";
import axios from "axios";

const Office = () => {
  const [officeName, setOfficeName] = useState("");
  const [officeNumber, setOfficeNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [offices, setOffices] = useState([]);

  useEffect(() => {
    getAllOffices();
  }, []);

  async function getAllOffices() {
    try {
      const response = await axios.get(
        "http://localhost:8082/api/office/all"
      );

      setOffices(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function saveOffice() {
    try {
      await axios.post(
        "http://localhost:8082/api/office/save",
        {
          name: officeName,
          officeNumber: Number(officeNumber),
        }
      );

      alert("Office saved successfully");

      setOfficeName("");
      setOfficeNumber("");

      getAllOffices();
    } catch (error) {
      console.error(error);
      alert("Office was not saved");
    }
  }

  async function deleteOffice(officeNumber) {
    try {
      await axios.delete(
  `http://localhost:8082/api/office/${officeNumber}`
);

      alert("Office deleted successfully");

      getAllOffices();
    } catch (error) {
      console.error(error);
      alert("Office was not deleted");
    }
  }

  const filteredOffices = offices.filter(
    (office) =>
      office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.officeNumber.toString().includes(searchTerm)
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Save Office</h1>

      <label>Office Name:</label>
      <br />

      <input
        type="text"
        value={officeName}
        onChange={(e) => setOfficeName(e.target.value)}
      />

      <br />
      <br />

      <label>Office Number:</label>
      <br />

      <input
        type="number"
        value={officeNumber}
        onChange={(e) => setOfficeNumber(e.target.value)}
      />

      <br />
      <br />

      <button onClick={saveOffice}>Save</button>

      <hr />

      <h1>Available Offices</h1>

      <input
        type="text"
        placeholder="Search by office name or office number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <br />
      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Office Number</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredOffices.map((office) => (
            <tr key={office.id}>
              <td>{office.name}</td>
              <td>{office.officeNumber}</td>

              <td>
                <button
                  onClick={() =>
                    deleteOffice(office.officeNumber)
                  }
                >
                  Delete
                </button>

                {" "}

                <button>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Office;