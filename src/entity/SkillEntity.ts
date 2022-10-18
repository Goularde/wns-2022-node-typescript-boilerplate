import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UpvoteEntity } from "./UpvoteEntity";

@Entity()
export class SkillEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => UpvoteEntity, 'skill')
  upvotes: UpvoteEntity[];

}
