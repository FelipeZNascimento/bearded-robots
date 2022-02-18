export type TStep = {
    Command: string;
    Value: string;
};
export type Test = {
    name: string;
    ID?: string; //auto generated
    id: string; //hash for free anti-duplication
    Device: string;
    Steps: TStep[];
};

export type TKey = {
    command: string;
    value: string;
};

export type KeyValue = {
    key: string;
    value: string;
};

export type TestResult = {
    StartTime: string;
    EndTime: string;
    Screenshots: { ActualScreenshot: string; Similarity: string }[];
    TestId: string;
};

export type TestRun = {
    results?: TestResult;
    test: Test;
    status: string;
    TestId: string;
};

export type ScreenshotComparison = {
    expected: string;
    result: string;
    similarity: string;
};
