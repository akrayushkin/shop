import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, publish, refCount, retry, takeUntil } from 'rxjs/operators';
import { AppConfigModel } from '../../models/app-settings.model';
import { LocalStorageKeys, LocalStorageService } from './local-storage.service';

const DEFAULT_APP_SETTINGS = {
  darkTheme: false
};

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService implements OnDestroy {
  appConfig: AppConfigModel;

  private destroy$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.init();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  init(): void {
    const observer = {
      next: (appSettings) => {
        this.appConfig = appSettings;
        this.localStorageService.set(LocalStorageKeys.appSettings, JSON.stringify(appSettings));
      },
      error: (err: any) => {
        this.appConfig = DEFAULT_APP_SETTINGS;
        console.log('The app settings are set by default');
      }
    };
    this.fetchAppSetting()
      .pipe(takeUntil(this.destroy$))
      .subscribe(observer);
  }

  fetchAppSetting(): Observable<AppConfigModel> {
    const appConfig: AppConfigModel = JSON.parse(this.localStorageService.get(LocalStorageKeys.appSettings));
    if (appConfig) {
      return of(appConfig);
    }
    return this.http.get<AppConfigModel>('../../../assets/app-settings.json').pipe(
      retry(2),
      publish(),
      refCount(),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    this.appConfig = DEFAULT_APP_SETTINGS;
    console.log('The app settings are set by default');

    return throwError('Settings reset to default.');
  }
}
