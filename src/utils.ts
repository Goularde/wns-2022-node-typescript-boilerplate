import { DataSource } from "typeorm";
import { WilderEntity } from "./entity/WilderEntity";
import { SkillEntity } from "./entity/SkillEntity";
import { UpvoteEntity } from "./entity/UpvoteEntity";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./wilders.db",
  synchronize: true,
  entities: [WilderEntity, SkillEntity, UpvoteEntity],
  logging: ["error"],
});
