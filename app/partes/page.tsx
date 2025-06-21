'use client';

import { useState } from 'react';

export default function PartesPage() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    area: 'Electricidad',
    zona: 'Madrid Río',
    trabajo: '',
    lugar: '',
    fecha: new Date().toISOString().split('T')[0],
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formulario);
  };

  return (
    <form onSubmit={manejarEnvio}>
      <input name="nombre" value={formulario.nombre} onChange={manejarCambio} placeholder="Nombre" />
      <input name="trabajo" value={formulario.trabajo} onChange={manejarCambio} placeholder="Trabajo" />
      <input name="lugar" value={formulario.lugar} onChange={manejarCambio} placeholder="Lugar" />
      <input name="fecha" value={formulario.fecha} onChange={manejarCambio} type="date" />
      <button type="submit">Enviar</button>
    </form>
  );
}
