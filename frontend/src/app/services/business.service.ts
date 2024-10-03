import { Injectable, Injector } from '@angular/core';
import { SERVICES } from 'src/environments/service';
import { APIService } from './api.service';
import { URLParam } from '../core/interfaces/url-param.interface';

@Injectable({
  providedIn: 'root',
})
export class BusinessService extends APIService {
  constructor(injector: Injector) {
    super(injector, SERVICES.apiGateway.url);
  }

  methodGet<IResponse, IQuery>(
    url: string | URLParam,
    query?: IQuery
  ): Promise<IResponse> {
    return this.get<IResponse, IQuery>({
      url,
      query,
    });
  }

  methodPost<IResponse, IRequest>(
    url: string | URLParam,
    request?: IRequest
  ): Promise<IResponse> {
    return this.post<IResponse, IRequest>({
      url,
      request,
    });
  }

  methodPatch<IResponse, IRequest>(
    url: string | URLParam,
    request?: IRequest
  ): Promise<IResponse> {
    return this.patch<IResponse, IRequest>({
      url,
      request,
    });
  }

  methodDelete<IResponse, IQuery>(
    url: string | URLParam,
    query?: IQuery
  ): Promise<IResponse> {
    return this.delete<IResponse, IQuery>({
      url,
      query,
    });
  }

  // methodGetReport<IQuery = {}>(url: string | URLParam, query?: IQuery) {
  //   return this.getBlob<IQuery>({
  //     url,
  //     query,
  //   });
  // }

  // methodPostReport<IRequest = {}>(url: string | URLParam, request?: IRequest) {
  //   return this.postBlob<IRequest>({
  //     url,
  //     request,
  //   });
  // }
}
