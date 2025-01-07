import express from "express";
import Stock from "../models/StockModel";
import { asyncErrorHandler } from "../utils/asyncErrorHandler";
import CustomError from "../utils/CustomError";
import ApiFeatures from "../utils/ApiFeatures";

export const createStock = asyncErrorHandler(async (req, res, next) => {
  const { name, quantity, price, description } = req.body;
  const stock = await Stock.create({ name, quantity, price, description });
  res.status(201).json({
    status: "success",
    data: { stock },
  });
});

export const getAllStocks = asyncErrorHandler(async (req, res, next) => {
  const features = new ApiFeatures(Stock.find(), req.query);
  const stocks = await features.query;
  const total: number = await Stock.countDocuments();

  res.status(200).json({
    status: "success",
    data: { total, length: stocks.length, stocks },
  });
});

export const getStock = asyncErrorHandler(async (req, res, next) => {
  const stock = await Stock.find();
  if (!stock) {
    return next(new CustomError("Stock item not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: { stock },
  });
});

export const updateStock = asyncErrorHandler(async (req, res, next) => {
  const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!stock) {
    return next(new CustomError("Stock item not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: { stock },
  });
});

export const deleteStock = asyncErrorHandler(async (req, res, next) => {
  const stock = await Stock.findByIdAndDelete(req.params.id);
  if (!stock) {
    return next(new CustomError("Stock item not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: { stock },
  });
});
