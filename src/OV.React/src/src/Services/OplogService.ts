import { OplogFilterRequest } from "../models/OplogFilterRequest";
import { OplogListResponse } from "../models/OplogListResponse";
import { PrefillResponse } from "../models/PrefillResponse";
import { HttpUtility } from "./HttpUtility";

export class OplogService {
    public static getOplog(filter: OplogFilterRequest): Promise<OplogListResponse> {
        return HttpUtility.post(HttpUtility.makeUrl("db"), filter);
    }

    public static prefill(): Promise<PrefillResponse> {
        return HttpUtility.get(HttpUtility.makeUrl("db/prefill"));
    }
}