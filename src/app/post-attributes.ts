export default interface PostAttributes {
  title: string;  // 标题
  description: string;
  slug: string;   // path
  date: string;   // 日期
  tags: string[];       // 标签
  categories: string;     // 分类
  pinned?: boolean;      // 是否置顶
}
