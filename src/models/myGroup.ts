import {Item} from "@/models/myItem";

export interface Group {
    groupId: string;
    groupName: string;
    userOwnerUUID: string;
    userUUIDs: string[];
    products: Item[];
}
