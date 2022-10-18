import { SkillEntity } from "../entity/SkillEntity";
import { dataSource } from "../utils";
import { Request, Response } from "express";

export const createSkill = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("I've got a request");

  const skillToCreate = await dataSource
    .getRepository(SkillEntity)
    .create(req.body);

  dataSource
    .getRepository(SkillEntity)
    .save(skillToCreate)
    .then((data) => {
      res.json({ message: data });
    })
    .catch((err: any) => {
      res.send(err);
    });
};

export const findAllSkill = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("I've got a request");
  dataSource
    .getRepository(SkillEntity)
    .find()
    .then((data) => {
      res.json({ data });
    })
    .catch((err: any) => {
      res.send(err);
    });
};

export const findSkill = async (req: Request, res: Response): Promise<void> => {
  console.log("I've got a request");
  const skillId = Number(req.params.skillId);

  dataSource
    .getRepository(SkillEntity)
    .findOneBy({ id: skillId })
    .then((data) => {
      res.json({ message: data });
    })
    .catch((err: any) => {
      res.send(err);
    });
};

export const updateSkill = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("I've got a request");
  const wilderId = Number(req.params.wilderId);

  const wilderToUpdate = await dataSource
    .getRepository(SkillEntity)
    .findOneBy({ id: wilderId })
    .catch(() => {
      res.status(404);
      res.json({ message: "Skill not Found" });
    });

  if (wilderToUpdate != null) {
    wilderToUpdate.name = req.body.name;
    dataSource
      .getRepository(SkillEntity)
      .save(wilderToUpdate)
      .then((data) => {
        res.json({ message: data });
      })
      .catch((err: any) => {
        res.send(err);
      });
  }
};

export const deleteSkill = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("I've got a request");
  const skillId = Number(req.params.skillId);

  dataSource
    .getRepository(SkillEntity)
    .delete({ id: skillId })
    .then(() => {
      res.json({ message: "Skill Deleted" });
    })
    .catch((err: any) => {
      res.json({ message: err });
    });
};
