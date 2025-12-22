import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  const appServiceMock: Partial<AppService> = {
    getHello: () => 'Hello World!',
  };

  beforeEach(() => {
    appController = new AppController(appServiceMock as AppService);
  });

  it('should return "Hello World!"', () => {
    expect(appController.getHello()).toBe('Hello World!');
  });
});
