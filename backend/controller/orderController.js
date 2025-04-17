import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc - create a new order
// @method - POST /api/orders
// access - Private
const addOderItems = asyncHandler(async (req, res) => {
  const {
    user,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(404);
    throw new Error("Order not found");
  } else {
    const order = new Order({
      user,
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id,
        _id: undefined,
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    console.log("order prepared: ", order);

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc    Get my orders
// @method -GET /api/orders/myorders
// access   Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc    Get  order by ID
// @method GET /api/orders/myorder
// access   Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  console.log("backend Order: ", order);
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("No order is found");
  }
});

// @desc    update order to paid by Id
// @method PUT /api/orders/myorder/:id
// access   Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    update order to delivered
// @method PUT /api/orders/myorder/:id
// access   Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    get all orders
// @method GET /api/orders/myorder/:id
// access   Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  if (orders) {
    res.status(200).json(orders);
  }
});

export {
  addOderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
};
