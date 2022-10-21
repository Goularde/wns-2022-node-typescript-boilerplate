import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UpvoteEntity } from "./UpvoteEntity";
import { Field, ID, ObjectType } from "type-graphql";


@Entity()
@ObjectType()
export class SkillEntity{
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => UpvoteEntity, 'skill')
  @Field(()=> [UpvoteEntity])
  upvotes: UpvoteEntity[];

}
