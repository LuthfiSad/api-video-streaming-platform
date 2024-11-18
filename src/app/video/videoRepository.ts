import { prisma } from "../../config/prismaConfig";
import { IFilterVideo, VideoResponseBodyDTO } from "./videoTypes";

// Mengambil daftar pesanan
export const getVideo = async ({
  page,
  perPage,
  search,
  categoryId,
  uploaderId,
}: IFilterVideo) => {
  return await prisma.video.findMany({
    where: {
      video: {
        title: {
          contains: search,
          mode: "insensitive",
        },
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
      category: {
        id: categoryId,
      },
      uploader: {
        id: uploaderId,
      },
    },
    videoBy: {
      createdAt: "desc",
    },
    take: perPage,
    skip: (Number(page) - 1) * Number(perPage),
  });
};

// Menghitung jumlah pesanan
export const getVideoCount = async ({
  search,
  categoryId,
  uploaderId,
}: IFilterVideo) => {
  return await prisma.video.count({
    where: {
      video: {
        title: {
          contains: search,
          mode: "insensitive",
        },
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
      category: {
        id: categoryId,
      },
      uploader: {
        id: uploaderId,
      },
    },
  });
};

// Mengambil pesanan berdasarkan ID
export const getVideoById = async (id: string) => {
  return await prisma.video.findFirst({
    where: {
      id,
    },
  });
};

// Membuat pesanan
export const createVideo = async (data: VideoResponseBodyDTO) => {
  return await prisma.video.create({
    data: {
      title: data.title as string,
      description: data.description as string,
      thumbnailUrl: data.thumbnailUrl as string,
      videoUrl: data.videoUrl as string,
      category: data.category as string,
      uploader: data.uploader as string,
      views: 0,
      likes: 0,
    },
  });
};

// Memperbarui pesanan
export const updateVideo = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    thumbnailUrl?: string;
    category?: string;
    views?: number;
    likes?: number;
  }
) => {
  return await prisma.video.update({
    where: {
      id,
    },
    data,
  });
};

// Menghapus pesanan
export const deleteVideo = async (id: string) => {
  return await prisma.video.delete({
    where: {
      id,
    },
  });
};