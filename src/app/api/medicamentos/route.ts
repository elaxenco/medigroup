import { NextRequest, NextResponse } from 'next/server'
import sql from '@/app/lib/db'

export async function GET() {
  try {
    const medicamentos = await sql`SELECT id, nombre, categoria, cantidad, 
           fecha_expiracion::Character varying
  FROM medicamentos order by id desc`
    return NextResponse.json(medicamentos)
  } catch (error) {
    console.error('Error al obtener medicamentos:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, nombre, categoria, cantidad, fecha_expiracion } = body

    await sql`
      UPDATE medicamentos
      SET nombre = ${nombre},
          categoria = ${categoria},
          cantidad = ${cantidad},
          fecha_expiracion = ${fecha_expiracion}
      WHERE id = ${id}
    `

    return NextResponse.json({ message: 'Medicamento actualizado' })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error al actualizar medicamento' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { nombre, categoria, cantidad, fecha_expiracion } = body

  if (!nombre?.trim() || !categoria?.trim() || cantidad < 0 || !fecha_expiracion) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
  }

  await sql`
    INSERT INTO medicamentos (nombre, categoria, cantidad, fecha_expiracion)
    VALUES (${nombre}, ${categoria}, ${cantidad}, ${fecha_expiracion})
  `
  
  return NextResponse.json({ message: 'Medicamento registrado' })
}

export async function DELETE(req: NextRequest) {
  const body = await req.json()
  const { id } = body 
  await sql`DELETE FROM medicamentos WHERE id = ${id} ` 
  return NextResponse.json({ message: 'Medicamento eliminado' })
}