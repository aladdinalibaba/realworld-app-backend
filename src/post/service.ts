import { FindManyOptions, FindOneOptions } from 'typeorm';
import HttpException from '../util/exception';
import dataSource from '../data-source';
import Post from './entity';
import tagService from '../tag/service';

const postRepo = dataSource.getRepository(Post);

type NewPostObject = Partial<Post> & {
  tags: string[];
};

async function create(authorId: number, data: NewPostObject) {
  const tags =
    data.tags && data.tags.length > 0
      ? await tagService.takeOrCreate(data.tags)
      : [];

  const newPost = postRepo.create({
    ...data,
    author: { id: authorId },
    tags,
  });

  return postRepo.save(newPost);
}

function find(options?: FindManyOptions<Post>) {
  return postRepo.find(options);
}

function findOne(options: FindOneOptions<Post>) {
  return postRepo.findOne(options);
}

async function addTags(authorId: number, postId: number, tags: string[]) {
  const post = await postRepo.findOne({
    where: { id: postId },
    relations: ['author', 'tags'],
  });

  if (!post) {
    throw new HttpException('Post not found', 404);
  }

  if (post.author.id !== authorId) {
    throw new HttpException('You are not the author of this post', 403);
  }

  const newTags = await tagService.takeOrCreate(tags);

  const combinedTags = [...post.tags, ...newTags];

  const uniqueTags = [
    ...new Map(combinedTags.map((tag) => [tag.id, tag])).values(),
  ];

  post.tags = uniqueTags;

  return postRepo.save(post);
}

export default { create, find, findOne, addTags };
