'use client'

import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

interface Props {
  onBuscar: (filtros: {
    fechaInicio: string
    fechaFin: string
    nombre: string
    categoria: string
  }) => void
}

const Filtro = ({ onBuscar }: Props) => {
    const [fechaInicio, setFechaInicio] = useState<Date | null>(null)
    const [fechaFin, setFechaFin] = useState<Date | null>(null)
    const [showFiltros, setShowFiltros] = useState(false)
    const [nombre, setNombre] = useState('')
    const [categoria, setCategoria] = useState('')
    const categorias = [
      "Analgésicos",
      "Antiinflamatorios", 
      "Antihipertensivo",
      "Antidepresivo",
      "Antibióticos",
      "Cardiología",
      "Diabetes", 
      "Gastritis",
    ]

    const BuscarPorFiltros = () => {
    const hayFechaInicio = fechaInicio instanceof Date
    const hayFechaFin = fechaFin instanceof Date
    const nombreValido = nombre.trim().length > 0 ?  nombre.trim().length >=4  : true 
    const categoriaValida = categoria !== ''
 
    // Si solo hay una fecha, rechazar
    if ((hayFechaInicio && !hayFechaFin) || (!hayFechaInicio && hayFechaFin)) { 
       Swal.fire({
                title: '',
                text: 'Debes seleccionar ambas fechas: inicial y final.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              }) 
      return
    }
  // Si hay ambas fechas, validamos que la final no sea menor
    if (hayFechaInicio && hayFechaFin && fechaFin < fechaInicio) {
        Swal.fire({
                title: '',
                text: 'La fecha final no puede ser menor que la fecha inicial.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              })  
      return
    }
    //si hay nombre y el nombre es menor a 4
    if (nombre.trim().length > 0 && nombre.trim().length < 4) {
        Swal.fire({
                title: '',
                text: 'El formato del nombre no es valido.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              })  
      return
    }

    const fechasValidas = hayFechaInicio && hayFechaFin;
    const filtroValido = (fechasValidas || nombreValido || categoriaValida)  
    if (!filtroValido) { 
       Swal.fire({
                title: '',
                text: 'Debes ingresar al menos un nombre válido o seleccionar una categoría.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              })  
      return
    }

    onBuscar({
      fechaInicio: fechaInicio ? fechaInicio.toISOString().split('T')[0] : '',
      fechaFin: fechaFin ? fechaFin.toISOString().split('T')[0] : '',
      nombre,
      categoria
    })
  }

   /* const BuscarPorFechas = () => {
    if (!fechaInicio || !fechaFin) { 
       Swal.fire({
                title: '',
                text: 'Selecciona ambas fechas',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              })
      return
    }

    if (fechaFin < fechaInicio) {
          Swal.fire({
                title: '',
                text: 'La fecha final no puede ser menor que la fecha inicial.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              }) 
        return
    }


    const inicioStr = fechaInicio.toISOString().split('T')[0]
    const finStr = fechaFin.toISOString().split('T')[0]
    onBuscar(inicioStr, finStr)
  }*/

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-link text-primary"
          onClick={() => setShowFiltros(!showFiltros)}
        >
          {showFiltros ? (
            <>
              <i className="bi bi-chevron-up"></i> Filtros
            </>
          ) : (
            <>
              <i className="bi bi-chevron-down"></i> Filtros
            </>
          )}
        </button>
      </div>

      {showFiltros && (
        <div className="card card-body bg-light mt-2">
          <div className="row justify-content-center">
            <div className="col-md-4   mb-2 ">
              <label className="form-label  text-center  ">Fecha inicial:</label>
              <DatePicker
                selected={fechaInicio}
                onChange={(date) => setFechaInicio(date)}
                className="form-control "
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <div className="col-md-4 mb-2">
              <label className="form-label text-center">Fecha final:</label>
              <DatePicker
                selected={fechaFin}
                onChange={(date) => setFechaFin(date)}
                className="form-control "
                dateFormat="yyyy-MM-dd"
              />
            </div>

            
          
          </div>
          <div className="row justify-content-center">
            <div className="col-md-12   mb-2 ">
               <div className="col-md-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Mínimo 4 letras" />
                </div>

                <div className="col-md-3">
                  <label className="form-label">Categoría</label>
                  <select className="form-select" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                    <option value="">Categorias</option>
                    {categorias.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
            </div>

             
          </div>
          <div className="row justify-content-center"> 

            <div className="col-12 d-flex justify-content-end mt-5">
              <button className="btn btn-secondary me-2" onClick={() => {
                setFechaInicio(null)
                setFechaFin(null)
                setNombre('')
                setCategoria('')
              }}>
                Limpiar
              </button>
              <button className="btn btn-success" onClick={BuscarPorFiltros}>
                Buscar
              </button>
            </div>
          </div>
          <p>*El rango de fechas seleccionado es para buscar los medicamentos que expiraran en el mismo.</p>
        </div>
      )}
    </div>
  )
}

export default Filtro
