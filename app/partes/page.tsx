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

  const [partes, setPartes] = useState([]);

  const zonasPorArea = {
    Electricidad: ['Madrid Río', 'Parque Lineal', 'Plaza España'],
    'Fuentes Ornamentales': ['Madrid Río', 'Parque Lineal', 'Plaza España'],
  };

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    setPartes(prev => [...prev, formulario]);
    setFormulario({
      nombre: '',
      area: 'Electricidad',
      zona: 'Madrid Río',
      trabajo: '',
      lugar: '',
      fecha: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Parte Diario</h1>
      <form onSubmit={manejarEnvio} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <input name="nombre" value={formulario.nombre} onChange={manejarCambio} placeholder="Nombre" required />

        <select name="area" value={formulario.area} onChange={manejarCambio}>
          <option value="Electricidad">Electricidad</option>
          <option value="Fuentes Ornamentales">Fuentes Ornamentales</option>
        </select>

        <select name="zona" value={formulario.zona} onChange={manejarCambio}>
          {zonasPorArea[formulario.area].map(z => (
            <option key={z} value={z}>{z}</option>
          ))}
        </select>

        <input name="trabajo" value={formulario.trabajo} onChange={manejarCambio} placeholder="Trabajo" required />
        <input name="lugar" value={formulario.lugar} onChange={manejarCambio} placeholder="Lugar" required />
        <input name="fecha" value={formulario.fecha} onChange={manejarCambio} type="date" />

        <button type="submit">Enviar</button>
      </form>

      <hr style={{ margin: '2rem 0' }} />

      <h2>Partes enviados</h2>
      <table border={1} cellPadding={6}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Área</th>
            <th>Zona</th>
            <th>Trabajo</th>
            <th>Lugar</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {partes.map((parte, index) => (
            <tr key={index}>
              <td>{parte.nombre}</td>
              <td>{parte.area}</td>
              <td>{parte.zona}</td>
              <td>{parte.trabajo}</td>
              <td>{parte.lugar}</td>
              <td>{parte.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
