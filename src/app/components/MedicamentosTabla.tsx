'use client'

import { ModuleRegistry, AllCommunityModule, ColDef } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { useEffect, useState } from 'react'  
import VerMedicamentoModal from './modals/ModalMedicamento'
import { ICellRendererParams } from 'ag-grid-community';   
ModuleRegistry.registerModules([AllCommunityModule])
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'   
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import { useRef } from 'react'
import type { AgGridReact as AgGridReactType } from 'ag-grid-react' 


type Medicamento = {
  id: number
  nombre: string
  categoria: string
  cantidad: number
  fecha_expiracion: string
  Acciones: string
}

interface Props {
  filtros: { 
    fechaInicio: string,
    fechaFin: string,
    nombre: string,
    categoria: string } | null
}

export default function MedicamentosTabla({ filtros }: Props) {
  const [quickFilterText, setQuickFilterText] = useState('')
  const gridRef = useRef<AgGridReactType<Medicamento>>(null)
  const [selectedMedicamento, setSelectedMedicamento] = useState<Medicamento | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [editableMode, setEditableMode] = useState(false)
  const [medicamentos, setMedicamentos] = useState([]) 
 

  const  VerDatos = (med: Medicamento) => {
    setSelectedMedicamento(med)
    setShowModal(true)
  }

  useEffect(() => { 
    fetchMedicamentos();
  }, []);


  useEffect(() => {

    console.log(filtros)
    fetchMedicamentosFiltros()
    //fetchMedicamentosFechas()
  }, [filtros]);

  const fetchMedicamentos = async () => {
    const res = await fetch('/api/medicamentos');
    const data = await res.json(); 
    setMedicamentos(data);
  };

  const fetchMedicamentosFiltros = async () => {
      await fetch('/api/medicamentos/filtro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fechaInicio: filtros?.fechaInicio?.split('T')[0],   
          fechaFin: filtros?.fechaFin?.split('T')[0],
          nombre: filtros?.nombre,
          categoria : filtros?.categoria
        }),
      })
        .then(res => res.json())
        .then(data => {
          setMedicamentos(data)  
        })
 
  };

  const  eliminarDato = async (med: Medicamento) => { 
     const confirm = await Swal.fire({
    title: '¿Estás seguro?',
    text: `¿Deseas eliminar el medicamento "${med.nombre}"? Esta acción no se puede deshacer.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  })

  if (confirm.isConfirmed) {
    try {
      const res = await fetch(`/api/medicamentos`, {
        method: 'DELETE',
         headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: med.id,   
            }),
      })

      if (res.ok) {
        Swal.fire('Eliminado', 'El medicamento ha sido eliminado.', 'success')
        fetchMedicamentos() // vuelve a cargar la tabla
      } else {
        Swal.fire('Error', 'Hubo un problema al eliminar.', 'error')
      }
    } catch (err) {
      Swal.fire('Error', 'No se pudo conectar con el servidor.', 'error')
    }
  }
  }

  
 

const AccionesRenderer = (params: ICellRendererParams<Medicamento>) => {

  

  return (
    <div className="d-flex justify-content-around">
       <button
        className="btn btn-sm btn-outline-primary"
        title="Ver"
       onClick={() => VerDatos(params.data!)}
      >
        <i className="bi bi-eye" />
      </button>
      <button className="btn btn-sm btn-outline-warning"  
        onClick={() => {
          setSelectedMedicamento(params.data!)
          setEditableMode(true)  
          setShowModal(true)
        }}
      title="Editar">
        <i className="bi bi-pencil" />
      </button>
      <button className="btn btn-sm btn-outline-danger" title="Eliminar"
         onClick={() => eliminarDato(params.data!)}>
        <i className="bi bi-trash" />
      </button>
    </div>
  )
}


  
  const columnDefs: ColDef<Medicamento>[] = [
    { field: 'id', filter: true },
    { field: 'nombre', filter: true },
    { field: 'categoria', filter: true },
    { field: 'cantidad', filter: true },
    { field: 'fecha_expiracion', filter: true },
    {   headerName: 'Acciones',
    cellRenderer: AccionesRenderer,
    sortable: false,
    filter: false,
    autoHeight: true,
    width: 150 }
  ] 
  return (

    
    <div className="ag-theme-alpine" style={{ width: '100%', height: 300, }}>
    

    
       <button
          className="btn btn-success mb-3 float-end"
          onClick={() => {
            setSelectedMedicamento(null)
            setEditableMode(true)
            setShowModal(true)
          }}
        >
          <i className="bi bi-plus-circle"></i> Agregar Medicamento
        </button>

         <button
         style={{ marginRight:10 }}
          className="btn btn-primary mb-3 float-end"
          onClick={() => {  
            fetchMedicamentos()
          }}
        >
            Restablecer datos
        </button>

      <input
        type="text"
        className="form-control mb-2"
        placeholder="Buscar medicamento..."
        onChange={(e) => setQuickFilterText(e.target.value)}
      />
     
       <AgGridReact<Medicamento>
         ref={gridRef}
        rowData={medicamentos}
        columnDefs={columnDefs}
        quickFilterText={quickFilterText}
        pagination
        paginationPageSize={10}
        theme="legacy" 
      />

      <VerMedicamentoModal
         show={showModal}
        onClose={() => {
          setShowModal(false)
          setEditableMode(false)  
          fetchMedicamentos() 
        }}
        data={selectedMedicamento}
        forceEditable={editableMode}
      />
    </div>
  )
}