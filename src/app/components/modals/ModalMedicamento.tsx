'use client'

import { useState, useEffect } from 'react'
import { Medicamento } from '../../interface/MedicamentoInterface'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css' 
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

interface Props {
  show: boolean
  onClose: () => void
  data: Medicamento | null
  forceEditable?: boolean | false
}

export default function VerMedicamentoModal({ show, onClose, data }: Props) {
  const [editable, setEditable] = useState(false)
  const [form, setForm] = useState<Medicamento | null>(null) 

  const categorias = [ 
      "Analgésicos",
      "Antiinflamatorios", 
      "Antihipertensivo",
      "Antidepresivo",
      "Antibióticos",
      "Cardiología",
      "Diabetes", 
      "Gastritis",
    ];

  useEffect(() => {
     if (data && data.id >0 ) {
        setForm({ ...data })
        setEditable(true)
      } else {
        // Es nuevo, cargar valores vacíos
        setForm({
          id: 0,
          nombre: '',
          categoria: '',
          cantidad: 0,
          fecha_expiracion: new Date().toISOString().split('T')[0],
        })
        setEditable(true)
      }
  }, [data ])
 
  if (!show || !form) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'cantidad' && (!/^\d*$/.test(value) || parseInt(value) < 0)) return
    setForm({ ...form, [name]: value })
 
  }

  
  const GuardarDatos = async () => { 
   if (!form) return 

  if (
     !form.fecha_expiracion || form.fecha_expiracion.trim() === '' ||
    !form.nombre || form.nombre.trim() === '' ||
    !form.categoria || form.categoria.trim() === '' ||
    form.cantidad === null || form.cantidad === undefined || isNaN(Number(form.cantidad)) || Number(form.cantidad) < 0
  ) {
    Swal.fire({
          title: '',
          text: 'Por favor completa correctamente los campos: Nombre, Categoría, Cantidad y Fecha de expiracion.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
    return
  }


  const method = form.id ? 'PUT' : 'POST'


  const res = await fetch(`/api/medicamentos`, {
  method,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: form.id,  
    nombre: form.nombre,
    categoria: form.categoria,
    cantidad:  form.cantidad ,
    fecha_expiracion: form.fecha_expiracion,
  }),
})
 
  if (res.ok) {

     setForm({
          id: 0,
          nombre: '',
          categoria: '',
          cantidad: 0,
          fecha_expiracion: new Date().toISOString().split('T')[0],
        })

      Swal.fire({
        title: '',
        text: form.id ? 'Datos actualizados correctamente' : 'Datos guardados correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
    
   
    onClose()
     
  } else {

     Swal.fire({
        title: '',
        text:   'Error al guardar cambios',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }) 
  }
}


  
  

  return (
    <div className="modal show fade d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>

      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Detalle de medicamento</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form className="row g-3">
              <div className="col-md-2">
                <label className="form-label">ID</label>
                <input type="text" name="id" className="form-control" value={form.id} disabled readOnly />
              </div>
              <div className="col-md-5">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange} 
                />
              </div>
              <div className="col-md-5">
                <label className="form-label">Categoría</label>
                    <select
                        id="categoria"
                        className="form-select"
                        value={form.categoria}
                        onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                      >
                        <option value="">Seleccione una categoría</option>
                        {categorias.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Cantidad</label>
                <input
                  type="number"
                  className="form-control"
                  name="cantidad"
                  value={form.cantidad}
                  onChange={handleChange} 
                  min={0}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Fecha Expiración</label><br />
                 <DatePicker
                   selected={form.fecha_expiracion ? new Date(form.fecha_expiracion) : null}
                  onChange={(date) =>
                    setForm({ ...form, fecha_expiracion: date?.toISOString().split('T')[0] || '' })
                  }
                  className="form-control"
                  dateFormat="yyyy-MM-dd"
                  minDate={new Date()} 
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>
            {!editable ? (
              <button className="btn btn-warning" onClick={() => setEditable(true)}>
                Editar
              </button>
            ) : (
              <button className="btn btn-success" onClick={GuardarDatos}>
                Guardar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
