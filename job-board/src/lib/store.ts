import {writable} from 'svelte/store';
import type {JobDocument, LikedJob} from './Job/JobTypes';

type JobSearch = {
    jobs: JobDocument[];
    totalJobsAvailable: number;
    currentPage: number;
    totalPages: number;
    searchTerm: string;
};

export const jobStore = writable<JobSearch>({
    currentPage: 0,
    totalJobsAvailable: 0,
    jobs: [],
    totalPages: 0,
    searchTerm: '',
})

type CurrentUser = {
    likedJobs: LikedJob[];
    email: string;
}

export const currentUserStore = writable<CurrentUser>({
    likedJobs: [],
    email: ''
})
