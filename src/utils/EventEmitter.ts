type SUBSCRIBE_TYPES = 'logout' | 'networkError';

const subscribers: Record<SUBSCRIBE_TYPES, any> = {
  logout: () => {},
  networkError: () => {},
};

export const subscribe = (name: SUBSCRIBE_TYPES, handler: Function) => {
  subscribers[name] = handler;
};

export const unsubscribe = (name: SUBSCRIBE_TYPES) => {
  delete subscribers[name];
};

export const emit = (name: SUBSCRIBE_TYPES, ...args: any) => {
  if (subscribers[name] !== undefined) {
    subscribers[name](...args);
  }
};
