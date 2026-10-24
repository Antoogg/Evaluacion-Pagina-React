import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TablaPersonas from './TablaPersonas';

const DATOS = [
    { nombre: 'Juan Pérez', rut: '223162485', estado: 'Dentro', hora: '08:30' },
    { nombre: 'María Gómez', rut: '719676767', estado: 'Fuera', hora: '12:15' },
];

describe('TablaPersonas', () => {
    it('muestra los encabezados', () => {
        render(<TablaPersonas personas={DATOS} />);
        for (const titulo of ['Nombre', 'RUT', 'Estado', 'Hora']) {
            expect(screen.getByRole('columnheader', { name: titulo })).toBeInTheDocument();
        }

    });

    it('muesta una fila por persona con sus datos', () => {
        render(<TablaPersonas personas={DATOS} />);

        expect(screen.getAllByRole('row')).toHaveLength(3);
        expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
        expect(screen.getByText('719676767')).toBeInTheDocument();
        expect(screen.getByText('12:15')).toBeInTheDocument();

    });

    it('usa una clase distinta según su estado', () => {
        render(<TablaPersonas personas={DATOS} />);
        expect(screen.getByText('Dentro')).toHaveClass('badge-status-dentro');
        expect(screen.getByText('Fuera')).toHaveClass('badge-status-fuera');

    });

    it('Muestra un mensaje cuando la lista está vacía', () => {
        render(<TablaPersonas personas={[]} />);
        expect(screen.getByText('Sin registros de personas')).toBeInTheDocument();

    });
});
