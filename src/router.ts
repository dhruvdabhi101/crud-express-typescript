import { Request, Response, Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";

const router = Router();
/**
 *Product
 */

router.get("/product", (req, res) => {
  res.json({ message: req.body.name });
});
router.get("/product/:id", () => {});
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  (req, res) => {}
);
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  (req, res) => {}
);
router.delete(
  "/product/:id",
  body("id").isString(),
  handleInputErrors,
  (req, res) => {}
);

/**
 * Update
 */

router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("version").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  handleInputErrors,
  (req: Request, res: Response) => {}
);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  handleInputErrors,
  () => {}
);
router.delete("/update/:id", () => {});

/**
 * Update
 */

router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  handleInputErrors,
  (req, res) => {}
);
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  handleInputErrors,

  () => {}
);
router.delete("/updatepoint/:id", () => {});

export default router;
