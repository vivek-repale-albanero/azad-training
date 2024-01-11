import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@platform/service-ui-libraries";
import { Edit, Trash2 } from "react-feather";
import { Context } from "./Context";
import Header from "./Header";
import FormikFieldArray from "./FormikFieldArray";

function DeleteRequest(id) {
  const url = `http://localhost:8080/brands/${id}`;

  fetch(url, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
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
    },
    body: JSON.stringify({ name,createdAt:Date.now() }),
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
function PatchRequest(brandId, updatedData) {
  const url = `http://localhost:8080/brands/${brandId}`;

  fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("PATCH request successful:", data);
    })
    .catch((error) => {
      console.error("Error during PATCH request:", error);
    });
}
export function dateConverter(date = Date.now()) {
  let today = new Date(date);

  // Extract day, month, and year
  let day = today.getDate();
  let month = today.getMonth() + 1; // Months are zero-indexed
  let year = today.getFullYear();

  // Pad single-digit day and month with leading zeros
  day = day < 10 ? '0' + day : day;
  month = month < 10 ? '0' + month : month;

  // Return the formatted date string
  return `${year}-${month}-${day}`;
}
const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [name, setName] = useState("");
  const [req, setReq] = useState(true);
  const [openBrandDialog, setOpenBrandDialog] = useState(false);
  const [editOpenBrandDialog, setEditOpenBrandDialog] = useState(false);
  const [editBrand,setEditBrand]=useState({})
  
  const { sidebarWidth } = useContext(Context);
  const description = [
    "Timeless elegance for the modern individual, redefine your style effortlessly.",
    "Chic, contemporary fashion curated to transcend trends and stand out.",
    "Discover your signature style in our array of timeless essentials.",
    "Elevate your wardrobe with classic allure and a touch of modern.",
    "Experience the fusion of elegance and contemporary aesthetics in every piece.",
    "Find your unique expression in our array of carefully crafted fashion.",
    "Refined elegance meets contemporary style in our thoughtfully designed collection.",
    "Curate your style journey with timeless, chic ensembles for every occasion.",
    "Define your elegance with sophisticated, modern fashion staples that inspire.",
    "Explore the perfect blend of classic charm and modern allure in our fashion.",
    "Transform your look with timeless, fashion-forward essentials that speak volumes.",
    "Celebrate individuality through our curated mix of timeless and modern fashion.",
    "Redefined elegance awaits: discover a collection merging classic charm with modern trends.",
    "Curated for the modern individual: a timeless array of chic fashion essentials.",
    "Elevate your style with a collection blending timeless allure and modern sophistication.",
  ];
  const handleAddBrand = () => {
    if (name.trim() !== "") {
      PostRequest(name);
      setName("");
      setReq(!req);
      setOpenBrandDialog(false)
    }
  };
  const handleChange = (e) => {
    console.log(e.target.name,e.target.value)
    setEditBrand((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleEditBrand=()=>{
    PatchRequest(editBrand.id,{...editBrand,createdAt:Date.now()})
    setEditOpenBrandDialog(false)
    setReq(!req)
  }
  useEffect(() => {
    async function fetchData() {
      let res = await fetch("http://localhost:8080/brands");
      let data = await res.json();

      setBrands(data);
    }
    fetchData();
  }, [req]);
console.log(editBrand)
  return (
    <div style={{ marginLeft: sidebarWidth ? "3%" : "10%" }}>
      <Header>
        {/* <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenBrandDialog(true)}
          style={{ marginTop: "20px", marginLeft: "20px" }}
        >
          Add Brand
        </Button>
        <Dialog
          open={openBrandDialog}
          onClose={() => setOpenBrandDialog(false)}
        >
          <DialogTitle>Add Brand</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                style={{ width: "100%" }}
                margin="normal"
                label="Brand Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenBrandDialog(false)} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleAddBrand}
              variant="contained"
              color="primary"
            >
              Add Brand
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={editOpenBrandDialog}
          onClose={() => setEditOpenBrandDialog(false)}
        >
          <DialogTitle>Edit Brand</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                style={{ width: "100%" }}
                margin="normal"
                label="Brand Name"
                name="name"
                value={editBrand.name}
                onChange={handleChange}
                variant="outlined"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditOpenBrandDialog(false)} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleEditBrand}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {brands.length > 0 && (
          <div
            style={{
              width: "98%",
              overflowX: "auto",
              margin: "auto",
              marginTop: "0.75rem",
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
                      backgroundColor: "#f2f2f2",
                      padding: "8px",
                    }}
                  >
                    Brand Names
                  </th>
                  <th
                    style={{
                      backgroundColor: "#f2f2f2",
                      padding: "8px",
                    }}
                  >                   
                   Description
                  </th>
                  <th
                    style={{
                      backgroundColor: "#f2f2f2",
                      padding: "8px",
                    }}
                  >                   
                   Date
                  </th>
                  <th
                    style={{
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
                    <td style={{ padding: "8px" }}>{description[index%description.length]}</td>
                    <td style={{ padding: "8px" }}>{brand.createdAt ? dateConverter(brand.createdAt):dateConverter()}</td>
                    <td style={{ padding: "8px" }}>
                    <Button
                        onClick={() => {
                          setEditBrand(brand)
                          setEditOpenBrandDialog(true)
                        }}
                      >
                        <Edit color="blue" />
                      </Button>
                      <Button
                        onClick={() => {
                          DeleteRequest(brand.id);
                          setReq(!req);
                        }}
                      >
                        <Trash2 color="red" />
                      </Button>
                   
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )} */}
        <FormikFieldArray/>
      </Header>
    </div>
  );
};

export default Brands;
