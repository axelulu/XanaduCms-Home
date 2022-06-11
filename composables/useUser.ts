import { userMeta } from '~~/types/response'

export default () => useState<userMeta | null>('userMeta', null)
