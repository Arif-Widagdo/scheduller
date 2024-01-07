export type RESPONSE_STATUS_CODE = 'VERSION_UPDATE' | string;

export type ResponseProcessor<Data> = { data: Data; message: string; status: boolean; code: RESPONSE_STATUS_CODE };
