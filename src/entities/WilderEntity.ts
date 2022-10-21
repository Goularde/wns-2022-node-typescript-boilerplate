import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UpvoteEntity } from "./UpvoteEntity";

@Entity()
@ObjectType()
export class WilderEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  city: string;

  @OneToMany(() => UpvoteEntity, "wilder")
  @Field(() => [UpvoteEntity])
  upvotes: UpvoteEntity[];
}

@InputType()
export class WilderInput {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  city: string;
}

