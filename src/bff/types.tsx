

export type TStep = {
    Command: string;
    Value: string;
    ScreenshotCropAreas? :ScreenshotCropArea[];
}
export type Test = {
    name: string;
    ID ? : string; //auto generated
    id: string; //hash for free anti-duplication
    Device: string;
    Steps: TStep[];

}

export type TKey = {
    command: string;
    value: string;
}

export type KeyValue = {
    key:string;
    value:string;
}
export type ScreenshotCropArea = {
    ActualCroppedScreenshot: string; 
    OriginalCroppedScreenshot?: string; 
    Height:string; 
    Similarity:string; 
    Width:string;
    X:string;
    Y:string;
}
type ScreenshotResults = {
    ActualScreenshot: string;
    Similarity: string;
    ScreenshotCropAreas?: ScreenshotCropArea[];
}
export type TestResult = {
    StartTime: string;
    EndTime: string;
    Screenshots?: ScreenshotResults[];
    TestId: string;
}

export type TestRun = {
    results?: TestResult;
    test: Test;
    status:string;
    TestId: string;
}

export type ScreenshotComparison = {
    expected?:string;
    result?:string;
    similarity?:string;
}