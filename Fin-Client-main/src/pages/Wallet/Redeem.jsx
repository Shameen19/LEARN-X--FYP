import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Box,
    TextField
  } from "@material-ui/core";
  import Modal from "@mui/material/Modal";
  import React,{useState} from "react";
  import giftcard1 from "../../images/giftcard1.jpg";
  import giftcard2 from "../../images/giftcard2.jpg";
  import giftcard3 from "../../images/giftcard3.jpg";
  import giftcard4 from "../../images/giftcard4.jpg";
  import validator from "validator";
  import { ToastContainer, toast } from "react-toastify";


import  axios from "axios";
  

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "1px solid black",
    boxShadow: 24,
    p: 20,
  };
  
  const Redeem = () => {
    const [quantity,setQuantity]=useState(1);
    const [quantity2,setQuantity2]=useState(1);
    const [quantity3,setQuantity3]=useState(1);
    const [quantity4,setQuantity4]=useState(1);
    let check = false;

    const notify = () => toast("Credits redeemed Successfully!");

    const checkquantity = () => {
        if ( quantity > 0 || quantity2 > 0 ||quantity3 > 0 ||quantity4 > 0) {
          check = true;
        } else {
          check = false;
        }
      };


    const handleSubmit=async(credits)=>{
        const email=localStorage.getItem("email");
        try{
            checkquantity();
            if(check){
            const config = {
                header: {
                  "Content-Type": "application/json",
                },
              };
              const data = await axios.post(
                "http://localhost:1337/redeem/redeemgiftcard",
                { email, credits, quantity },
                config
              );
              if(data.status === 203)
              {
                toast.error("Insufficent balance");
              }
              else if(data.status === 200)
              {
                notify();
              }
            }
            else {
                toast.error("Quantity should not be less than or equals to 0");

            }

        }
        catch(err){
            console.log(err);
            toast.error("Error occured while fetching");
            
        }

    }

    const handleSubmit2=async(credits)=>{
        const email=localStorage.getItem("email");
        try{
            checkquantity();
            if(check){
            const config = {
                header: {
                  "Content-Type": "application/json",
                },
              };
              const data = await axios.post(
                "http://localhost:1337/redeem/redeemgiftcard2",
                { email, credits, quantity2 },
                config
              );
              if(data.status === 203)
              {
                toast.error("Insufficent balance");
              }
              else if(data.status === 200)
              {
                notify();
              }
            }
            else {
                toast.error("Quantity should not be less than or equals to 0");

            }

        }
        catch(err){
            console.log(err);
            toast.error("Error occured while fetching");
            
        }

    }
    const handleSubmit3=async(credits)=>{
        const email=localStorage.getItem("email");
        try{
            checkquantity();
            if(check){
            const config = {
                header: {
                  "Content-Type": "application/json",
                },
              };
              const data = await axios.post(
                "http://localhost:1337/redeem/redeemgiftcard3",
                { email, credits, quantity3 },
                config
              );
              console.log("Error");
              console.log(data);
              if(data.status === 203)
              {
                toast.error("Insufficent balance");
              }
              else if(data.status === 200)
              {
                notify();
              }
            }
            else {
                toast.error("Quantity should not be less than or equals to 0");

            }

        }
        catch(err){
            console.log(err);
            toast.error("Error occured while fetching");
            
        }

    }

    const handleSubmit4=async(credits)=>{
        const email=localStorage.getItem("email");
        try{
            checkquantity();
            if(check){
            const config = {
                header: {
                  "Content-Type": "application/json",
                },
              };
              const data = await axios.post(
                "http://localhost:1337/redeem/redeemgiftcard4",
                { email, credits, quantity4 },
                config
              );
              if(data.status === 203)
              {
                toast.error("Insufficent balance");
              }
              else if(data.status === 200)
              {
                notify();
              }
            }
            else {
                toast.error("Quantity should not be less than or equals to 0");

            }

        }
        catch(err){
            console.log(err);
            toast.error("Error occured while fetching");
            
        }

    }
    return (
      <div>
  
        <Grid container spacing={2} style={{ paddingTop: 20 }}>
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 345 }}>
              
                <CardMedia
                  component="img"
                  height="180"
                  image={giftcard1}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Happy Holidays
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                   Redeem this gift card to go on exciting vacations only for <span style={{fontWeight:"bold"}}>200 credits</span>
                  </Typography>
                </CardContent>
                <CardActions>
                <TextField
                  type="number"
                  label="Quantity"
                  variant="outlined"
                  value={quantity}
                  onChange={(e)=>setQuantity(e.target.value)}
                  InputProps={{ inputProps: { min: 1 } }}
                />
                <Button size="small" color="primary" variant="contained" onClick={()=>handleSubmit(200)}>
                  Redeem
                </Button>
              </CardActions>
              
              
            </Card>
          </Grid>
  
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 345 }}>
          
                <CardMedia
                  component="img"
                  height="180"
                  image={giftcard2}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Treat yourself today !!
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Redeem this gift card for only <span style={{fontWeight:"bold"}}>600 credits</span> to obtain exciting discount of 50% on your favourite Pizza italian menu
                  </Typography>
                </CardContent>
                <CardActions>
                <TextField
                  type="number"
                  label="Quantity"
                  variant="outlined"
                  value={quantity2}
                  onChange={(e)=>setQuantity2(e.target.value)}
                  InputProps={{ inputProps: { min: 1 } }}
                />
                <Button size="small" color="primary" variant="contained" className="btnstyle" onClick={()=>handleSubmit2(600)}>
                  Redeem
                </Button>
              </CardActions>
           
             
            </Card>
          </Grid>
  
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 345 }}>
              
                <CardMedia
                  component="img"
                  height="180"
                  image={giftcard3}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Style Delivered
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Get yourself amazing shoes, clothes and much more with this gift card that you can redeem for only <span style={{fontWeight:"bold"}}>900 credits</span>
                  </Typography>
                </CardContent>
                <CardActions>
                <TextField
                  type="number"
                  label="Quantity"
                  variant="outlined"
                  value={quantity3}
                  onChange={(e)=>setQuantity3(e.target.value)}
                  InputProps={{ inputProps: { min: 1 } }}
                />
                <Button size="small" color="primary" variant="contained" onClick={()=>handleSubmit3(900)}>
                  Redeem
                </Button>
              </CardActions>
       
             
            </Card>
          </Grid>
  
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 345 }}>
              
                <CardMedia
                  component="img"
                  height="180"
                  image={giftcard4}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Movie Magic Awaits!
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Get yourself this gift card for only <span style={{fontWeight:"bold"}}>1000</span> credits to have an exciting discount of upto 70% on any of your favourite movie at nearby cinema
                  </Typography>
                </CardContent>
                <CardActions>
                <TextField
                  type="number"
                  label="Quantity"
                  variant="outlined"
                  value={quantity4}
                  onChange={(e)=>setQuantity4(e.target.value)}
                  InputProps={{ inputProps: { min: 1 } }}
                />
                <Button size="small" color="primary" variant="contained" onClick={()=>handleSubmit4(1000)}>
                  Redeem
                </Button>
              </CardActions>
             
              
            </Card>
          </Grid>
        </Grid>
        <ToastContainer
        position="top-right"
        autoClose={20000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      </div>
    );
  };
  
  export default Redeem;
  