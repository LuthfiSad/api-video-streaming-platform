export interface VideoModelTypes {
  id?: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  category: string;
  uploader: string;
  views: number;
  likes: number;
  uploadDate: Date;
}

export interface VideoResponseBodyDTO {
  id?: string;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  category?: string;
  uploader?: string;
  views?: number;
  likes?: number;
  uploadDate?: Date;
}

export interface IFilterVideo {
  search?: string;
  page?: number;
  perPage?: number;
  uploaderId?: string;
  categoryId?: string;
}
