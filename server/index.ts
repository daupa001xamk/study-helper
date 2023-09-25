import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app: express.Application = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3364;

app.use(cors());
app.use(express.json())
//Api
app.post("/cards", async (req: express.Request, res: express.Response) => {
  try {
    const { question, answer, collectionId } = req.body;

    const card = await prisma.card.create({
      data: {
        question,
        answer,
        collectionId,
      },
    });

    res.json(card);
  } catch (error) {
    console.error("Error creating card:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Collections

// GET endpoint to fetch collections
app.get("/api/collections", async (req, res) => { // Corrected 'req' parameter
  try {
    const collections = await prisma.collection.findMany();
    res.json(collections);
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST endpoint to create a collection
app.post('/api/collections', async (req, res) => {
  try {
    const { name } = req.body;
    const collection = await prisma.collection.create({
      data: {
        name,
      },
    });
    res.status(201).json(collection);
  } catch (error) {
    console.error('Error creating collection:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//test
app.get("/test", async (res: express.Response) => {
  try {
    res.json({ connection: true });
  } catch (error) {
    console.error("Connection error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
