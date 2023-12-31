import app from "../src/app";
import supertest from "supertest";
import FruitsFactory from "./factories/fruit.factory";
import prisma from "database";

const server = supertest(app);

beforeEach(async () => {
    await prisma.fruit.deleteMany();
});

describe("POST /fruits", () => {
    
    it("should return a 201 status code when inserting a fruit", async () => {
        const response = await server.post("/fruits").send({name: "banana", price: 1.99});
        expect(response.status).toBe(201);
    });

    it("should return a 409 status when inserting a fruit with a name that already exists", async () => {
        const fruit = await FruitsFactory.build("banana", 1.99);
        delete fruit.id;
        const response = await server.post("/fruits").send(fruit);
        expect(response.status).toBe(409);
    });

    it("should return status 422 when data is invalid", async () => {
        const response = await server.post("/fruits").send({name: "banana"});
        expect(response.status).toBe(422);
        const response2 = await server.post("/fruits").send({price: 1.99});
        expect(response2.status).toBe(422);
    });
});

describe("GET /fruits", () => {
  it("should return status 404 when fruit doesnt exists", async () => {
    const response = await server.get("/fruits/32");
    expect(response.status).toBe(404);
  });

  it("should return status 400 when id is invalid", async () => {
    const response = await server.get("/fruits/batata");
    expect(response.status).toBe(400);
  });

  it("should return one fruit when given a valid and existing id", async () => {
    const fruit = await FruitsFactory.build("banana", 1.99);
    const response = await server.get(`/fruits/${fruit.id}`);
    expect(response.body).toEqual(fruit);
  });

  it("should return all fruits if no id is present", async () => {
    const fruit1 = await FruitsFactory.buildRandom();
    const fruit2 = await FruitsFactory.buildRandom();
    const fruit3 = await FruitsFactory.buildRandom();
    const response = await server.get("/fruits");
    expect(response.body).toEqual(expect.arrayContaining([fruit1, fruit2, fruit3]));
  });
});