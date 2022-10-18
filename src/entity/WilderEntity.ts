import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UpvoteEntity } from "./UpvoteEntity";

@Entity()
export class WilderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  city: string;

  @OneToMany(() => UpvoteEntity, "wilder")
  upvotes: UpvoteEntity[];
}
