export interface ResponseData<T> {
  success: boolean
  message: string
  data: T
}

export interface PaginationProps {
  page: number
  pageSize: number
  total: number
  onChange?: (page: number, pageSize?: number) => void
}

export interface Page<T> {
  records: T[]
  page: number
  pageSize: number
  total: number
}

export interface PageResponseData<T> {
  current: number
  size: number
  records: T[]
  total: number
}

export function pageFromResponseData<T, ResponseDataType>(
  data: PageResponseData<ResponseDataType>,
  responseDataMapper: (r: ResponseDataType) => T
): Page<T> {
  return {
    records: data.records.map(responseDataMapper),
    page: data.current,
    pageSize: data.size,
    total: data.total,
  }
}
