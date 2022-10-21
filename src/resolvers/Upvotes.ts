import { UpvoteEntity } from "../entities/UpvoteEntity";
import { dataSource } from "../utils";
import { Request, Response } from "express";

export const createUpvote = async (
  req: Request,
  res: Response
): Promise<void> => {
  const repository = dataSource.getRepository(UpvoteEntity);

  console.log(req.body.wilderId);
  const upvote = await repository.save({
    wilder: { id: req.body.wilderId },
    skill: { id: req.body.skillId },
  });
  res.json(upvote);
};

export const deleteUpvote = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("I've got a request");
  const upvoteId = Number(req.params.upvoteId);

  await dataSource.getRepository(UpvoteEntity).findOneBy({ id: upvoteId });

  dataSource
    .getRepository(UpvoteEntity)
    .delete({ id: upvoteId })
    .then(() => {
      res.json({ message: "upvoteId Deleted" });
    })
    .catch((err) => {
      res.send(err);
    });
};

export const addUpvote = async (req: Request, res: Response): Promise<void> => {
  const upvoteId = Number(req.params.upvoteId);
  console.log("Upvote a augmenter :", upvoteId);
  const repository = dataSource.getRepository(UpvoteEntity);
  console.log(req.body);
  const existingUpvote = await repository.findOneBy({ id: upvoteId });
  if (existingUpvote != null) {
    existingUpvote.upvote++;

    await repository.save(existingUpvote);
    res.json(existingUpvote);
  } else {
    throw new Error("Doest not exist");
  }
};

export const substracUpvote = async (
  req: Request,
  res: Response
): Promise<void> => {
  const upvoteId = Number(req.params.upvoteId);
  const repository = dataSource.getRepository(UpvoteEntity);
  console.log(req.body);
  const existingUpvote = await repository.findOneBy({ id: upvoteId });
  if (existingUpvote != null) {
    existingUpvote.upvote--;

    await repository.save(existingUpvote);
    res.json(existingUpvote);
  } else {
    throw new Error("Doest not exist");
  }
};
