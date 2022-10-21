import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from "typeorm";
import { SkillEntity } from "./SkillEntity";
import { WilderEntity } from "./WilderEntity";
import { Field, ID, ObjectType } from "type-graphql";


@Entity()
@ObjectType()
@Unique("wilderID_skillID_Unique", ["wilder", "skill"])
export class UpvoteEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ default: 0 })
  @Field()
  upvote: number;

  @ManyToOne(() => WilderEntity, "upvotes", { onDelete: 'CASCADE'})
  @Field(() => WilderEntity)
  wilder: WilderEntity;

  @ManyToOne(() => SkillEntity, "upvotes")
  @Field(() => SkillEntity)
  skill: SkillEntity;
}
