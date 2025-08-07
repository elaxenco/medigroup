import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-2 mt-auto">
      © {new Date().getFullYear()} © 2004 medigroup ® | 
      
       <Link href="/AvisoPrivacidad" className="text-white ms-2 text-decoration-underline">Aviso de Privacidad y Confidencialidad</Link>
        | Términos y Condiciones de Compra
    </footer>
  )
}
