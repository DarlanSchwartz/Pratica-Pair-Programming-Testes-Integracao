import { Fruit } from "@prisma/client";
import { conflictError } from "../errors/conflict-error";
import { notFoundError } from "../errors/notfound-error";
import fruitsRepository from "../repositories/fruits-repository";

export type FruitInput = Omit<Fruit, "id">;

async function getFruits() : Promise<Fruit[] | null> {
  return await fruitsRepository.getFruits();
}

async function getSpecificFruit(id: number): Promise<Fruit | null> {
  const fruit =await fruitsRepository.getSpecificFruit(id);
  if (!fruit) {
    throw notFoundError();
  }

  return fruit;
}

async function createFruit(fruit: FruitInput): Promise<void> {
  const fruitAlreadyRegistered = await fruitsRepository.getSpecificFruitByName(fruit.name);
  if (fruitAlreadyRegistered) {
    throw conflictError();
  }

  fruitsRepository.insertFruit(fruit);
}

const fruitsService = {
  getFruits,
  getSpecificFruit,
  createFruit
}

export default fruitsService;