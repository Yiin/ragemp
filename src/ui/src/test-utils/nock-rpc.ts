import rpc from 'rage-rpc';

type Replies = {
  [method: string]: {
    [key: string]: () => Promise<any>;
  };
};

type NockRPC = {
  [method: string]: (key: string) => {
    resolve: (data: any) => void;
    reject: (data: any) => void;
  };
};

const methods = [
  'call',
  'callClient',
  'callServer',
];
const replies: Replies = {};
const nockRPC: NockRPC = {};

for (const method of methods) {
  replies[method] = {};

  // Override rpc method with our mocked one
  // @ts-ignore
  rpc[method] = async key => {
    if (replies[method][key]) {
      return replies[method][key]();
    }
    throw new Error(`${method} ${key} was not mocked`)
  };

  nockRPC[method] = key => ({
    resolve(data) {
      replies[method][key] = () => new Promise(resolve => resolve(data));
    },
    reject(data) {
      replies[method][key] = () => new Promise((_, reject) => reject(data));
    },
  });
}

export {
  nockRPC,
};
