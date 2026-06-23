import { HttpInterceptorFn } from '@angular/common/http';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = localStorage.getItem('api_key');
  console.log("Interceptor found API key:", apiKey);
  if (apiKey) {
    const cloned = req.clone({
      setHeaders: {
        'X-API-Key': apiKey
      }
    });
    return next(cloned);
  }
  return next(req);
};