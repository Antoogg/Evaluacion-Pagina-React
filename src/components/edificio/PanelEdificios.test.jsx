import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PanelEdificios from './PanelEdificios';

const EDIFICIOS = [
    { id: 'ED001', nombre: 'Torre Central' },
    { id: 'ED002', nombre: 'Edificio Los Condes' }
];

const DATOS = {
    ED001: [
        { nombre: 'Juan Pérez', rut: '223162485', estado: 'Dentro', hora: '08:30' },
        { nombre: 'María Gómez', rut: '719676766', estado: 'Fuera', hora: '12:15' },
        { nombre: 'Carlos Silva', rut: '267824045', estado: 'Dentro', hora: '09:05' },
    ],
};

function renderizar(props = {}) {
    const onToggle = vi.fn();
    const resultado = render(
        <PanelEdificios edificios={EDIFICIOS} datos={DATOS} idAbierto='ED001' onToggle={onToggle} {...props} />
    );
    return { onToggle, ...resultado };
}

describe('PanelEdificios', () => {
    it('muestra encabezado por edificio', () => {
        renderizar();
        expect(screen.getByRole('button', { name: /ED001.*Torre Central/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /ED002.*Edificio Los Condes/i })).toBeInTheDocument();
    });

    it('cuenta solo las personas que estén adentro', () => {
        renderizar();
        expect(screen.getByText('2 dentro')).toBeInTheDocument();
        expect(screen.getByText('0 dentro')).toBeInTheDocument();
    });

    it('marca como expandido solo al edificio idAbierto', () => {
        renderizar({ idAbierto: 'ED002' });
        expect(screen.getByRole('button', { name: /ED001/i })).toHaveAttribute('aria-expanded', 'false');
        expect(screen.getByRole('button', { name: /ED002/i })).toHaveAttribute('aria-expanded', 'true');
    });

    it('clase "show" al contenido del edificio abierto', () => {
        const { container } = renderizar();
        const paneles = container.querySelectorAll('.accordion-collapse');
        expect(paneles[0]).toHaveClass('show');
        expect(paneles[1]).not.toHaveClass('show');
    });

    it('llama onToggle con id del edificio al hacer clic', async () => {
        const user = userEvent.setup();
        const { onToggle } = renderizar();
        await user.click(screen.getByRole('button', { name: /ED002/i }));
        expect(onToggle).toHaveBeenCalledTimes(1);
        expect(onToggle).toHaveBeenCalledWith('ED002');
    });

    it('muestra las personas del edificio y un mensaje vacio para los que no tengan', () => {
        renderizar();
        expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
        expect(screen.getByText('Sin registros de personas')).toBeInTheDocument();
    });
});