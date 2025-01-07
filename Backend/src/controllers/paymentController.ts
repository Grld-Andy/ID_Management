import express from "express";
import Payment from "../models/PaymentModel";
import { asyncErrorHandler } from "../utils/asyncErrorHandler";
import CustomError from "../utils/CustomError";
import ApiFeatures from "../utils/ApiFeatures";

export const makePayment = asyncErrorHandler(async (req, res, next) => {
  const { orderId, amount, type } = req.body;
  const payment = await Payment.create({ orderId, amount, type });
  res.status(201).json({ status: "success", payment });
});

export const getAllPayments = asyncErrorHandler(async (req, res, next) => {
  const features = new ApiFeatures(
    Payment.find().populate("orderId"),
    req.query
  );
  const payments = await features.query;
  const total: number = await Payment.countDocuments();

  res.status(200).json({
    status: "success",
    data: {
      payments,
      total,
      length: payments.length,
    },
  });
});

export const getPaymentForOrder = asyncErrorHandler(async (req, res, next) => {
  const payments = await Payment.find({ orderId: req.params.id }).populate(
    "orderId"
  );
  if (payments.length === 0) {
    return next(new CustomError("Payment not found for this error", 404));
  }
  res.status(200).json({ status: "success", data: { payments } });
});

export const getPaymentReport = asyncErrorHandler(async (req, res, next) => {
  const deposits = await Payment.aggregate([
    { $match: { type: "deposit" } },
    { $group: { _id: null, totalDeposits: { $sum: "$amount" } } },
  ]);

  const fullPayments = await Payment.aggregate([
    { $match: { type: "full" } },
    { $group: { _id: null, totalFullPayments: { $sum: "$amount" } } },
  ]);

  const totalEarnings =
    (deposits[0]?.totalDeposits || 0) +
    (fullPayments[0]?.totalFullPayments || 0);

  res.status(200).json({
    status: "success",
    data: {
      totalDeposits: deposits[0]?.totalDeposits || 0,
      totalFullPayments: fullPayments[0]?.totalFullPayments || 0,
      totalEarnings,
    },
  });
});
