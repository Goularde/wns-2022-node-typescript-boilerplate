import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from "typeorm";
import { SkillEntity } from "./SkillEntity";
import { WilderEntity } from "./WilderEntity";

@Entity()
@Unique("wilderID_skillID_Unique", ["wilder", "skill"])
export class UpvoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  upvote: number;

  @ManyToOne(() => WilderEntity, "upvotes", { onDelete: 'CASCADE'})
  wilder: WilderEntity;

  @ManyToOne(() => SkillEntity, "upvotes")
  skill: SkillEntity;
}
