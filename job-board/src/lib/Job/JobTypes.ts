interface BaseType {
    $id: string;
    $collection: string;
    $read: string[];
    $write: string[];
}

export interface JobDocument extends BaseType {
    title: string;
    companyName: string;
    applyLink: string;
    salary: string;
    createdAt: Date;
    skills: string[];
}

export interface LikedJobDocument extends BaseType {
    userId: string;
    jobId: string;
}

export interface LikedJob {
    job: JobDocument
    documentId: string
}

