import { CssBaseline } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <CssBaseline>
      <ul>
        <li>
          <Link href="/users">Formulario usuarios</Link>
        </li>
        <li>
          <Link href="/users">Buscador de imagenes</Link>
        </li>
        <li>
          <Link href="/users">TODO app</Link>
        </li>
      </ul>
    </CssBaseline>
  );
}
