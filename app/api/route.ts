import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Consulta a la base de datos utilizando Prisma
    const detections = await prisma.detection.findMany({
      take: 10, // Devuelve los primeros 10 registros
    });

    // Devuelve la respuesta en formato JSON
    return NextResponse.json(detections);
  } catch (error) {
    console.error("Error al obtener los datos: ", error);

    // Devuelve un error en caso de fallo
    return NextResponse.json({ error: 'Error al obtener los datos' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
