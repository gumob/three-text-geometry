/**
 * Reference: https://github.com/sPHENIX-Collaboration/phoenix/blob/ca552cfc966aa38475f8c3463ca1688c49a91edf/packages/phoenix-event-display/src/tests/helpers/webgl-mock.ts
 */

import THREE from 'three';

jest.mock('three', () => {
  const THREE = jest.requireActual('three');
  return {
    ...THREE,
    WebGLRenderer: jest.fn().mockReturnValue({
      domElement: document.createElement('div'),
      setClearColor: jest.fn(),
      setSize: jest.fn(),
      render: jest.fn(),
      getSize: jest.fn().mockReturnValue({ width: 100, height: 100 }),
      getPixelRatio: jest.fn(),
    }),
  };
});

export default THREE;
