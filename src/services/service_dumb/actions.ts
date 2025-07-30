import axios from "@/lib/axios";

import { DumbEndPoints } from "./constants";
import { ICreateDumbPayload, IQueryDumbHistory } from "./types";

export const DumbActions = {
  GetDetails: async (id: string) => {
    const r = await axios.get<any>(DumbEndPoints.Details(id));
    return r.data;
  },

  GetHistory: async (query: IQueryDumbHistory) => {
    const r = await axios.get<any>(DumbEndPoints.History, { params: query });
    return r.data;
  },

  CreateDumb: async (payload: ICreateDumbPayload) => {
    const r = await axios.post<any>(DumbEndPoints.Create, payload);
    return r.data;
  },
};
