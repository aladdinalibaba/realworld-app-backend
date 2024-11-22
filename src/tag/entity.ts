import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Post from '../post/entity';

@Entity()
class Tag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 20, unique: true })
  name!: string;

  @ManyToMany(() => Post, (posts) => posts.tags)
  @JoinTable({ name: 'post_tag' })
  posts!: Post[];
}

export default Tag;
