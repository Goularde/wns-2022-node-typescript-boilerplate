import { WilderEntity } from "../entity/WilderEntity";
import { dataSource } from "../utils";
import { Request, Response } from "express";

export const createWilder = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("I've got a request");

  const wilderToCreate = await dataSource
    .getRepository(WilderEntity)
    .create(req.body);
  console.log(wilderToCreate);

  dataSource
    .getRepository(WilderEntity)
    .save(wilderToCreate)
    .then((data) => {
      res.json({ message: data });
    })
    .catch((err) => {
      res.send(err);
    });
};

export const findAllWilder = (req: Request, res: Response): void => {
  console.log("I've got a request");
  dataSource
    .getRepository(WilderEntity)
    .find({
      relations: ["upvotes", "upvotes.skill"],
    })
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.send(err);
    });
};

export const findWilder = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("I've got a request");
  const wilderId = Number(req.params.wilderId);

  dataSource
    .getRepository(WilderEntity)
    .findOne({
      where: { id: wilderId },
      relations: ["upvotes", "upvotes.skill", "upvotes.wilder"],
    })
    .then((data) => {
      res.json({ message: data });
    })
    .catch((err) => {
      res.send(err);
    });
};

export const updateWilder = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("I've got a request");
  const wilderId = Number(req.params.wilderId);

  // dataSource
  //   .getRepository(Wilder)
  //   .findOneBy({ id: wilderId })
  //   .then((wilder) => {
  //     wilder.name = req.body.name
  //     dataSource
  //     .getRepository(Wilder)
  //     .save(wilderToUpdate)
  //     .then(
  //       (updatedWilder) => {
  //       res.json(updatedWilder)
  //     })
  //     .catch((err) => {
  //       res.send(err);
  //     });
  //   })
  //   .catch((err) => {
  //     res.send(err);
  //   });
  const wilderToUpdate = await dataSource
    .getRepository(WilderEntity)
    .findOneBy({ id: wilderId })
    .catch(() => {
      res.status(404);
      res.json({ message: "Wilder not Found" });
    });

  if (wilderToUpdate != null) {
    wilderToUpdate.name = req.body.name;
    dataSource
      .getRepository(WilderEntity)
      .save(wilderToUpdate)
      .then((data) => {
        res.json({ message: data });
      })
      .catch((err) => {
        res.send(err);
      });
  }
};

export const deleteWilder = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("I've got a request");
  const wilderId = Number(req.params.wilderId);

  await dataSource.getRepository(WilderEntity).findOneBy({ id: wilderId });

  dataSource
    .getRepository(WilderEntity)
    .delete({ id: wilderId })
    .then(() => {
      res.json({ message: "Wilder Deleted" });
    })
    .catch((err) => {
      res.send(err);
    });
};

export const deleteAll = async (req: Request, res: Response): Promise<void> => {
  console.log("I've got a request");
  await dataSource.getRepository(WilderEntity);
  dataSource
    .getRepository(WilderEntity)
    .clear()
    .then(() => {
      res.json({ message: "All Wilders has been Deleted" });
    })
    .catch((err) => {
      res.send(err);
    });
};
// export const addSkill = async (req: Request, res: Response): Promise<void> => {
//   console.log("I've got a request");
//   const wilderId = Number(req.params.wilderId);
//   const skillId = Number(req.params.skillId);

//   const wilderToUpdate = await dataSource
//     .getRepository(WilderEntity)
//     .findOneBy({ id: wilderId });
//   console.log(wilderToUpdate);

//   const skillToAdd = await dataSource
//     .getRepository(WilderEntity)
//     .findOneBy({ id: skillId });
//   console.log(wilderToUpdate);

//   if(wilderToUpdate != null){
//     wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];
//     await dataSource.getRepository(Wilder).save(wilderToUpdate);
//     res.send("Skill added to wilder");
//   }

// };
