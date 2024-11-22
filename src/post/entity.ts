import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '../user/entity';
import Tag from '../tag/entity';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @ManyToOne(() => User, (author) => author.posts, {
    nullable: false,
  })
  @JoinTable({ name: 'authorId' })
  author!: User;

  @ManyToMany(() => Tag, (tags) => tags.posts)
  tags!: Tag[];
}

export default Post;
