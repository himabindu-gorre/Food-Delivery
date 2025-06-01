import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order for frontend
const placeOrder = async(req, res) => {

    const frontend_url = "http://localhost:5173"

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.item,
            amount:req.body.amount,
            address:req.body.address
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});


        const line_items = req.body.item.map((item) => ({
            price_data: {
                currency:"usd",
                product_data: {
                    name:item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))
        line_items.push ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 
            },
            quantity:1
        })


        const sesssion  = await stripe.checkout.sessions.create ({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({success: true, session_url:sesssion.url});
    }
    catch(error) {
        console.log(error);
        res.json({success:false, message: "Error"});
    }

}

const verifyOrder = async (req, res) => {
    const {orderId, success} = req.body;

    try {
        if(success == 'true') {
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            res.json({success:true, message: "Paid"})
        }
    
    else {
        await orderModel.findByIdAndDelete(orderId);
        res.json({success:false, message: "Not Paid"})
        }
    }
    catch(error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}


//user orders for frontend

const userOrders = async(req, res) =>{
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true, data:orders});
    } catch(error) {
        res.json({success:false, message:"Error"});
    }
}

// Listing orders for admin panel
const listOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true, data:orders})
    }
    catch(error) {
        console.log(error);
        res.json({success:false, message: "Error"});
    }
}


// api for updating order status
const updateStatus = async(req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status})
        res.json({success:true, message: "Status Updated"})
    }
    catch(error) {
        console.log(error);
        res.json({success:false, message: "Error"});

    }

}
export {placeOrder , verifyOrder, userOrders, listOrders, updateStatus};

// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Placing user order from frontend
// const placeOrder = async (req, res) => {
//     const frontend_url = "http://localhost:5173";

//     try {
//         // const { userId, items, amount, address } = req.body;
        

//         // Validate required fields
//         if (!userId || !Array.isArray(items) || items.length === 0 || !amount || !address) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Missing or invalid order details"
//             });
//         }

//         // Save new order to database
//         // const newOrder = new orderModel({
//         //     userId,
//         //     items,
//         //     amount,
//         //     address
//         // });
//          const newOrder = new orderModel({
//             userId: req.body.userId,
//             items: req.body.items,
//             amount:req.body.amount,
//             address:req.body.address
//         })

//         await newOrder.save();

//         // Clear user's cart
//         await userModel.findByIdAndUpdate(userId, { cartData: {} });

//         // Stripe line items
//         const line_items = items.map((item) => ({
//             price_data: {
//                 currency: "usd",
//                 product_data: {
//                     name: item.name
//                 },
//                 unit_amount: item.price * 100
//             },
//             quantity: item.quantity
//         }));

//         // Add delivery charges
//         line_items.push({
//             price_data: {
//                 currency: "usd",
//                 product_data: {
//                     name: "Delivery Charges"
//                 },
//                 unit_amount: 2 * 100
//             },
//             quantity: 1
//         });

//         // Create Stripe session
//         const session = await stripe.checkout.sessions.create({
//             line_items,
//             mode: 'payment',
//             success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
//         });

//         res.json({ success: true, session_url: session.url });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Error placing order" });
//     }
// };

// // Verifying payment and updating order
// const verifyOrder = async (req, res) => {
//     const { orderId, success } = req.body;

//     try {
//         if (success === 'true') {
//             await orderModel.findByIdAndUpdate(orderId, { payment: true });
//             res.json({ success: true, message: "Payment successful" });
//         } else {
//             await orderModel.findByIdAndDelete(orderId);
//             res.json({ success: false, message: "Payment failed, order cancelled" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Error verifying order" });
//     }
// };

// // Get all orders by user
// const userOrders = async (req, res) => {
//     try {
//         const orders = await orderModel.find({ userId: req.body.userId });
//         res.json({ success: true, data: orders });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Error retrieving orders" });
//     }
// };

// // Admin: List all orders
// const listOrders = async (req, res) => {
//     try {
//         const orders = await orderModel.find({});
//         res.json({ success: true, data: orders });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Error listing orders" });
//     }
// };

// // Admin: Update order status
// const updateStatus = async (req, res) => {
//     try {
//         const { orderId, status } = req.body;

//         await orderModel.findByIdAndUpdate(orderId, { status });
//         res.json({ success: true, message: "Status updated" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Error updating status" });
//     }
// };

// export {
//     placeOrder,
//     verifyOrder,
//     userOrders,
//     listOrders,
//     updateStatus
// };
