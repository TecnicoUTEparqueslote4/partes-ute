'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

type Parte = {
  nombre: string;
  area: string;
  zona: string;
  trabajo: string;
  lugar: string;
  fecha: string;
};

const AREAS = [
  'Electricidad',
  'Fuentes Ornamentales',
  'Pavimentos',
  'Viales y terrizos',
  'Elementos de obra civil',
  'Estructuras',
  'Pasarelas',
  'Vallado',
  'Red de saneamiento',
  'Mobiliario Urbano',
  'Cartelería y señalización',
  'Edificios',
];

const ZONAS = ['Madrid Río', 'Parque Lineal', 'Plaza España'];

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

  const exportarExcelPorAño = () => {
    // Agrupar partes por año
    const partesPorAño: Record<string, Parte[]> = {};

    partes.forEach((parte) => {
      const año = new Date(parte.fecha).getFullYear().toString();
      if (!partesPorAño[año]) partesPorAño[año] = [];
      partesPorAño[año].push(parte);
    });

    Object.entries(partesPorAño).forEach(([año, partesDelAño]) => {
      const libro = XLSX.utils.book_new();

      AREAS.forEach((area) => {
        const datosPorZona: any[][] = [];

        // Encabezado
        const encabezadoZona = ZONAS.flatMap((zona) => [zona + ' - Trabajo', zona + ' - Lugar']);
        datosPorZona.push(encabezadoZona);

        // Filas (cada fila contiene trabajo/lugar por zona)
        const maxFilas = Math.max(
          ...ZONAS.map(
            (zona) =>
              partesDelAño.filter((p) => p.area === area && p.zona === zona).length
          )
        );

        for (let i = 0; i < maxFilas; i++) {
          const fila = ZONAS.flatMap((zona) => {
            const partesZona = partesDelAño.filter((p) => p.area === area && p.zona === zona);
            return partesZona[i] ? [partesZona[i].trabajo, partesZona[i].lugar] : ['', ''];
          });
          datosPorZona.push(fila);
        }

        const hoja = XLSX.utils.aoa_to_sheet(datosPorZona);
        XLSX.utils.book_append_sheet(libro, hoja, area.slice(0, 31)); // máximo 31 caracteres
      });

      const buffer = XLSX.write(libro, { bookType: 'xlsx', type: 'array' });
      saveAs(new Blob([buffer]), `partes_${año}.xlsx`);
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
          {AREAS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>

        <select
          name="zona"
          value={formulario.zona}
          onChange={manejarCambio}
          style={inputStyle}
        >
          {ZONAS.map((z) => (
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

        {partes.length > 0 && (
          <button
            type="button"
            onClick={exportarExcelPorAño}
            style={{
              background: '#4caf50',
              color: 'white',
              padding: '10px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Exportar Excel por Año
          </button>
        )}
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
