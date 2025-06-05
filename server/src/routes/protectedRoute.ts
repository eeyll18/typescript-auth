import { Router, Request, Response } from "express";
import { protect } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";

const router = Router();

router.get("/me", protect, (req: Request, res: Response) => {
  res.json({ user: req.user });
});

router.get(
  "/admin-only",
  protect,
  authorize(["admin"]),
  (req: Request, res: Response) => {
    res.json({ message: "Welcome Admin!" });
  }
);

export default router;
