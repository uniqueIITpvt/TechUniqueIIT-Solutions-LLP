export type JobStatus = 'draft' | 'published' | 'closed';
export type WorkplaceType = 'Remote' | 'Hybrid' | 'On-site';
export type EmploymentType =
  | 'Full-time'
  | 'Part-time'
  | 'Contract'
  | 'Internship'
  | 'Temporary';

export interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  workplaceType: WorkplaceType;
  employmentType: EmploymentType;
  salary: string;
  summary: string;
  description: string;
  requirements: string[];
  applyEmail: string;
  applyUrl: string;
  status: JobStatus;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface JobPayload {
  title: string;
  department: string;
  location: string;
  workplaceType: WorkplaceType;
  employmentType: EmploymentType;
  salary: string;
  summary: string;
  description: string;
  requirements: string[];
  applyEmail: string;
  applyUrl: string;
  status: JobStatus;
  expiresAt: string | null;
}

export interface JobApplication {
  _id: string;
  job: {
    _id: string;
    title: string;
    department: string;
  } | null;
  jobTitle: string;
  jobDepartment: string;
  name: string;
  email: string;
  phone: string;
  qualification: string;
  resumeOriginalName: string;
  resumeMimeType: string;
  resumeSize: number;
  createdAt: string;
  updatedAt: string;
}

export interface JobApplicationPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}