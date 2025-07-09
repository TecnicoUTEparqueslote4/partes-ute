'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

type Parte = {
  nombre: string;
  area: string;
  zona: string;
  trabajo: string;
  lugar: string;
  fecha: string;
};

export default function PartesPage() {
  const [formulario, setFormulario] = useState<Parte>({
    nombre: '',
    area: 'Electricidad',
    zona: 'Madrid Río',
    trabajo: '',
    lugar: '',
    fecha: new Date().toISOString().split('T')[0],
  });

  const [partes, setPartes] = useState<Parte[]>([]);

  const zonasPorArea: Record<string, string[]> = {
    Electricidad: ['Madrid Río', 'Parque Lineal', 'Plaza España'],
    'Fuentes Ornamentales': ['Madrid Río', 'Parque Lineal', 'Plaza España'],
  };

  const manejarCambio = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const manejarEnvio = (e: FormEvent) => {
    e.preventDefault();
    setPartes((prev) => [...prev, formulario]);
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
    <main style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <form
        onSubmit={manejarEnvio}
        style={{
          background: '#f9f9f9',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          width: '320px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Parte de Trabajo</h2>

        <input
          name="nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
          placeholder="Nombre"
          required
          style={inputStyle}
        />

        <select
          name="area"
          value={formulario.area}
          onChange={manejarCambio}
          style={inputStyle}
        >
          <option value="Electricidad">Electricidad</option>
          <option value="Fuentes Ornamentales">Fuentes Ornamentales</option>
        </select>

        <select
          name="zona"
          value={formulario.zona}
          onChange={manejarCambio}
          style={inputStyle}
        >
          {zonasPorArea[formulario.area].map((z) => (
            <option key={z} value={z}>
              {z}
            </option>
          ))}
        </select>

        <input
          name="lugar"
          value={formulario.lugar}
          onChange={manejarCambio}
          placeholder="Lugar"
          required
          style={inputStyle}
        />

        <textarea
          name="trabajo"
          value={formulario.trabajo}
          onChange={manejarCambio}
          placeholder="Trabajo realizado"
          required
          rows={3}
          style={{ ...inputStyle, resize: 'vertical' }}
        />

        <input
          name="fecha"
          value={formulario.fecha}
          onChange={manejarCambio}
          type="date"
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            background: '#2196f3',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Enviar Parte
        </button>
      </form>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '8px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '14px',
};
