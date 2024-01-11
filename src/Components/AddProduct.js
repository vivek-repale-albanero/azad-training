import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  DialogActions,
} from "@platform/service-ui-libraries";
import { Context } from "./Context";
import Header from "./Header";
import { dateConverter } from "./Brands";
import { Edit, Trash2 } from "react-feather";

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
const deleteData = (productId) => {
  fetch(`http://localhost:8080/products/${productId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("DELETE request successful");
    })
    .catch((error) => {
      console.error("Error making DELETE request:", error);
    });
};

const patchData = (productId, updatedProduct) => {
  fetch(`http://localhost:8080/products/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
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
      console.error("Error making PATCH request:", error);
    });
};
const AddProduct = () => {
  const { sidebarWidth, swap, setSwap } = useContext(Context);
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
  const [editOpenModal, setEditOpenModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  const handleEditInputChange = (e) => {
   
    console.log("A", e)
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAutocompleteValueChange = (e, v, r) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      brand: v,
    }));
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleEdit = () => {
    patchData(editFormData.id, { ...editFormData, createdAt: Date.now() });
    setEditOpenModal(false);
    setSwap(!swap);
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
      createdAt: Date.now(),
    };
    postData(data);
    handleCloseModal();
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
  }, [openModal, swap]);
  console.log(editFormData.brand,brands);
  return (
    <Box style={{ marginLeft: sidebarWidth ? "3%" : "10%" }}>
      <Header>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          style={{ marginTop: "20px", marginLeft: "20px" }}
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
        <Dialog open={editOpenModal} onClose={() => setEditOpenModal(false)}>
          <DialogTitle>
            <Typography variant="h5" align="center">
              Product Form
            </Typography>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleEdit}>
              <Autocomplete
                options={brands}
                name="brand"
                value={editFormData.brand}
                getOptionLabel={(option) => option}
                onChange={handleAutocompleteValueChange}

                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Brand"
                    margin="normal"
                value={editFormData.brand}


                  />
                )}
              />
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={editFormData.title}
                onChange={handleEditInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Stock"
                name="stock"
                type="number"
                value={editFormData.stock}
                onChange={handleEditInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Price"
                name="off_price"
                type="number"
                value={editFormData.off_price}
                onChange={handleEditInputChange}
                margin="normal"
              />

              <DialogActions>
                <Button onClick={() => setEditOpenModal(false)} color="primary">
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
              width: "98%",
              overflowX: "auto",
              margin: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                textAlign: "left",
                borderCollapse: "collapse",
                padding: "10px",
                marginTop: "1rem",
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
                    Product Image
                  </th>
                  <th
                    style={{
                      backgroundColor: "#f2f2f2",
                      padding: "8px",
                    }}
                  >
                    Title
                  </th>
                  <th
                    style={{
                      backgroundColor: "#f2f2f2",
                      padding: "8px",
                    }}
                  >
                    Brand
                  </th>
                  <th
                    style={{
                      backgroundColor: "#f2f2f2",
                      padding: "8px",
                    }}
                  >
                    Price
                  </th>
                  <th
                    style={{
                      backgroundColor: "#f2f2f2",
                      padding: "8px",
                    }}
                  >
                    Stock
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
                        style={{ width: "100px", height: "60px" }}
                      />
                    </td>

                    <td style={{ padding: "8px" }}>{el.title}</td>
                    <td style={{ padding: "8px" }}>{el.brand}</td>
                    <td style={{ padding: "8px" }}>{el.off_price}</td>
                    <td style={{ padding: "8px" }}>{el.stock}</td>
                    <td style={{ padding: "8px" }}>
                      {el.createdAt
                        ? dateConverter(el.createdAt)
                        : dateConverter()}
                    </td>
                    <td style={{ padding: "8px" }}>
                      <Button
                        onClick={() => {
                          setEditFormData(el);
                          setEditOpenModal(true);
                        }}
                      >
                        <Edit color="blue" />
                      </Button>
                      <Button
                        onClick={() => {
                          deleteData(el.id);
                          setSwap(!swap);
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
        )}
      </Header>
    </Box>
  );
};

export default AddProduct;
