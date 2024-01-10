import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Autocomplete,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@platform/service-ui-libraries";

const postData = (newProduct) => {
  fetch("http://localhost:8080/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
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
      console.error("Error making POST request:", error);
    });
};

const AddProduct = () => {
  const [formData, setFormData] = useState({
    brand: "",
    stock: "",
    price: "",
    title: "",
  });
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      images: {
        image1:
          "https://media.istockphoto.com/id/1437990859/photo/abandoned-shopping-cart-with-groceries.webp?b=1&s=170667a&w=0&k=20&c=XvePluej28Yq1fdv4qeQPxA91b-SJbrjuTqM_P9RlDc=",
      },
      quantity: 1,
      off_price: formData.price,
    };
    postData(data);
    handleCloseModal()
  };
  useEffect(() => {
    async function fetchData() {
      let res = await fetch("http://localhost:8080/brands");
      let data = await res.json();

      setBrands(data.map((el) => el.name));
    }
    async function fetchProduct() {
      let res = await fetch("http://localhost:8080/products");
      let data = await res.json();

      setProducts(data);
    }
    fetchData();
    fetchProduct();
  }, [openModal]);
  
  return (
    <>
       <Button
        variant="contained"
        color="primary"
        onClick={handleOpenModal}
        style={{ marginTop: '20px',marginLeft:"40px" }}
      >
        Add Product
      </Button>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          <Typography variant="h5" align="center">
            Product Form
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Autocomplete
              options={brands}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  margin="normal"
                />
              )}
            />
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              margin="normal"
            />

            <DialogActions>
              <Button onClick={handleCloseModal} color="primary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      {products.length > 0 && (
        <div
          style={{
            marginTop: "2.75rem",
            width: "80%",
            overflowX: "auto",
            margin: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              textAlign: "left",
              borderCollapse: "collapse",
              padding:"10px"
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    width: "30%",
                    backgroundColor: "#f2f2f2",
                    padding: "8px",
                  }}
                >
                  Product Image
                </th>
                <th
                  style={{
                    width: "30%",
                    backgroundColor: "#f2f2f2",
                    padding: "8px",
                  }}
                >
                  Title
                </th>
                <th
                  style={{
                    width: "30%",
                    backgroundColor: "#f2f2f2",
                    padding: "8px",
                  }}
                >
                  Brand
                </th>
                <th
                  style={{
                    width: "30%",
                    backgroundColor: "#f2f2f2",
                    padding: "8px",
                  }}
                >
                  Price
                </th>
                <th
                  style={{
                    width: "30%",
                    backgroundColor: "#f2f2f2",
                    padding: "8px",
                  }}
                >
                  Stock
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((el, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9",
                  }}
                >
                  <td style={{ padding: "8px" }}>
                    <img
                      src={el.images.image1}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </td>

                  <td style={{ padding: "8px" }}>{el.title}</td>
                  <td style={{ padding: "8px" }}>{el.brand}</td>
                  <td style={{ padding: "8px" }}>{el.off_price}</td>
                  <td style={{ padding: "8px" }}>{el.stock}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AddProduct;
