import { Router } from "express";

const adminApiRouter = Router({});
adminApiRouter.get("/test", async (req, res, next) => {
  res
    .contentType("application/json")
    .status(200)
    .json({ data: ["1", "2", "3"] });
});

export default adminApiRouter;
