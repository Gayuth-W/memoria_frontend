import { HttpInterceptorFn } from '@angular/common/http';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = localStorage.getItem('api_key');
  if (apiKey) {
    const cloned = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    return next(cloned);
  }
  return next(req);
};