import {createContext} from 'react';
import Registry from './registry';

const {Consumer, Provider} = createContext(Registry)

export const RegistryConsumer = Consumer;

export default Provider;
