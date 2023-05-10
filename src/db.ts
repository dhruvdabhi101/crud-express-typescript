import { PrismaClient } from "@prisma/client";
// just to we don't have to create client again and again .
const prisma = new PrismaClient();

export default prisma;
