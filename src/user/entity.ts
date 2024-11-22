import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';
import Post from '../post/entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @ManyToMany(() => User, (followers) => followers.following)
  followers!: User[];

  @ManyToMany(() => User, (following) => following.followers)
  @JoinTable({
    name: 'user_follower',
    joinColumn: { name: 'followers' },
    inverseJoinColumn: { name: 'following' },
  })
  following!: User[];

  @OneToMany(() => Post, (posts) => posts.author)
  posts!: Post[];

  @BeforeInsert()
  async preSave() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}

export default User;
