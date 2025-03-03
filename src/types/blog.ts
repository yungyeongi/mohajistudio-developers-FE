// src/types/blog.ts

// 게시글 상태 enum
export enum PostStatus {
  DRAFT = 'DRAFT', // 임시저장
  PUBLISHED = 'PUBLISHED', // 발행됨
}

// 미디어 파일 타입 enum
export enum ContentType {
  IMAGE_PNG = 'IMAGE_PNG',
  IMAGE_JPEG = 'IMAGE_JPEG',
  IMAGE_GIF = 'IMAGE_GIF',
  VIDEO_MP4 = 'VIDEO_MP4',
}

// 사용자 정보 타입
export interface User {
  id: string; // UUID
  username: string;
  profileImage?: string;
}

// 태그 타입
export interface Tag {
  id: string; // UUID
  name: string;
}

// 미디어 파일 타입
export interface MediaFile {
  id: string; // UUID
  createdAt: string;
  updatedAt: string;
  userId: string;
  fileName: string;
  originalFileName: string;
  contentType: ContentType;
  size: number;
}

// 게시글 작성 시 필요한 데이터 타입
export interface WritePostData {
  title: string; // 최소 1글자, 최대 100글자
  content: string;
  summary?: string; // optional, 최대 200자
  thumbnail?: string;
  tags: string[];
  status: PostStatus;
  mediaFiles?: MediaFile[]; // optional
}

// 게시글 응답 데이터 타입 (DTO 기반)
export interface Post {
  id: string; // UUID
  user: User;
  title: string;
  summary?: string; // optional, 최대 200자
  thumbnail?: string;
  status: PostStatus;
  publishedAt?: string; // ISO 날짜 문자열, optional
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  content: string;
  viewCount: number;
  mediaFiles?: MediaFile[]; // optional
}

// 게시글 목록 조회시 사용할 타입
export interface PostListItem {
  id: string;
  title: string;
  summary?: string;
  thumbnail?: string;
  user: User;
  publishedAt?: string;
  tags: Tag[];
  viewCount: number;
}

// 페이지네이션을 위한 타입
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// 게시글 필터링/정렬 옵션
export interface PostFilters {
  tag?: string;
  username?: string;
  status?: PostStatus;
  sortBy?: 'latest' | 'popular'; // 최신순 | 인기순
}

/* 게시글 미디어 파일 업로드 관련 에러 코드 상수 */
export const MEDIA_ERROR_CODES = {
  // 파일을 찾을 수 없는 경우: 400
  FILE_NOT_FOUND: 'MF0001',

  // 스토리지 업로드 실패: 500
  STORAGE_UPLOAD_FAILED: 'MF0002',

  // 파일 형식이 잘못된 경우: 400
  INVALID_FILE_FORMAT: 'MF0004',

  // 알 수 없는 유저: 404
  UNKNOWN_USER: 'U0001',

  INVALID_TOKEN: 'T0002',
} as const;

// TOC 아이템 타입
export interface TocItem {
  id: string;
  text: string;
  level: number; // h1 = 1, h2 = 2, h3 = 3
}

// 게시글 상세 페이지 props 타입
export interface BlogPostDetailProps {
  post: Post;
  tocItems: TocItem[];
  onBack: () => void;
  onShare: () => void;
}
