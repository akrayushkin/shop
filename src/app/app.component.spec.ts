/**
 * Shallow Test
 */
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterLinkStubDirective } from './utils/testing-helpers';
import { AppSettingsService } from './shared/services';

const appSettingsServiceeMock = {
  appConfig: { darkTheme: false }
};

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let links: RouterLinkStubDirective[];
  let linkDes: DebugElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        RouterLinkStubDirective
      ],
      providers: [
        { provide: AppSettingsService, useValue: appSettingsServiceeMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Находим DebugElements с помощью директивы RouterLinkStubDirective
    // Для поиска можно использовать не только By.css, но и By.directive
    linkDes = fixture.debugElement.queryAll(
      By.directive(RouterLinkStubDirective)
    );

    // Получаем экземплры директив с помощью DebugElement инджектора
    // Ангуляр всегда добавляет директивы к инджектору компонента
    links = linkDes.map(
      d => d.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective
    );
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Amazing store'`, () => {
    expect(component.title).toBe('Amazing store');
  });

  it('can get RouterLinks from template', () => {
    expect(links.length).toBe(1, 'should have 1 link');
    expect(links[0].linkParams).toBe(
      '/home',
      'Link should go to Home'
    );
  });

  it('can click Home link in template', () => {
    const homeLinkDe = linkDes[0];
    const homeLink = links[0];

    expect(homeLink.navigatedTo).toBeNull(
      'link should not have navigated yet'
    );

    homeLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(homeLink.navigatedTo).toBe('/home');
  });
});
