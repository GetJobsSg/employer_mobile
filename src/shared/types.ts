export interface ICommonJobRequest {
  jobId: number;
}

export interface IApiResponse<T> {
  data: T;
}

export interface ICommonPayload<T> {
  data: T;
  error: null | any;
}
