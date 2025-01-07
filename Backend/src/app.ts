import cors from "cors";
import swagger from "./utils/swagger";
import bodyParser from "body-parser";
import limiter from "./middlewares/rateLimiter";
import express, { Express, Request, Response } from "express";
import xss from "xss-clean";
import morgan from "morgan";
import helmet from "helmet";
import baseRouter from "./routes/baseRoute";
import globalErrorHandler, {
  routeNotFound,
} from "./controllers/errorController";

const app: Express = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:8081"],
    methods: "GET,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use("/api", limiter);
app.use(helmet());
app.use(xss());
app.use(
  "/api-docs",
  swagger.swaggerUi.serve,
  swagger.swaggerUi.setup(swagger.specs, { explorer: true })
);
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1", baseRouter);

app.get("/", (req: Request, res: Response) => {
  res.send(
    `<a href="${req.protocol}://${req.get("host")}/api-docs">Swagger docs</a>`
  );
});
app.all("*", routeNotFound);
app.use(globalErrorHandler);

export default app;
