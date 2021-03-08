import * as sagas from '../sagas';

/**
 * Runs each saga during app init
 * @param {array} sagaMiddleware 
 */
const initSagas = (sagaMiddleware) => {
    Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};

export default initSagas;