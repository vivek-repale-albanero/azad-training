import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@platform/service-ui-libraries";
import { Delete, Trash2 } from "react-feather";

function DeleteRequest(id) {
  const url = `http://localhost:8080/brands/${id}`;

  fetch(url, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("DELETE request successful");
    })
    .catch((error) => {
      console.error("Error during DELETE request:", error);
    });
}

function PostRequest(name) {
  const url = "http://localhost:8080/brands";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // You may need to include additional headers if required by your server
    },
    body: JSON.stringify({ name }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("POST request successful:", data);
    })
    .catch((error) => {
      console.error("Error during POST request:", error);
    });
}

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [name, setName] = useState("");
  const [req, setReq] = useState(true);
  const handleAddBrand = () => {
    if (name.trim() !== "") {
      PostRequest(name);
      setName("");
      setReq(!req)
    }
  };
  useEffect(() => {
    async function fetchData() {
      let res = await fetch("http://localhost:8080/brands");
      let data = await res.json();

      setBrands(data);
    }
    fetchData();
  }, [req]);

  return (
    <div>
      <form
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          width: "30%",
        }}
      >
        <TextField
          style={{ border: "none", width: "80%" }}
          margin="normal"
          label="Brand Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddBrand}
          style={{
            width: "20%",
            height: "42px",
            borderRadius: "8px",
            backgroundColor: "#4CAF50", // Green color, you can change it
            color: "#fff",
            marginTop: "5px",
          }}
        >
          Add Brand
        </Button>
      </form>

      {brands.length > 0 && (
        <div
          style={{
            marginTop: "2.75rem",
            width: "40%",
            overflowX: "auto",
            margin: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              textAlign: "left",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    width: "70%",
                    backgroundColor: "#f2f2f2",
                    padding: "8px",
                  }}
                >
                  Brand Names
                </th>
                <th
                  style={{
                    width: "30%",
                    backgroundColor: "#f2f2f2",
                    padding: "8px",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9",
                  }}
                >
                  <td style={{ padding: "8px" }}>{brand.name}</td>
                  <td style={{ padding: "8px" }}>
                    <Box
                      onClick={() => {
                        DeleteRequest(brand.id);
                        setReq(!req);
                      }}
                    >
                      <Trash2 color="red" />
                    </Box>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Brands;
