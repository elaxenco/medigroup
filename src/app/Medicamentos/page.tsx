'use client'

import MedicamentosTabla from "../components/MedicamentosTabla"
import Filtro from "../components/Filtros"
import { useState } from "react"

export default function Page() {
  const [filtros, setFiltros] = useState<{ fechaInicio: string; fechaFin: string , nombre: string, categoria: string} | null>(null)

    const BuscarPorFiltro = (filtros: { 
      fechaInicio: string, 
      fechaFin: string, 
      nombre: string, 
      categoria: string 
    }) => {
       setFiltros(filtros)
    }

  return (
    <div className="container mt-4">
      <h1>Medicamentos</h1>
      <Filtro onBuscar={BuscarPorFiltro} />
      <MedicamentosTabla filtros={filtros} />
    </div>
  )
}
