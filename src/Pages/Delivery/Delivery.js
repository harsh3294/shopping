import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Loading from "../../images/Loading.gif";
import axios from "../../axios";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    marginTop: 10,
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 300,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  formControl: {
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function Delivery() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const [statusUpdate, setStatusUpdate] = useState(false);
  const [userSelected, setUserSelected] = useState();
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  useEffect(() => {
    let unmounted = false;

    async function fetchData() {
      const req = await axios
        .get(`/delivery`)
        .then((res) => {
          if (!unmounted) {
            console.table(res.data);
            setLeft(res.data);
          }
          setLoading(false);
        })
        .catch((error) => alert(error));
    }
    async function fetchData1() {
      const req = await axios
        .get(`/delivery/user`)
        .then((res) => {
          console.table(res.data);
          setUsers(res.data);
        })
        .catch((error) => alert(error));
    }
    fetchData();
    fetchData1();
    setStatusUpdate(false);
    return () => {
      unmounted = true;
    };
  }, [statusUpdate]);
  console.log(users);
  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };
  if (loading) {
    return <img src={Loading} alt="loading" className="loading" />;
  }
  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{ "aria-label": "all items selected" }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value.orderid}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.orderid}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  const handleClick = () => {
    console.log(userSelected);
    right.map((item) => {
      const req2 = axios
        .delete(`/delivery/find/${item.orderid}`)
        .then((res) => {
          console.log(res.status);
          // setStatusUpdate(true);
        })
        .catch((error) => alert(error));
      const req = axios
        .post(`/outfordelivery`, {
          orderid: item.orderid,
          placedBy: item.placedBy,
          deliveryBoyUid: userSelected,
          // firstname: userSelected.firstname,
          // lastname: userSelected.lastname,
        })
        .then((res) => {
          console.log(res.status);
          // setStatusUpdate(true);
        })
        .catch((error) => alert(error));
    });
    setStatusUpdate(true);
    setRight([]);
  };
  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          Delivery Boy
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={userSelected}
          onChange={(event) => setUserSelected(event.target.value)}
          label="Delivery Boy"
        >
          {users.map((user) => (
            <MenuItem value={user?.uid}>
              {user?.firstname} {user?.lastname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid
        container
        spacing={2}
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>{customList("Orders", left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList("Assigned Orders", right)}</Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        justify="center"
        alignItems="center"
        className={classes.root}
        onClick={handleClick}
      >
        <Button>Proceed</Button>
      </Grid>
    </>
  );
}
