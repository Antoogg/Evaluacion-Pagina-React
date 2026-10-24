import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormularioMovimiento from './FormularioMovimiento';

const EDIFICIOS = [
    { id: 'ED001', nombre: 'Torre Central' },
    { id: 'ED002', nombre: 'Edificio Los Condes' }
];

function renderizar(props = {}) {
    const onRegistrar = vi.fn();
    const user = userEvent.setup();
    render(<FormularioMovimiento edificios={EDIFICIOS} onRegistrar={onRegistrar} {...props} />);
    return { onRegistrar, user };
}

async function completar(user, { nombre = 'Ana Torres', rut = '17252043K', edificio = 'ED002' } = {}) {
    if (nombre) await user.type(screen.getByLabelText('Nombre Completo'), nombre);
    if (rut) await user.type(screen.getByLabelText('RUT'), rut);
    if (edificio) await user.selectOptions(screen.getByLabelText('Edificio'), edificio);
}

const enviar = (user) => user.click(screen.getByRole('button', { name: 'Registrar Movimiento' }));

describe('Formulario Movimiento - Render', () => {
    it('muestra los campos y las opciones de edificio', () => {
        renderizar();
        expect(screen.getByLabelText('Nombre Completo')).toBeInTheDocument();
        expect(screen.getByLabelText('RUT')).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'ED001 - Torre Central' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'ED002 - Edificio Los Condes' })).toBeInTheDocument();
    });

    it('empieza en "entrada" sin marcar visitante', () => {
        renderizar();
        expect(screen.getByLabelText('Entrada')).toBeChecked();
        expect(screen.getByLabelText('Salida')).not.toBeChecked();
        expect(screen.getByRole('switch', { name: /visitante/i })).not.toBeChecked();
    });
});

describe('FormularioMovimiento - validacion', () => {
    it('muestra errores y no registra si el formulario está vacio', async () => {
        const { onRegistrar, user } = renderizar();
        await enviar(user);

        expect(screen.getByText('Tienes que agregar un nombre.')).toBeInTheDocument();
        expect(screen.getByText('Tienes que agregar un RUT.')).toBeInTheDocument();
        expect(screen.getByText('Tienes que escoger un edificio.')).toBeInTheDocument();
        expect(onRegistrar).not.toHaveBeenCalled();
    });

    it('marca los campos invalidos', async () => {
        const { user } = renderizar();
        await enviar(user);

        expect(screen.getByLabelText('Nombre Completo')).toHaveClass('is-invalid');
        expect(screen.getByLabelText('RUT')).toHaveClass('is-invalid');
        expect(screen.getByLabelText('Edificio')).toHaveClass('is-invalid');
    });

    it('rechaza un RUT que no tiene 9 caracteres', async () => {
        const { onRegistrar, user } = renderizar();
        await completar(user, { rut: '1725' });
        await enviar(user);

        expect(screen.getByText('El RUT debe tener 9 caracteres')).toBeInTheDocument();
        expect(onRegistrar).not.toHaveBeenCalled();
    });
});

describe('FormularioMovimiento - envio', () => {
    it('registra una entrada', async () => {
        const { onRegistrar, user } = renderizar();
        await completar(user, { nombre: 'Ana Torres  ', rut: '17252043K' });
        await enviar(user);

        expect(onRegistrar).toHaveBeenCalledTimes(1);
        expect(onRegistrar).toHaveBeenCalledWith({
            nombre: 'Ana Torres',
            rut: '17252043K',
            idEdificio: 'ED002',
            tipo: 'Entrada',
        });
    });

    it('registra una salida', async () => {
        const { onRegistrar, user } = renderizar();
        await completar(user);
        await user.click(screen.getByLabelText('Salida'));
        await enviar(user);

        expect(onRegistrar).toHaveBeenCalledWith(expect.objectContaining({ tipo: 'Salida' }));
    });

    it.each([
        ['Entrada', 'EntradaVisitante'],
        ['Salida', 'SalidaVisitante'],
    ])('%s + visitante => %s', async (accion, esperado) => {
        const { onRegistrar, user } = renderizar();
        await completar(user);
        await user.click(screen.getByLabelText(accion));
        await user.click(screen.getByRole('switch', { name: /visitante/i }));
        await enviar(user);

        expect(onRegistrar).toHaveBeenCalledWith(expect.objectContaining({ tipo: esperado }));
    });

    it('limpia nombre y RUT, pero conserva el edificio luego de registrar movimiento', async () => {
        const { user } = renderizar();
        await completar(user, { edificio: 'ED002' });
        await enviar(user);

        expect(screen.getByLabelText('Nombre Completo')).toHaveValue('');
        expect(screen.getByLabelText('RUT')).toHaveValue('');
        expect(screen.getByLabelText('Edificio')).toHaveValue('ED002');
    });

    it('quita los errores una vez que el envío es válido', async () => {
        const { user } = renderizar();
        await enviar(user);
        expect(screen.getByText('Tienes que agregar un nombre.')).toBeInTheDocument();

        await completar(user);
        await enviar(user);
        expect(screen.queryByText('Tienes que agregar un nombre.')).not.toBeInTheDocument();
    });
});