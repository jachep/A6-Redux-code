import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Md5 } from 'ts-md5/dist/md5';

import { MarvelService } from "../services/marvel.service";
import { environment } from "../../../environments/environment";

@Injectable()
export class MarvelInterceptor implements HttpInterceptor {

  constructor(private marvelService: MarvelService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf(this.marvelService.BASE_URL) === 0) {
      let ts = new Date().getTime().toString();
      request = request.clone({
        params: request.params
        .set('ts', ts)
        .set('apikey', environment.marvel.public)
        .set('hash', Md5.hashStr(ts + environment.marvel.private + environment.marvel.public).toString())
      });
    }
    return next.handle(request);
  }
}
