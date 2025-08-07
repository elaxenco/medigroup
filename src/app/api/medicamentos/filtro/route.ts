import { NextRequest, NextResponse } from 'next/server'
import sql from '@/app/lib/db'  

export async function POST(req: NextRequest) {
  try {
    const { fechaInicio, fechaFin , nombre, categoria} = await req.json()

   
console.log(fechaInicio, fechaFin , nombre, categoria)

    if (fechaInicio > fechaFin) {
      return NextResponse.json({ error: 'Fechas inválidas' }, { status: 400 })
    }

    if (nombre.trim().length > 0 && nombre.trim().length < 4) {
      return NextResponse.json({ error: 'Fechas inválidas' }, { status: 400 })
    }

    let queryFiltros = ''

      const filtrosValidos: string[] = []

      // Nombre válido
      if (nombre.trim().length >= 4) {
        filtrosValidos.push(`nombre ILIKE '%${nombre}%'`)
      } 

      // Fechas válidas
      if (fechaInicio && fechaFin) {
        filtrosValidos.push(`fecha_expiracion BETWEEN '${fechaInicio}' AND '${fechaFin}'`)
      }

      // Categoría válida
      if (categoria.length > 0) {
        filtrosValidos.push(`categoria = '${categoria}'`)
      }

      // Unir todos los filtros con AND
      if (filtrosValidos.length > 0) {
        queryFiltros = filtrosValidos.join(' AND ')
      }
    
    

    const result = await sql`SELECT id, nombre, categoria, cantidad, 
           fecha_expiracion::Character varying
      FROM medicamentos
     ${queryFiltros ? sql.unsafe(`WHERE ${queryFiltros}`) : sql``}
      ORDER BY id DESC` 

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error al filtrar medicamentos:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
