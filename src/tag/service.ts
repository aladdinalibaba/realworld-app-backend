import { In } from 'typeorm';
import dataSource from '../data-source';
import Tag from './entity';

const tagRepo = dataSource.getRepository(Tag);

async function takeOrCreate(tags: string[]) {
  if (tags.length === 0) return [];

  const existingTags = await tagRepo.find({
    where: { name: In(tags) },
  });

  const set = new Set(existingTags.map((tag) => tag.name));

  const newTags = tags.filter((tag) => !set.has(tag));

  if (newTags.length > 0) {
    const newTagArr = newTags.map((name) => tagRepo.create({ name }));
    await tagRepo.save(newTagArr);
    existingTags.push(...newTagArr);
  }

  return existingTags;
}

export default { takeOrCreate };
