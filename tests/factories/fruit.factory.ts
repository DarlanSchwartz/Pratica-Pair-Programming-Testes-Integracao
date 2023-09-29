import { faker } from "@faker-js/faker/locale/en_US";
import { Fruit } from "@prisma/client";
import prisma from "database";

function build(name: string, price : number) : Promise<Fruit>{
    return prisma.fruit.create({
        data: { name, price }
    });
}

async function buildRandom(){
    return build(faker.vehicle.model(), faker.number.float({min: 0, max: 100}));
}

const FruitsFactory = {
    build,
    buildRandom
};

export default FruitsFactory;