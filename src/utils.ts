import { DataSource } from "typeorm";
import { WilderEntity } from "./entities/WilderEntity";
import { SkillEntity } from "./entities/SkillEntity";
import { UpvoteEntity } from "./entities/UpvoteEntity";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "supersecure",
  database: "postgres",
  synchronize: true,
  entities: [WilderEntity, SkillEntity, UpvoteEntity],
});
