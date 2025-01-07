import { NextFunction, Request, Response } from "express";
import Order from "../models/OrderModel";
import { asyncErrorHandler } from "../utils/asyncErrorHandler";
import CustomError from "../utils/CustomError";
import ApiFeatures from "../utils/ApiFeatures";

export const createOrder = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { clientId, rooms, curtainRods, installation } = req.body;
    let total = 0;

    rooms.forEach((room: any) => {
      const roomCost =
        room.yards * room.ratePerYard + room.yards * room.sewingCost;
      total += roomCost;
    });

    const curtainRodCost = curtainRods.quantity * curtainRods.costPerRod;
    total += curtainRodCost;

    const installationCost =
      installation.windows * installation.costPerWindow +
      installation.transport;
    total += installationCost;

    const order = await Order.create({
      client: clientId,
      rooms,
      curtainRods,
      installation,
      total,
    });

    res.status(201).json({
      status: "success",
      data: {
        order,
      },
    });
  }
);

export const getAllOrders = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const features = new ApiFeatures(Order.find(), req.query);
    const orders = await features.query;
    const total: number = await Order.countDocuments();
  
    res.status(200).json({
      status: "success",
      data: {
        orders,
      },
    });
  }
);

export const getOrder = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  }
);

export const updateOrder = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      next(new CustomError("The order does not exist", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);

export const deleteOrder = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      next(new CustomError("The order does not exist", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
