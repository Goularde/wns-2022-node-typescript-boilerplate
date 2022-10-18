import express from "express";
import cors from "cors";
import { dataSource } from "./utils";
import {
  createWilder,
  updateWilder,
  findAllWilder,
  findWilder,
  deleteWilder,
  deleteAll,
} from "./controllers/Wilders";
import {
  createSkill,
  updateSkill,
  findAllSkill,
  findSkill,
  deleteSkill,
} from "./controllers/Skills";
import {
  addUpvote,
  createUpvote,
  substracUpvote,
  deleteUpvote,
} from "./controllers/Upvotes";

const app = express();

app.use(express.json());
app.use(cors());

type Controller = (req: express.Request, res: express.Response) => void;

const asyncHandler = (
  controller: Controller
): Controller => {
  return async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      await controller(req, res);
    } catch (err: any) {
      console.error("Error :", err);
      res.status(500);
    }
  };
};

/**
 * Wilder Routes
 */
app.post("/api/wilders", asyncHandler(createWilder));

app.get("/api/wilders", asyncHandler(findAllWilder));

app.get("/api/wilders/:wilderId", asyncHandler(findWilder));

app.put("/api/wilders/:wilderId", asyncHandler(updateWilder));

app.delete("/api/wilders/:wilderId", asyncHandler(deleteWilder));

app.delete("/api/wilders", asyncHandler(deleteAll));

// app.post("/api/wilders/:wilderId/skills/:skillId", asyncHandler(addSkill));

/**
 * Skill Routes
 */
app.post("/api/skills", asyncHandler(createSkill));

app.get("/api/skills", asyncHandler(findAllSkill));

app.get("/api/skills/:skillId", asyncHandler(findSkill));

app.put("/api/skills/:skillId", asyncHandler(updateSkill));

app.delete("/api/skills/:skillId", asyncHandler(deleteSkill));

/**
 * Upvotes Routes
 */
app.post("/api/upvotes", asyncHandler(createUpvote));

app.put("/api/upvotes/:upvoteId/upvote", asyncHandler(addUpvote));

app.put("/api/upvotes/:upvoteId/downvote", asyncHandler(substracUpvote));

app.delete("/api/upvotes/:upvoteId", asyncHandler(deleteUpvote));

export const start = async (): Promise<void> => {
  await dataSource.initialize();
  // dataSource.getRepository(Wilder).save({ name: "Toto" });
};

// Start server
app.listen(5000, async () => {console.log("Server started on 5000")});

start().catch(() => {throw new Error("Datasource not initialized")});
