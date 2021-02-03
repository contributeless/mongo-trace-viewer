import { OplogListResponse } from "../models/OplogListResponse";
import { HttpUtility } from "./HttpUtility";

export class OplogService {
    public static getOplog(): Promise<OplogListResponse> {
        return HttpUtility.get(HttpUtility.makeUrl("db"));
    }
}