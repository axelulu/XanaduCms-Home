export const ACCESS_TOKEN = 'ACCESS-TOKEN'; // 用户token
export const CURRENT_USER = 'CURRENT-USER'; // 当前用户信息

interface BaseResponseType {
    CreatedAt: Date;
    UpdatedAt: Date;
}

export type CategoryItem = {
    name: string;
    ID: string;
    slug: string;
    icon: string;
    iconType: string;
    sort: string;
    children: Array<CategoryItem>
}

export type ImgItem = {
    name: string;
    url: string;
    tag: string;
    key: string;
    downloadRelation: string;
    uuid: string;
    type: string
}

export interface CategoryList {
    page: string;
    pageSize: string;
    pageCount: string;
    list: Array<CategoryItem>;
}

export interface ImgList {
    page: string;
    pageSize: string;
    pageCount: string;
    list: Array<ImgItem>;
}

export interface FetchResponseType<T = any> {
    code: number;
    result: T;
    message: string;
}

export interface PageResponseType<T> {
    records: Array<T>,
    current: number;
    pageSize: number;
    total: number;
}

export interface basic {
    title: string;
    keyword: string;
    desc: string;
    color: string;
    icon: string;
    background: string;
    logo: string;
    createTime: string;
}

export interface url {
    name: string;
    url: string;
}

export interface footer {
    notice: string;
    contact: string;
    about: string;
    links: Array<url>;
    friendsLinks: Array<url>;
}

export interface Settings {
    basic: basic;
    footer: footer
}

export interface categoryPage {
    post: Array<postItem>;
    category: Array<CategoryItem>
}

export interface CategoryPostList {
    list: categoryPage;
    PageCount: number;
    Page: number;
    PageSize: number;
}

export interface SearchPostList {
    list: Array<postItem>;
    PageCount: number;
    Page: number;
    PageSize: number;
}

export interface CommentList {
    list: Array<commentItem>;
    PageCount: number;
    Page: number;
    PageSize: number;
}

export interface PostList {
    list: Array<postItem>;
    PageCount: number;
    Page: number;
    PageSize: number;
}

export interface PostItem {
    post: postItem;
    followCount: number;
    fansCount: number;
    postCount: number;
    commentCount: number;
    authorPosts: Array<postItem>;
    users: Array<userMeta>;
    comments: Array<commentItem>;
}

export interface commentItem extends BaseResponseType {
    id: string;
    postId: string;
    parentId: number;
    formUid: string;
    toUid: string;
    content: string;
    type: string;
    postRelation: PostItem;
}

export interface downloadItem extends BaseResponseType {
    id: string;
    postId: string;
    price: number;
    priceType: string;
    name: string;
    url: string;
    extract_pwd: string;
    unpack_pwd: string;
}

export interface starItem extends BaseResponseType {
    id: string;
    postId: string;
    uuid: string;
}

export interface collectItem extends BaseResponseType {
    id: string;
    postId: string;
    uuid: string;
}

export interface postItem extends BaseResponseType {
    title: string;
    postId: string;
    exerpt: string;
    content: string;
    category: number;
    author: string;
    cover: string;
    type: string;
    video: [];
    music: [];
    commentStatus: string;
    status: string;
    view: number;
    star: number;
    AuthorRelation: userMeta;
    CategoryRelation: category;
    topic: Array<topicItem>;
    commentRelation: Array<commentItem>;
    downloadRelation: Array<downloadItem>;
    starRelation: Array<starItem>;
    collectRelation: Array<collectItem>;
}

export interface topicItem extends BaseResponseType {
    ID: number;
    value: string;
    label: string;
    icon: string;
    sort: number;
}

export interface userMeta extends BaseResponseType {
    uuid: string;
    userName: string;
    nickName: string;
    desc: string;
    avatar: string;
    headerImg: number;
    sex: string;
    cash: string;
    credit: string;
    exp: string;
    phone: string;
    email: string;
    authorityId: string;
    authority: authority;
    authorities: Array<authority>;
}

export interface authority extends BaseResponseType {
    authorityName: string;
    authorityId: string;
}

export interface category extends BaseResponseType {
    ID: number;
    parentId: number;
    slug: string;
    name: string;
    icon: string;
    iconType: number;
    sort: number;
    children: category;
}

export interface content extends BaseResponseType {
    slug: string;
    name: string;
    icon: string;
    iconType: number;
    sort: number;
    style: number;
    topic: Array<topicItem>;
    post: Array<postItem>;
}

export interface HomeList {
    popular: postItem[];
    recommend: postItem[];
    content: content[];
}

export interface TopicPostList {
    list: topicPostList;
    PageCount: number;
    Page: number;
    PageSize: number;
}

export interface topicPostList {
    value: string;
    label: string;
    icon: string;
    sort: string;
    post: Array<postItem>;
}

export interface FollowList {
    list: Array<followList>;
    PageCount: number;
    Page: number;
    PageSize: number;
}

export interface followList {
    toUid: string;
    formUid: string;
    formUidRelation: userMeta;
    toUidRelation: userMeta;
}

export interface Captcha {
    captchaImg: string;
    captchaId: string;
}

export interface Login {
    token: string;
    userInfo: userMeta;
}
