import axios, {AxiosError, AxiosResponse} from 'axios';

const request = axios.create({
  baseURL: process.env.REACT_APP_API_PATH,
  timeout: 15000,
});

/**
 * Problem Details Json Response
 * RFC-7807 https://tools.ietf.org/html/rfc7807
 */
export interface ServiceProblem {
  title: string;
  status: number;
  detail?: string;
}

/**
 * request error，include problem and response
 * for request error handling e.g. if (error instanceof ServiceError)
 */
export class ServiceError extends Error {
  problem: ServiceProblem;
  response: AxiosResponse;

  /**
   * ServiceError
   * @param problem: convert from AxiosResponse
   * @param response: AxiosResponse
   */
  constructor(problem: ServiceProblem, response: AxiosResponse) {
    super(problem.title);
    this.problem = problem;
    this.response = response;
  }
}

request.interceptors.response.use(response => response, (error) => {
  if (error && error.isAxiosError) {
    const response = (error as AxiosError).response;

    if (response && response.data !== undefined && response.data !== null) {
      const problem = response.data as ServiceProblem;
      throw new ServiceError(problem, response);
    }
  }

  throw error;
});

export default request;
