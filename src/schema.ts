export enum EDIT_RECORD_TYPE {
    MATCH = 'match',
    ADD = 'add',
    REPLACE = 'replace',
    DELETE = 'delete',
};

export enum NEIGHBOR_LABEL {
    UPPER_LEFT = 'upperLeftNeighbor',
    UPPER = 'upperNeighbor',
    LEFT = 'leftNeighbor',
}

export interface IEditRecordDetails {
    index: number;
    value: string;
}

export interface IEditRecord {
    type: EDIT_RECORD_TYPE;
    str1: IEditRecordDetails;
    str2: IEditRecordDetails;
    transformIndex: number;
}

export interface IEditDistanceOptions {
    returnEditRecords?: boolean;
}

export interface IEditDistanceResult {
    distance: number;
    records?: Array<IEditRecord>;
}