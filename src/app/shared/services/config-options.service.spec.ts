import { ConfigOptionsService } from './config-options.service';

const mockOptions = {
  login: 'user',
  email: 'user@email.ru',
  phoneNumber: 987654321,
  name: 'Jhon'
};

describe('Service: ConfigOptions', () => {
  let service: ConfigOptionsService;

  beforeEach(() => {
    service = new ConfigOptionsService();
  });

  it('getConfigOptions should return NULL', () => {
    expect(service.getConfigOptionsById(1)).toBe(null);
  });

  it('getConfigOptionsById must return the object added by the setConfigOptions method', () => {
    const optionsID = service.setConfigOptions(mockOptions);
    expect(service.getConfigOptionsById(optionsID)).toEqual({...mockOptions, id: optionsID});
  });
});
