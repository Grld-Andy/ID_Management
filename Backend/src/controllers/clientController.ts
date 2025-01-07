import { Request, Response, NextFunction } from "express";
import Client from "../models/ClientsModel";
import { asyncErrorHandler } from "../utils/asyncErrorHandler";
import CustomError from "../utils/CustomError";
import ApiFeatures from "../utils/ApiFeatures";

export const createClient = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, phone, email, address, extraDetails } = req.body;
    const client = await Client.create({
      name,
      phone,
      email,
      address,
      extraDetails,
    });

    res.status(201).json({
      status: "success",
      data: {
        client,
      },
    });
  }
);

export const getClients = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const features = new ApiFeatures(Client.find(), req.query);
    const clients = await features.query;
    const total: number = await Client.countDocuments();

    res.status(200).json({
      status: "success",
      data: {
        clients,
      },
    });
  }
);

export const getClientById = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const client = await Client.findById(id);
    if (!client) {
      next(new CustomError("Client not found", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        client,
      },
    });
  }
);

export const updateClient = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updatedData = req.body;
    const client = await Client.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!client) {
      next(new CustomError("Client not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        client,
      },
    });
  }
);

export const deleteClient = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const client = await Client.findByIdAndDelete(id);

    if (!client) {
      next(new CustomError("Client not found", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
