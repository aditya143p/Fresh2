
const User = require('./db/user')
const express=require("express")
//import express
require('./db/db')
//razor pay

const Razorpay = require('razorpay');
const crypto = require("crypto");

const cors = require('cors');
const app=express()
app.use(cors({ origin: '*' }));
app.use(express.json())
// app.use(cors(origins = '*'))

// app.use(cors({ origin: 'http://192.168.56.1:3000' })); 
app.get('/Freshpick',(req,res)=>{
    res.send("Hello world")
})

app.get('/user',async(req,res)=>{
    
    const user= await User.find()
    console.log(user ,"this is user data")
    res.send(user)
}
)

app.post('/signup',async(req,res)=>{
    
   let {name,email,password}=req.body
   const newUser= await new User({
    name,
    email,
    password 
   })
   newUser.save()

   res.send(newUser)
}
)

app.post('/login',async(req,res)=>{
    
    let {email,password}=req.body
  
    const user= await User.findOne({email:email})
    if(!user){
     res.status(400).json({message:"nO USERWITH SUCH EMAIL", success:false})
     return
    }
    if(user.password!==password){
        res.status(400).json({message:"INVALID PASSWORD", success:false})
        return
    }
    res.json({message:"lOGIN SUCCESSFUL", success:true, user})
   
 }
 )
 //generating order id for payment
//  app.post('/orders',async(req,res)=>{
//    const razorpay= new Razorpay({
//      key_id:"rzp_test_5Pd68wAw7aHGI7",
//      key_secret:"v4b2xg3l0j5d8y9zv1c7c1r6f2h8k3"

//    })
//    const options={
//     amount:req.body.amount,
//     currency:"INR",
//     receipt:"receipt#1",
//     payment_capture:1
//    }
//    try{
//     const response= await razorpay.orders.create(options)
//     res.json({id:response.id, currency:response.currency, amount:response.amount})  
//    }
//    catch(error){
//     console.log(error)
//     res.status(500).send("Server Error")
//    }
//  })
//  app.get('/payment/:paymentID',async(req,res)=>{
//      const {paymentID}=req.params;
//      const razorpay= new Razorpay({
//         key_id:"rzp_test_5Pd68wAw7aHGI7",
//         key_secret:"v4b2xg3l0j5d8y9zv1c7c1r6f2h8k3"
   
//       })
//       try{
//         const payment= await razorpay.payments.fetch(paymentID)
//         if(!payment){
//             return res.status(404).send("payment not found")
//         }
    
//         res.json({
//             status: success,
//             method: payment.method,
//             amount: payment.amount,
//             currency: payment.currency,
//         })
//       }catch(error){
//         console.log(error)
//         res.status(500).send("Server Error")
//       }

//  })

// 🔸 Razorpay Instance
const razorpay = new Razorpay({
  key_id: "rzp_test_NGk8LEATIRcMej",
  key_secret: "897MNPNcJLv4Eyp8XgGjig1N"
});

// 🔸 Create Razorpay Order
app.post('/orders', async (req, res) => {
  const { amount } = req.body;
  const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 1,
  };

  try {
      const response = await razorpay.orders.create(options);
      res.json({
          success: true,
          order: {
              id: response.id,
              amount: response.amount,
              currency: response.currency,
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).send("Error creating order");
  }
});

// 🔸 Verify Payment Signature
app.post('/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const hmac = crypto.createHmac("sha256", "897MNPNcJLv4Eyp8XgGjig1N");
  hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === razorpay_signature) {
      res.json({ success: true, message: "Payment verified" });
  } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
  }
});

// 🔸 Payment Details (Optional Debugging)
app.get('/payment/:paymentID', async (req, res) => {
  const { paymentID } = req.params;
  try {
      const payment = await razorpay.payments.fetch(paymentID);
      if (!payment) {
          return res.status(404).send("Payment not found");
      }
      res.json({
          success: true,
          method: payment.method,
          amount: payment.amount,
          currency: payment.currency,
      });
  } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching payment");
  }
});

app.listen(8088, '0.0.0.0', () => {
    console.log('Server running on port 8088');
  });
