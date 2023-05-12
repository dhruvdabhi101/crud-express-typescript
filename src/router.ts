import { Request, Response, Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handler/product";
import { deepStrictEqual } from "assert";

const router = Router();
/**
 *Product
 */

router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);
router.delete(
  "/product/:id",
  body("id").isString(),
  handleInputErrors,
  deleteProduct
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
 * Updatepoint
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
