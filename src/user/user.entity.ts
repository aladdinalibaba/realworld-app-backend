import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ length: 60 })
  password: string;

  @ManyToMany(() => User, (followers) => followers.following)
  followers: User[];

  @ManyToMany(() => User, (following) => following.followers)
  @JoinTable({ name: 'user_follow' })
  following: User[];
}
