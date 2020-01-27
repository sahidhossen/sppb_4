import Registry from './registry';
export {createSPPBStore} from './createStore';
export { default as withSelect } from './withSelect';
export { default as withDispatch } from './withDispatch';
export { default as RegistryProvider, RegistryConsumer } from './registryProvider';

export const store = Registry.store;
export const dispatch = store.dispatch;
export const subscribe = Registry.subscribe;
export const select = Registry.select;
