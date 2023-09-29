import prisma from "../database/index";
import { FruitInput } from "../services/fruits-service";
import { Fruit } from "@prisma/client";

function getFruits() {
  return prisma.fruit.findMany();
}

function getSpecificFruit(id: number): Promise<Fruit | null> {
  return prisma.fruit.findFirst({where: {id}});
}

function getSpecificFruitByName(name: string):  Promise<Fruit | null> {
  return prisma.fruit.findFirst({where: {name}});
}

function insertFruit(fruit: FruitInput): Promise<Fruit | null>  {
  return prisma.fruit.create({data: {
    name: fruit.name,
    price: fruit.price
  }});
}

const fruitsRepository = {
  getFruits,
  getSpecificFruit,
  getSpecificFruitByName,
  insertFruit
}

export default fruitsRepository;