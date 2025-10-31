import 'jest-preset-angular/setup-jest';

// Mock para Module Federation
Object.defineProperty(global, 'require', {
  value: {
    context: (): any => ({
      keys: () => [],
      resolve: (id: string) => id,
      id: 'mock-module-federation'
    })
  }
});