<template>
    <NuxtLayout name="index">
        <div class="flex flex-col items-center">
            <div class="flex justify-start flex-wrap lg:w-3/4 xl:w-6/12 mt-4">
                <div class="w-9/12 pr-2" style="min-height: 800px;">
                    <div class="bg-white rounded-md overflow-hidden animate-fadeIn30">
                        <div class="text-center text-2xl text-gray-500 pt-4 pb-4 px-4">
                            {{ postItemMeta.title }}
                        </div>
                        <div class="flex flex-row justify-center pt-3 pb-3 border-y border-gray-100 bg-gray-50">
                            <NuxtLink :to="'/category/' + postItemMeta.CategoryRelation.slug"
                                class="text-xs text-gray-500 mr-4 cursor-pointer hover:bg-pink-50 hover:text-pink-400 duration-300">
                                <font-awesome-icon class="mr-1" icon="folder-open" />
                                <span class="mr-1">{{ postItemMeta.CategoryRelation.name }}</span>
                            </NuxtLink>
                            <div class="text-xs text-gray-500 mr-4">
                                <font-awesome-icon class="mr-1" icon="clock" />
                                <span>{{ formatDate(postItemMeta.UpdatedAt) }}</span>
                            </div>
                            <NuxtLink :to="'/author-' + postItemMeta.author + '/userInfo'"
                                class="text-xs text-gray-500 mr-4 cursor-pointer hover:bg-pink-50 hover:text-pink-400 duration-300">
                                <font-awesome-icon class="mr-1" icon="user-circle" />
                                <span>{{ postItemMeta.AuthorRelation.nickName }}</span>
                            </NuxtLink>
                            <div class="text-xs text-gray-500 mr-4">
                                <font-awesome-icon class="mr-1" icon="play-circle" />
                                <span>{{ postItemMeta.view }}</span>
                            </div>
                        </div>
                        <div class="p-4 break-words text-gray-500 text-sm" v-html="postItemMeta.content"></div>
                        <div class="flex flex-row">
                            <div class="pl-4 pb-4 flex flex-row">
                                <NuxtLink :to="'/topic/' + topicItem.value" v-for="(topicItem, v) in postItemMeta.topic"
                                    :key="v"
                                    class="border border-pink-400 text-xs text-pink-400 p-1 hover:bg-pink-400 hover:text-white duration-300 cursor-pointer mr-2">
                                    {{ topicItem.value }}
                                </NuxtLink>
                            </div>
                            <div class="pl-4 pb-4 flex flex-row flex-1">
                                <div
                                    class="w-6 h-6 bg-gray-500 text-white flex justify-center items-center text-xs hover:bg-pink-400 hover:text-white duration-300 cursor-pointer">
                                    <font-awesome-icon :icon="['fab', 'weibo']" />
                                </div>
                                <div
                                    class="w-6 h-6 bg-gray-500 text-white flex justify-center items-center text-xs hover:bg-pink-400 hover:text-white duration-300 cursor-pointer">
                                    <font-awesome-icon :icon="['fab', 'qq']" />
                                </div>
                                <div
                                    class="w-6 h-6 bg-gray-500 text-white flex justify-center items-center text-xs hover:bg-pink-400 hover:text-white duration-300 cursor-pointer">
                                    <font-awesome-icon :icon="['fab', 'weixin']" />
                                </div>
                                <div
                                    class="w-6 h-6 bg-gray-500 text-white flex justify-center items-center text-xs hover:bg-pink-400 hover:text-white duration-300 cursor-pointer">
                                    <font-awesome-icon :icon="['fas', 'bold']" />
                                </div>
                            </div>
                            <div
                                class="mr-4 w-16 h-6 bg-gray-500 text-white flex justify-center items-center text-xs hover:bg-pink-400 hover:text-white duration-300 cursor-pointer">
                                <font-awesome-icon class="mr-1" :icon="['fas', 'flag']" />
                                <span>报告</span>
                            </div>
                        </div>
                        <div class="px-4 py-3 border-t border-gray-100 bg-gray-50">
                            <ul class="text-xs text-gray-500 list-disc ml-4">
                                <li>本作品是由 ACG调查小队 会员 汔羽 的投递作品。</li>
                                <li>转载请务请署名并注明出处</li>
                                <li>
                                    禁止再次修改后发布；任何商业用途均须联系作者。如未经授权用作他处，作者将保留追究侵权者法律责任的权利。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div v-if="postItemMeta.downloadRelation && postItemMeta.downloadRelation.length > 0">
                        <div class="text-xs text-gray-500 mr-4 mt-4">
                            <font-awesome-icon class="mr-1" icon="cloud-download-alt" />
                            <span class="mr-1">下载链接</span>
                        </div>
                        <div class="bg-white rounded-md overflow-hidden animate-fadeIn30 mt-2 px-4 pt-2 pb-4">
                            <div v-if="!auth.loggedIn">
                                <NuxtGreenBtn @click="showLogin" class="w-full" value="登陆"
                                    :icon="['fas', 'circle-right']">
                                </NuxtGreenBtn>
                            </div>
                            <div v-else v-for="(item, index) in postDownload" :key="index"
                                class="bg-gray-100 pb-2 pt-6 px-4 mt-6 relative">
                                <div class="text-xs bg-green-500 text-white p-1 absolute -top-2">{{ item.name }}</div>
                                <div v-if="item.buy" class="flex flex-col">
                                    <div class="flex flex-row justify-center items-center mb-4">
                                        <div class="text-xs text-gray-500 w-2/12">
                                            <font-awesome-icon :icon="['fas', 'unlock-alt']" /><span
                                                class="ml-1">提取密码</span>
                                        </div>
                                        <div
                                            class="text-xs py-1 w-9/12 border-2 border-gray-200 text-center bg-white cursor-text duration-300 hover:border-pink-400">
                                            {{ item.extractPwd }}
                                        </div>
                                        <NuxtGreenBtn @click="copyText(item.extractPwd)" class="w-1/12" value=""
                                            :icon="['fas', 'copy']">
                                        </NuxtGreenBtn>
                                    </div>
                                    <div class="flex flex-row justify-center items-center mb-4">
                                        <div class="text-xs text-gray-500 w-2/12">
                                            <font-awesome-icon :icon="['fas', 'unlock-alt']" /><span
                                                class="ml-1">解压密码</span>
                                        </div>
                                        <div
                                            class="text-xs py-1 w-9/12 border-2 border-gray-200 text-center bg-white cursor-text duration-300 hover:border-pink-400">
                                            {{ item.unpackPwd }}
                                        </div>
                                        <NuxtGreenBtn @click="copyText(item.unpackPwd)" class="w-1/12" value=""
                                            :icon="['fas', 'copy']">
                                        </NuxtGreenBtn>
                                    </div>
                                    <div class="flex flex-row">
                                        <NuxtLink class="w-11/12" :to="item.url">
                                            <NuxtGreenBtn value="下载" :icon="['fas', 'cloud-download-alt']">
                                            </NuxtGreenBtn>
                                        </NuxtLink>
                                        <NuxtGreenBtn @click="copyText(item.url)" class="w-1/12" value=""
                                            :icon="['fas', 'copy']">
                                        </NuxtGreenBtn>
                                    </div>
                                </div>
                                <div v-else-if="item.buy === 0">
                                    <NuxtGreenBtn @click="buyDownload(item)" class="w-full"
                                        :value="'使用' + item.price + '积分购买'" :icon="['fas', 'sack-dollar']">
                                    </NuxtGreenBtn>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col mt-4 animate-fadeIn30">
                        <div class="text-xs text-gray-500 mr-4">
                            <font-awesome-icon class="mr-1" icon="heart" />
                            <span class="mr-1">推荐内容</span>
                        </div>
                        <div class="flex overflow-x-auto">
                            <div v-for="(post, v) in recommendPostList.list" :key="v" class="w-44 p-1.5 flex-shrink-0">
                                <Article :post="post" imgHeight="h-60"></Article>
                            </div>
                        </div>
                    </div>
                    <div @click="!auth.loggedIn ? showLogin() : showComment(null)"
                        class="bg-pink-400 rounded-md border-2 border-transparent hover:border-pink-500 hover:opacity-80 flex flex-row items-center p-2 cursor-pointer duration-300 mt-4">
                        <div class="h-8 w-8 rounded-full overflow-hidden mr-2">
                            <img v-lazy="auth.loggedIn ? auth.avatar : '/assets/img/avatar.jpeg'" class="object-cover"
                                alt="登陆">
                        </div>
                        <div class="text-lg text-white">{{ auth.loggedIn ? '参与讨论聊一聊～' : '登陆后才能评论哦～' }}</div>
                    </div>
                    <div class="flex flex-col mt-4 animate-fadeIn30">
                        <div class="text-xs text-gray-500 mr-4 mb-2">
                            <font-awesome-icon class="mr-1" icon="comments" />
                            <span class="mr-1">评论</span>
                        </div>
                        <div v-for="(comment, v) in postComment.list" :key="v"
                            class="flex flex-col bg-white p-2 rounded-md border-l-4 border-transparent hover:border-pink-400 duration-300">
                            <div class="flex flex-row w-full">
                                <div class="w-14">
                                    <img class="w-10 h-10 rounded-full object-cover" v-lazy="comment.FormUidRelation.avatar"
                                        alt="用户">
                                </div>
                                <div class="flex flex-col w-full">
                                    <div class="flex flex-row justify-between">
                                        <div class="flex flex-row">
                                            <NuxtLink :to="'/author-' + comment.FormUidRelation.uuid + '/userInfo'"
                                                class="text-xs h-5 text-pink-400 px-1 flex items-center bg-gray-200 rounded-sm mr-2">
                                                {{ comment.FormUidRelation.nickName }}</NuxtLink>
                                            <div
                                                class="text-xs h-5 text-white bg-yellow-500 px-1 flex items-center rounded-sm mr-2">
                                                {{
                                                        comment.FormUidRelation.authority.authorityName
                                                }}</div>
                                            <div v-if="comment.FormUidRelation.uuid === auth.userId"
                                                class="text-xs h-5 text-pink-400 bg-white border px-2 flex items-center border-pink-400 hover:bg-pink-400 hover:text-white duration-300 cursor-pointer rounded-sm mr-2">
                                                我</div>
                                            <div class="text-xs text-gray-500 px-1 rounded-sm">{{
                                                    formatDate(comment.UpdatedAt)
                                            }}</div>
                                        </div>
                                        <div class="flex flex-row">
                                            <div
                                                class="text-xs text-pink-400 bg-white border-l border-t border-b w-10 py-1 flex justify-center items-center border-pink-400 hover:bg-pink-400 hover:text-white duration-300 cursor-pointer">
                                                <font-awesome-icon :icon="['fas', 'thumbs-up']" />
                                            </div>
                                            <div @click="showComment(comment)"
                                                class="text-xs text-pink-400 bg-white border w-10 py-1 flex justify-center items-center border-pink-400 hover:bg-pink-400 hover:text-white duration-300 cursor-pointer mr-2">
                                                回复</div>
                                        </div>
                                    </div>
                                    <div class="text-xs text-gray-500 py-2 flex flex-row items-center"
                                        v-html="comment.content"></div>
                                    <div v-for="(item, index) in comment.children" :key="index">
                                        <div
                                            class="flex flex-row justify-between items-center bg-gray-100 pl-2 border-l-2 border-gray-300">
                                            <div class="text-xs text-gray-500 py-2 flex flex-row">
                                                <NuxtLink :to="'/author-' + item.FormUidRelation.uuid + '/userInfo'"
                                                    class="text-pink-400"> {{
                                                            item.FormUidRelation.nickName
                                                    }}</NuxtLink>: <div class="flex flex-row" v-html="item.content">
                                                </div>
                                            </div>
                                            <div @click="showComment(item)"
                                                class="text-xs text-pink-400 bg-gray-100 w-10 py-2 flex justify-center items-center hover:bg-pink-400 hover:text-white duration-300 cursor-pointer">
                                                回复</div>
                                        </div>
                                        <CommentContent @showComment="showComment" :item="item">
                                        </CommentContent>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-3/12 pl-2 relative">
                    <div class="flex flex-row justify-center animate-fadeIn30">
                        <NuxtLink :to="'/author-' + postItemMeta.author + '/userInfo'"
                            class="w-36 h-36 rounded-full absolute mt-4 border-4 border-white shadow-2xl cursor-pointer overflow-hidden">
                            <img class="w-36 h-36 object-cover"
                                v-lazy="runtimeConfig.public.assetsUrl + postItemMeta.AuthorRelation.avatar" alt="">
                        </NuxtLink>
                        <div class="w-full bg-white pt-24 mt-20 text-center rounded-md overflow-hidden">
                            <NuxtLink :to="'/author-' + postItemMeta.author + '/userInfo'"
                                class="text-lg text-pink-400 mb-2 hover:text-white hover:bg-pink-400 px-1 py-0.5 duration-300 cursor-pointer">
                                {{ postItemMeta.AuthorRelation.nickName }}</NuxtLink>
                            <div class="p-1">
                                <span class="text-xs text-white bg-green-500 px-1 py-0.5">{{
                                        postItemMeta.AuthorRelation.exp
                                }}</span>
                                <span class="text-xs text-white bg-yellow-500 px-1 py-0.5">{{
                                        postItemMeta.AuthorRelation.authority.authorityName
                                }}</span>
                            </div>
                            <div class="text-xs text-gray-500 pt-1">{{ postItemMeta.AuthorRelation.credit }}</div>
                            <div class="pb-4 pt-3">
                                <a
                                    class="bg-green-500 py-1 px-2 cursor-pointer text-xs text-white border-2 border-green-500">
                                    <font-awesome-icon class="mr-1" :icon="['fas', 'add']" />
                                    <span>加关注</span>
                                </a>
                                <a
                                    class="bg-white-500 py-1 px-2 cursor-pointer text-xs text-gray-400 border-2 border-gray-200">
                                    <font-awesome-icon class="mr-1" :icon="['fas', 'envelope']" />
                                    <span>站内信</span>
                                </a>
                            </div>
                            <div class="flex flex-row text-xs text-gray-400">
                                <NuxtLink :to="'/author-' + postItemMeta.author + '/follow'"
                                    class="py-2 bg-gray-50 flex-1 border-r border-t border-gray-100 cursor-pointer hover:bg-pink-400 hover:border-pink-400 hover:text-white duration-300">
                                    <div>{{ followCount }}</div>
                                    <div>关注</div>
                                </NuxtLink>
                                <NuxtLink :to="'/author-' + postItemMeta.author + '/fans'"
                                    class="py-2 bg-gray-50 flex-1 border-r border-t border-gray-100 cursor-pointer hover:bg-pink-400 hover:border-pink-400 hover:text-white duration-300">
                                    <div>{{ fansCount }}</div>
                                    <div>粉丝</div>
                                </NuxtLink>
                                <NuxtLink :to="'/author-' + postItemMeta.author + '/post'"
                                    class="py-2 bg-gray-50 flex-1 border-r border-t border-gray-100 cursor-pointer hover:bg-pink-400 hover:border-pink-400 hover:text-white duration-300">
                                    <div>{{ postCount }}</div>
                                    <div>帖子</div>
                                </NuxtLink>
                                <NuxtLink :to="'/author-' + postItemMeta.author + '/comment'"
                                    class="py-2 bg-gray-50 flex-1 border-r border-t border-gray-100 cursor-pointer hover:bg-pink-400 hover:border-pink-400 hover:text-white duration-300">
                                    <div>{{ commentCount }}</div>
                                    <div>评论</div>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="flex flex-row justify-between mx-1 mt-4 animate-fadeIn30">
                            <div class="text-xs text-gray-400">
                                <font-awesome-icon class="mr-1" :icon="['fas', 'user']" />
                                <span>Ta的帖子</span>
                            </div>
                            <NuxtLink :to="'/author-' + postItemMeta.author + '/post'"
                                class="text-xs text-gray-400 hover:text-pink-400 cursor-pointer duration-300">
                                <span class="mr-1">更多</span>
                                <font-awesome-icon :icon="['fas', 'caret-right']" />
                            </NuxtLink>
                        </div>
                        <div class="flex flex-wrap animate-fadeIn30">
                            <div v-for="(item, index) in authorPosts" :key="index" class="w-1/2 px-1 my-1">
                                <div
                                    class="border-2 border-transparent hover:border-pink-400 duration-300 hover:bg-pink-50 rounded-md overflow-hidden">
                                    <NuxtLink :to="'/post/' + item.postId + '.html'">
                                        <div class="bg-white rounded-md overflow-hidden">
                                            <img class="h-28 w-full object-cover cursor-pointer object-cover"
                                                v-lazy="runtimeConfig.public.assetsUrl + item.cover" alt="">
                                            <div
                                                class="text-ellipsis text-xs px-2 mb-2 pt-2 line-clamp-2 h-10 cursor-pointer hover:text-pink-400 duration-300">
                                                {{ item.title }}</div>
                                        </div>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4 animate-fadeIn30">
                            <div class="flex flex-row justify-between mx-1">
                                <div class="text-xs text-gray-400">
                                    <font-awesome-icon class="mr-1" :icon="['fas', 'users']" />
                                    <span>喵爪怪们</span>
                                </div>
                            </div>
                            <div class="flex flex-wrap">
                                <div v-for="(item, index) in users" :key="index"
                                    class="w-1/3 p-1 text-center cursor-pointer text-gray-500 hover:bg-pink-50 hover:text-pink-400">
                                    <NuxtLink :to="'/author-' + item.uuid + '/userInfo'">
                                        <img class="rounded-full object-cover h-20 w-20 border-2 border-transparent hover:border-pink-400 duration-300"
                                            v-lazy="runtimeConfig.public.assetsUrl + item.avatar" alt="">
                                        <div class="text-xs mt-1">{{ item.nickName }}</div>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4 animate-fadeIn30">
                            <div class="flex flex-row justify-between mx-1">
                                <div class="text-xs text-gray-400">
                                    <font-awesome-icon class="mr-1" :icon="['fas', 'users']" />
                                    <span>最新吐槽</span>
                                </div>
                            </div>
                            <div v-for="(item, index) in comments" :key="index"
                                class="flex flex-row w-full p-2 bg-white rounded-md duration-300 my-1 border-2 border-transparent hover:border-pink-400 text-center cursor-pointer text-gray-500 hover:bg-pink-50">
                                <NuxtLink :to="'/author-' + item.FormUidRelation.uuid + '/userInfo'" class="mr-2">
                                    <img class="rounded-full border-2 border-transparent hover:border-pink-400 duration-300 w-16 object-cover"
                                        v-lazy="'https://static.acgso1.com/uploads/avatar/43264.jpg?v=1abUG'" alt="">
                                </NuxtLink>
                                <div class="text-xs w-full">
                                    <div class="flex flex-row justify-between w-full">
                                        <NuxtLink :to="'/author-' + item.FormUidRelation.uuid + '/userInfo'"
                                            class="text-sm text-pink-400">{{ item.FormUidRelation.nickName }}</NuxtLink>
                                        <div>{{ formatDate(item.UpdatedAt) }}</div>
                                    </div>
                                    <div class="text-left mt-1 text-ellipsis text-xs line-clamp-3">
                                        {{ item.content }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Message ref="message"></Message>
        <Login ref="login" type="login"></Login>
        <Comment ref="comment" :postId="(route.params.id as string)"></Comment>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { COMMENTTREELIST, POSTITEM, POSTITEMDOWNLOAD, POSTITEMDOWNLOADBUY, POSTLIST } from '~~/config/api';
import { CommentList, PostItem, PostList } from '~~/types/response';
import { formatDate } from '~~/utils/utils'
import useClipboard from 'vue-clipboard3'
import { useAuth } from '~~/store/auth';
const { toClipboard } = useClipboard()

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const message = ref()
const comment = ref()
const login = ref()
const auth = useAuth()
const smile = ref([
    {
        'name': 'bcr_no',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/no.webp'
    },
    {
        'name': 'bcr_ok',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/ok.webp'
    },
    {
        'name': 'bcr_一切都会好起来的',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/一切都会好起来的.webp'
    },
    {
        'name': 'bcr_了解',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/了解.webp'
    },
    {
        'name': 'bcr_交给我吧',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/交给我吧.webp'
    },
    {
        'name': 'bcr_做得好',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/做得好.webp'
    },
    {
        'name': 'bcr_加油',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/加油.webp'
    },
    {
        'name': 'bcr_参战',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/参战.webp'
    },
    {
        'name': 'bcr_吸溜',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/吸溜.webp'
    },
    {
        'name': 'bcr_呜呼呼',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/呜呼呼.webp'
    },
    {
        'name': 'bcr_哇哇',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/哇哇.webp'
    },
    {
        'name': 'bcr_哈罗',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/哈罗.webp'
    },
    {
        'name': 'bcr_喵喵喵',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/喵喵喵.webp'
    },
    {
        'name': 'bcr_在那里',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/在那里.webp'
    },
    {
        'name': 'bcr_已经举报了',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/已经举报了.webp'
    },
    {
        'name': 'bcr_干杯',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/干杯.webp'
    },
    {
        'name': 'bcr_快回复吧',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/快回复吧.webp'
    },
    {
        'name': 'bcr_抱歉啦',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/抱歉啦.webp'
    },
    {
        'name': 'bcr_接下来拜托了',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/接下来拜托了.webp'
    },
    {
        'name': 'bcr_早上好',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/早上好.webp'
    },
    {
        'name': 'bcr_晚上好',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/晚上好.webp'
    },
    {
        'name': 'bcr_晚安zzz',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/晚安zzz.webp'
    },
    {
        'name': 'bcr_来吧',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/来吧.webp'
    },
    {
        'name': 'bcr_气呼呼',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/气呼呼.webp'
    },
    {
        'name': 'bcr_真是难办啊',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/真是难办啊.webp'
    },
    {
        'name': 'bcr_糟糕',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/糟糕.webp'
    },
    {
        'name': 'bcr_给我等一下',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/给我等一下.webp'
    },
    {
        'name': 'bcr_给我记住了',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/给我记住了.webp'
    },
    {
        'name': 'bcr_要上了哦',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/要上了哦.webp'
    },
    {
        'name': 'bcr_谢谢',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/谢谢.webp'
    },
    {
        'name': 'bcr_跟随妾身而来吧',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/跟随妾身而来吧.webp'
    },
    {
        'name': 'bcr_颤颤抖抖',
        'url': 'https://cdn.inn-studio.com/themes/zero/images/bcr/颤颤抖抖.webp'
    },
    {
        'name': '滑稽',
        'url': 'https://sinaimg.inn-studio.com/large/c524f7d4jw1f0wwjnedhoj200u00ugld.jpg'
    },
    {
        'name': '感谢分享',
        'url': 'https://sinaimg.inn-studio.com/large/c524f7d4jw1fbk5ir4rznj202s02eglh.jpg'
    },
    {
        'name': '脸红',
        'url': 'https://sinaimg.inn-studio.com/large/686ee05djw1eu8ijxc3p7g201c01c3yd.gif'
    },
    {
        'name': '杯具',
        'url': 'https://sinaimg.inn-studio.com/large/686ee05djw1eu8ikpw34jg201e01emx1.gif'
    },
    {
        'name': '亚历山大',
        'url': 'https://sinaimg.inn-studio.com/large/686ee05djw1eu8iliwosmg201e01e74h.gif'
    },
    {
        'name': '想要',
        'url': 'https://sinaimg.inn-studio.com/large/686ee05djw1eu8ilzci2jg202s02sglo.gif'
    },
    {
        'name': '吃惊',
        'url': 'https://sinaimg.inn-studio.com/large/686ee05djw1eu8j1vay4ej204h049jrb.jpg'
    },
    {
        'name': '好样的',
        'url': 'https://sinaimg.inn-studio.com/large/686ee05djw1eu8iomh5cbg203g03cdgx.gif'
    },
    {
        'name': '感谢分享2',
        'url': 'https://sinaimg.inn-studio.com/large/c524f7d4jw1f44hq6g2ftj202s02swef.jpg'
    },
    {
        'name': '生气',
        'url': 'https://sinaimg.inn-studio.com/large/c524f7d4jw1eu8fzbvagqj202s02sa9z.jpg'
    },
    {
        'name': '卖萌',
        'url': 'https://sinaimg.inn-studio.com/large/c524f7d4jw1eu8g1m0y49j202s02sjrb.jpg'
    },
    {
        'name': 'OK！',
        'url': 'https://sinaimg.inn-studio.com/large/c524f7d4jw1eu8fza5ep2j202s02s3yg.jpg'
    },
    {
        'name': '不行',
        'url': 'https://sinaimg.inn-studio.com/large/c524f7d4jw1eu8fz69u1qj202s02st8n.jpg'
    },
    {
        'name': '叹气',
        'url': 'https://sinaimg.inn-studio.com/large/c524f7d4jw1fbk5jxgin9j202s02e743.jpg'
    },
    {
        'name': '棒！',
        'url': 'https://sinaimg.inn-studio.com/large/c524f7d4jw1eu8fz1nm1rj202s02smx3.jpg'
    },
    {
        'name': '偷笑',
        'url': 'https://sinaimg.inn-studio.com/large/c524f7d4jw1f124864q4qj202s02e3ye.jpg'
    },
    {
        'name': '噫',
        'url': 'https://sinaimg.inn-studio.com/large/c524f7d4jw1f0z83hc4ndj202s02ea9x.jpg'
    },
    {
        'name': 'good',
        'url': 'https://sinaimg.inn-studio.com/large/c524f7d4jw1f0z83fr4l7j202s02emx2.jpg'
    },
    {
        'name': '不明真相',
        'url': 'https://sinaimg.inn-studio.com/large/c524f7d4jw1fbk5fo2790j202s02eweb.jpg'
    },
    {
        'name': '太棒了',
        'url': 'https://sinaimg.inn-studio.com/large/c524f7d4jw1fbk5lerczej202s02edfn.jpg'
    },
    {
        'name': '不知所措',
        'url': 'https://sinaimg.inn-studio.com/large/c524f7d4jw1fbk5qzpg9aj202s02eq2u.jpg'
    },
    {
        'name': '盯..',
        'url': 'https://sinaimg.inn-studio.com/large/c524f7d4jw1fbk5pi74hgj202s02et8i.jpg'
    },
    {
        'name': '所以呢',
        'url': 'https://sinaimg.inn-studio.com/large/c524f7d4jw1f0z838j5d4j202s02emx1.jpg'
    },
    {
        'name': '残念',
        'url': 'https://sinaimg.inn-studio.com/large/c524f7d4jw1fbk5hkglbsj202s02e3yf.jpg'
    },
])

// 获取文章列表
const { result } = await useCustomFetch<PostList>(POSTLIST, {
    method: 'GET',
    params: {
        page: 1,
        pageSize: 999,
    }
})
const recommendPostList = computed(() => result.value)

// 获取文章
const postItemContent = await useCustomFetch<PostItem>(POSTITEM, {
    method: 'GET',
    params: {
        postId: route.params.id,
    }
})
const followCount = computed(() => postItemContent.result.value.followCount)
const fansCount = computed(() => postItemContent.result.value.fansCount)
const postCount = computed(() => postItemContent.result.value.postCount)
const commentCount = computed(() => postItemContent.result.value.commentCount)
const postItemMeta = computed(() => postItemContent.result.value.post)
const authorPosts = computed(() => postItemContent.result.value.authorPosts)
const users = computed(() => postItemContent.result.value.users)
const comments = computed(() => postItemContent.result.value.comments)

// 获取文章下载
const postItemDownload = await useCustomFetch<any>(POSTITEMDOWNLOAD, {
    method: 'GET',
    params: {
        postId: route.params.id,
        'Authorization': 'Bearer ' + auth.token,
    }
})
const postDownload = computed(() => postItemDownload.result.value)

// 获取文章评论
const postItemCommentList = await useCustomFetch<CommentList>(COMMENTTREELIST, {
    method: 'GET',
    params: {
        postId: route.params.id,
        page: 1,
        pageSize: 999
    }
})
const postComment = computed(() => postItemCommentList.result.value)

async function copyText(text: string) {
    await toClipboard(text)
    message.value.show('复制成功', {
        type: 'success',
    })
}

function showLogin() {
    login.value.show()
}

function showComment(commentMeta) {
    comment.value.show(commentMeta)
}

async function buyDownload(item) {
    const { result, code, message: msg } = await useCustomFetch<any>(POSTITEMDOWNLOADBUY, {
        method: 'POST',
        body: {
            postId: route.params.id,
            downloadId: item.ID,
        },
        params: {
            'Authorization': 'Bearer ' + auth.token,
        }
    })
    if (code === 200) {
        message.value.show('购买成功', {
            type: 'success',
        })
    } else {
        message.value.show(msg || '购买失败', {
            type: 'warning',
        })
    }

}

const settings = useSettings()
useHead({
    title: `${postItemMeta.value.title} - ${settings.value.basic.title}`,
    viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
    charset: 'utf-8',
    meta: [
        { name: 'og:locale', content: 'zh_CN' },
        { name: 'og:type', content: 'article' },
        { name: 'og:site_name', content: settings.value.basic.title },
        { name: 'og:title', content: `${settings.value.basic.title} - ${settings.value.basic.desc}` },
        { name: 'og:url', content: settings.value.basic.desc },
        { name: 'keywords', content: settings.value.basic.keyword },
        { name: 'description', content: settings.value.basic.desc },
        { name: 'og:image', content: settings.value.basic.desc },
        { name: 'og:updated_time', content: settings.value.basic.desc },
        { name: 'article:author-[id]', content: settings.value.basic.desc },
    ],
})
</script>
