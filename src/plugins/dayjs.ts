import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';

// 使用插件
dayjs.extend(RelativeTime);

export default dayjs;
