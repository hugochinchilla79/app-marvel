import development from './development';
import production from './production';

const commons = {
  api: {
    baseUrl: '',
    getAllies: {
      path: '/v1/simype/aliado',
      params: ['page', 'per-page', 'sort'],
    },
    postAllies: {
      path: '/v1/simype/aliado',
    },
    departamento: {
      path: '/v1/departamento',
    },
    municipio: {
      path: '/v1/municipio',
      params: ['departamento_id'],
    },
    validar: {
      path: '/v1/usuario/validar',
    },
    empleado: {
      path: '/v1/empleado',
    },
    comite: {
      path: '/v1/simype/comite',
    },
    comiteEmpleado: {
      path: '/v1/simype/comiteempleado',
    },
    integrante: {
      path: '/v1/simype/integrante',
    },
  },
};
const config = process.env.PROD ? production(commons) : development(commons);

export default Object.freeze(Object.assign({}, config));
