export interface Comment {
  id: number;
  articleId: number;
  refId: number;
  name: string;
  nameHash: string;
  email: string | null;
  content: string;
  createdAt: Date;
}

export interface CommentResponseData {
  id: number;
  articleId: number;
  refId: number;
  name: string;
  nameHash: string;
  email: string | null;
  content: string;
  createdAt: string;
}

export function commentFromResponseData(data: CommentResponseData): Comment {
  return {
    id: data.id,
    articleId: data.articleId,
    refId: data.refId,
    name: data.name,
    nameHash: data.nameHash,
    email: data.email,
    content: data.content,
    createdAt: new Date(data.createdAt),
  }
}
