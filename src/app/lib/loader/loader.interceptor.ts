import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { loaderService } from './loader.service';
import { debounceTime, finalize, Subject, switchMap, tap } from 'rxjs';

export function loaderInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const loaderSvc = inject(loaderService);
  /* OPTION 1: Without Debounce
  loaderSvc.show();
  return next(req).pipe(finalize(() => loaderSvc.hide()));
  */

  /*•å
    OPTION 2 : With Debounce (con retraso)
  */
  const loaderSubject = new Subject<boolean>();
  return next(req).pipe(
    switchMap(() => next(req)),
    debounceTime(300),
    tap(() => loaderSvc.show()),
    finalize(() => {
      loaderSvc.hide();
      loaderSubject.complete();
    }),
  );
}
