import Link from "next/link"

interface Props {
  visible: boolean
}



export default function Sidebar({ visible }: Props) {
  if (!visible) return null

  return (
    <div
      className="text-white  "
      style={{ width: '250px', minWidth: '250px' , backgroundColor : '#0e5c8c'}}
    >
      <ul className="nav flex-column">
        <Link href="/"  style={{ color: 'White', fontWeight: 'bold', textDecoration:'none'  }}>
        <li className="nav-item  "  style={{
          borderBottom: '1px solid white',  
          transition: 'background-color 0.3s',
          height:35 
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e90ff')} // azul suave
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}> 
                <p  style={{
          marginLeft:25
        }}>Inicio</p> 
              </li></Link> 

              <Link href="/Medicamentos"  style={{ color: 'White', fontWeight: 'bold',textDecoration:'none'  }}>
              <li className="nav-item" style={{
          borderBottom: '1px solid white',  
          transition: 'background-color 0.3s',
          height:35
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e90ff')} // azul suave
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
             <p  style={{
          marginLeft:25
        }}>Medicamentos</p> 
        </li></Link>  
      </ul>
    </div>
  )
}
