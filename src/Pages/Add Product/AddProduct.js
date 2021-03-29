import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CreateIcon from "@material-ui/icons/Create";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { v4 as uuid } from "uuid";
import storage from "../../firebase";
import axios from "../../axios";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import "./AddProduct.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

export default function AddProduct() {
  const [productData, setProductData] = useState({
    name: "",
    originalPrice: 0,
    rating: 0,
    seller: "",
    discount: 0,
    stock: "",
    totalStock: "",
    category: "",
    deliveredBy: 0,
  });
  const [description, setDescription] = useState([]);
  const [files, setFiles] = useState([]);
  const classes = useStyles();
  const [tempDescription, setTempDescription] = useState("");
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };
  const descriptionChange = (event) => {
    setTempDescription(event.target.value);
    console.log(event.target.value);
  };
  const addDescription = () => {
    setDescription([...description, tempDescription]);
    setTempDescription("");
    console.log(tempDescription);
  };
  const handleImageChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      newFile["id"] = Math.random();
      // add an "id" property to each File object
      setFiles((prevState) => [...prevState, newFile]);
    }
  };
  const handleClick = (e) => {
    e.preventDefault();
    e.preventDefault(); // prevent page refreshing

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
            const req = axios
              .post(`/${productData.category}`, {
                name: productData.name,
                originalPrice: productData.originalPrice,
                rating: productData.rating,
                seller: productData.seller,
                discount: productData.discount,
                stock: productData.stock,
                totalStock: productData.totalStock,
                category: productData.category,
                deliveredBy: productData.deliveredBy,
                description: description,
                img: url,
              })
              .then((res) => {
                console.log(res);
              })
              .catch((error) => alert(error));
          })
          .catch((error) => {
            console.log("new error", error);
          });
      }
    );

    setProductData({
      name: "",
      originalPrice: 0,
      rating: 0,
      seller: "",
      discount: 0,
      stock: "",
      totalStock: "",
      category: "",
      deliveredBy: 0,
    });
    setDescription([]);
    console.log(productData);
    console.log(description);
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CreateIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Product
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Product Name"
                type="text"
                value={productData.name}
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
                value={productData.originalPrice}
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
                value={productData.rating}
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
                value={productData.seller}
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
                value={productData.discount}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                xs={12}
              >
                <InputLabel id="demo-simple-select-outlined-label" xs={12}>
                  Stock
                </InputLabel>
                <Select
                  xs={12}
                  name="stock"
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={productData.stock}
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
                value={productData.totalStock}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={productData.category}
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
                value={productData.deliveredBy}
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.root}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    Upload
                  </Button>
                </label>
              </div>
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
                // onChange={handleChange}
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
              {description.map((desc, index) => (
                <>
                  {" "}
                  <div className="description__icon">
                    <h3>
                      {index + 1} : {desc}
                    </h3>
                    <button>Edit</button>
                    <DeleteForeverIcon />
                  </div>
                  <br />
                  {/* <p>{index}</p> */}
                  {/* onClick={(e) => setOpen(true)} */}
                </>
              ))}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            Add Product
          </Button>
        </form>
      </div>
    </Container>
  );
}
