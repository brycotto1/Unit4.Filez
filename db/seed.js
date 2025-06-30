import db from "#db/client";
import { faker } from "@faker-js/faker";

import { addFolder } from "./queries/folders.js";
import { addFile } from "./queries/files.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  //repeat folders creation 3 times
  for(let i = 0; i < 3; i++) {
    const folder = await addFolder(faker.science.chemicalElement().name + faker.science.chemicalElement().name + faker.science.chemicalElement().name);
    for(let j = 0; j < 5; j++){
      await addFile(faker.science.chemicalElement().name + faker.science.chemicalElement().name + faker.science.chemicalElement().name , faker.number.int({min: 20, max: 100}), folder.id);
    }
  }
}
