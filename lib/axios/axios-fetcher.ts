import axiosAuth from "./axios-auth";

const fetcher = (url: string) => axiosAuth(url).then((r: any) => r.data);

export default fetcher;
