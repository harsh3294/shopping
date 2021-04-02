import React, { useEffect, useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import axios from "../../axios";
import Modal from "@material-ui/core/Modal";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CreateIcon from "@material-ui/icons/Create";
import { v4 as uuid } from "uuid";
import storage from "../../firebase";

import VisibilityIcon from "@material-ui/icons/Visibility";
import "./ListProducts.css";
const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 50,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper1: {
    position: "absolute",
    // display: "block",
    // marginLeft: "450px",

    marginTop: 150,
    width: 500,
    height: 200,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));
function ListProducts() {
  const classes = useStyles();
  const [updateData, setUpdateData] = useState();
  const [category, setCategory] = useState("mobiles");
  const [data, setData] = useState([]);
  const [tempDescription, setTempDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [statusUpdate, setStatusUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [input, setInput] = useState();
  const [updateIndexNumber, setUpdateIndexNumber] = useState(0);
  const deleteProduct = () => {
    console.log(updateData._id);
    const req = axios
      .delete(`/product/${category}/${updateData._id}`)
      .then((res) => {
        console.log(res.status);
        setStatusUpdate(true);
      })
      .catch((error) => alert(error));
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    let unmounted = false;
    async function getData() {
      const req = await axios
        .get(`/${category}`)
        .then((res) => {
          if (!unmounted) {
            setData(res.data);
          }
        })
        .catch((error) => alert(error));
    }
    getData();
    return () => {
      unmounted = true;
    };
  }, [category, statusUpdate]);
  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };
  const descriptionChange = (event) => {
    setTempDescription(event.target.value);
  };

  const addDescription = () => {
    setUpdateData({
      ...updateData,
      [updateData.description]: updateData.description.push(tempDescription),
    });
    // console.log(updateData);
    setTempDescription("");
  };
  const updateTodo = () => {
    //update the todo  with the new input text
    console.log(updateIndexNumber);
    updateData.description[updateIndexNumber] = input;
    setOpen1(false);
  };
  const deleteDescription = () => {
    console.log("index:", updateIndexNumber);
    updateData.description.splice(updateIndexNumber, 1);
    setOpen1(false);
  };
  const handleImageChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      newFile["id"] = Math.random();
      // add an "id" property to each File object
      setFiles((prevState) => [...prevState, newFile]);
    }

    const id = uuid();
    //upload task to firebase storage
    const uploadTask = storage.ref(`Files/${id}`).put(files[0]);
    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.log("error", error);
      },
      () => {
        //complete function
        storage
          .ref("Files")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
          })
          .catch((error) => {
            console.log("new error", error);
          });
      }
    );
  };
  const updateProduct = () => {
    console.log(updateData);
    const req = axios
      .put(`/product/${category}/${updateData._id}`, {
        name: updateData.name,
        originalPrice: updateData.originalPrice,
        rating: updateData.rating,
        seller: updateData.seller,
        discount: updateData.discount,
        stock: updateData.stock,
        totalStock: updateData.totalStock,
        category: updateData.category,
        description: updateData.description,
        deliveredBy: updateData.deliveredBy,
      })
      .then((res) => {
        console.log(res.status);
        setStatusUpdate(true);
      })
      .catch((error) => alert(error));
    setOpen(false);
  };
  //   console.log(updateData);
  return (
    <div>
      <Modal className="modal" open={open1} onClose={(e) => setOpen1(false)}>
        <div className="modal__Paper">
          <h1>Update Description</h1>
          <br />
          <input
            // placeholder={props.todo.todo}
            value={input}
            style={{
              width: "90%",
              height: "30px",
              fontSize: "16px",
              marginBottom: "20px",
            }}
            onChange={(event) => setInput(event.target.value)}
          />
          <br />
          <div className="modal__button">
            <Button onClick={updateTodo}>Update Description</Button>
            <DeleteForeverIcon onClick={() => deleteDescription()} />
          </div>
        </div>
      </Modal>
      <Modal
        className="list__modal"
        open={open}
        onClose={(e) => setOpen(false)}
      >
        <div className="list__modal__Paper">
          <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <CreateIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Update Product
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <div className="img-container">
                      <img
                        src={updateData?.img}
                        alt=""
                        className="updateData__img"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label="Product Name"
                      type="text"
                      value={updateData?.name}
                      name="name"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="originalPrice"
                      label="Original Price"
                      name="originalPrice"
                      type="number"
                      value={updateData?.originalPrice}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="rating"
                      label="Rating"
                      type="number"
                      id="rating"
                      onChange={handleChange}
                      value={updateData?.rating}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="seller"
                      label="Seller Name"
                      type="text"
                      id="seller"
                      onChange={handleChange}
                      value={updateData?.seller}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="discount"
                      label="Discount"
                      type="number"
                      id="discount"
                      onChange={handleChange}
                      value={updateData?.discount}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      variant="outlined"
                      className={classes?.formControl}
                      xs={12}
                    >
                      <InputLabel
                        id="demo-simple-select-outlined-label"
                        xs={12}
                      >
                        Stock
                      </InputLabel>
                      <Select
                        xs={12}
                        name="stock"
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={updateData?.stock}
                        onChange={handleChange}
                        label="Stock"
                      >
                        <MenuItem value="" disabled>
                          None
                        </MenuItem>
                        <MenuItem value={true}>True</MenuItem>
                        <MenuItem value={false}>False</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="totalStock"
                      label="Total Stock"
                      type="number"
                      id="totalStock"
                      onChange={handleChange}
                      value={updateData?.totalStock}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={updateData?.category}
                        onChange={handleChange}
                        name="category"
                        label="Category"
                      >
                        <MenuItem value="" disabled>
                          None
                        </MenuItem>
                        <MenuItem value={"menswear"}>Mens Wear</MenuItem>
                        <MenuItem value={"accessories"}>Accessories</MenuItem>
                        <MenuItem value={"mobiles"}>Mobiles</MenuItem>
                        <MenuItem value={"case-covers"}>
                          Cases & Covers
                        </MenuItem>
                        <MenuItem value={"handbag-clutches"}>
                          Handbags & Clutches
                        </MenuItem>
                        <MenuItem value={"television"}>Television</MenuItem>
                        <MenuItem value={"makeup"}>Makeup</MenuItem>
                        <MenuItem value={"desktop"}>Desktop</MenuItem>
                        <MenuItem value={"laptop"}>Laptop</MenuItem>
                        <MenuItem value={"camera"}>Camera</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="deliveredBy"
                      label="Delivered By in Days"
                      type="number"
                      id="deliveredBy"
                      onChange={handleChange}
                      value={updateData?.deliveredBy}
                    />
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="description"
                      label="Description"
                      type="text"
                      id="description"
                      onChange={descriptionChange}
                      value={tempDescription}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Button
                      xs={6}
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={addDescription}
                    >
                      Add
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    {updateData?.description.map((desc, index) => (
                      <>
                        {" "}
                        <div className="description__icon">
                          <h3>
                            {index + 1} : {desc}
                          </h3>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setOpen1(true);
                              setInput(desc);
                              setUpdateIndexNumber(index);
                            }}
                          >
                            Edit
                          </button>
                        </div>
                        <br />
                      </>
                    ))}
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
          <div className="list__modal__button">
            <Button onClick={updateProduct}>Update Product</Button>
            <DeleteForeverIcon onClick={deleteProduct} />
          </div>
        </div>
      </Modal>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          label="Status"
        >
          <MenuItem value={"mobiles"}>Mobiles</MenuItem>
          <MenuItem value={"accessories"}>Accessories</MenuItem>
          <MenuItem value={"case-covers"}>Cases & Covers</MenuItem>
          <MenuItem value={"handbag-clutches"}>Handbags & Clutches</MenuItem>
          <MenuItem value={"television"}>Television</MenuItem>
          <MenuItem value={"makeup"}>Makeup</MenuItem>
          <MenuItem value={"desktop"}>Desktop</MenuItem>
          <MenuItem value={"laptop"}>Laptop</MenuItem>
          <MenuItem value={"camera"}>Camera</MenuItem>
        </Select>
      </FormControl>
      <br />
      <br />
      <table>
        <tr>
          <th>Name</th>
          <th>Image</th>
          <th>Original Price</th>
          <th>Rating</th>
          <th>Seller Name</th>
          <th>Discount</th>
          <th>Stock</th>
          <th>Total Stock</th>
          <th>Category</th>

          <th>Description</th>
          <th>Delivered By</th>
          <th>Edit</th>
        </tr>
        {data.map((product) => (
          <tr>
            <td>{product.name}</td>
            <td>
              {" "}
              <img src={product.img} alt="" width="150px" height="200px" />
            </td>
            <td>{product.originalPrice}</td>
            <td>{product.rating}</td>
            <td>{product.seller}</td>
            <td>{product.discount}</td>
            <td>
              {product.stock === true ? <span>True</span> : <span>False</span>}
            </td>
            <td>{product.totalStock}</td>
            <td>{product.category}</td>
            <td className="desc__td">
              {product.description.map((desc) => (
                <ul>
                  <li>{desc}</li>
                </ul>
              ))}
            </td>
            <td>{product.deliveredBy}</td>
            <td>
              <VisibilityIcon
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(true);
                  setUpdateData(product);
                }}
              />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default ListProducts;
