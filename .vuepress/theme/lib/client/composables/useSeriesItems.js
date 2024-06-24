import { inject } from 'vue';
import { useRoute } from 'vue-router';
import { isPlainObject, isString, resolveLocalePath, } from '@vuepress/shared';
import { useNavLink } from './useNavLink';
import { usePageData } from '@vuepress-reco/vuepress-plugin-page/lib/client/composable';
export const seriesItemsSymbol = Symbol('seriesItems');
export const useSeriesItems = () => {
    const seriesItems = inject(seriesItemsSymbol);
    if (!seriesItems) {
        throw new Error('useSeriesItems() is called without provider.');
    }
    return seriesItems;
};
export const resolveSeriesItems = (frontmatter, themeLocal, series) => {
    var _a, _b;
    const { series: autoSeries } = usePageData();
    // get series config from frontmatter > themeConfig
    let seriesConfig = (_b = (_a = frontmatter.series) !== null && _a !== void 0 ? _a : themeLocal.series) !== null && _b !== void 0 ? _b : {};
    seriesConfig = {
        ...autoSeries,
        ...seriesConfig,
    };
    // 解决
    // resolve series items according to the config
    if (frontmatter.home) {
        return [];
    }
    // 自动生成 series 是对象的格式，所以不再兼容数组的格式
    // if (isArray(seriesConfig)) {
    //   return resolveArraySeriesItems(seriesConfig)
    // }
    if (isPlainObject(seriesConfig)) {
        return resolveMultiSeriesItems(seriesConfig);
    }
    return [];
};
/**
 * Resolve series items if the config is an array
 */
export const resolveArraySeriesItems = (seriesConfig) => {
    const handleChildItem = (item) => {
        let childItem;
        if (isString(item)) {
            childItem = useNavLink(item);
        }
        else {
            childItem = item;
        }
        if (childItem.isGroup && childItem.children) {
            return {
                ...childItem,
                children: childItem.children.map(handleChildItem),
            };
        }
        return childItem;
    };
    return seriesConfig.map((item) => {
        if (isString(item)) {
            return useNavLink(item);
        }
        return {
            ...item,
            children: item.children.map(handleChildItem),
        };
    });
};
/**
 * Resolve series items if the config is a key -> value (path-prefix -> array) object
 */
export const resolveMultiSeriesItems = (seriesConfig) => {
    var _a;
    const route = useRoute();
    const seriesPath = resolveLocalePath(seriesConfig, route.path);
    const matchedSeriesConfig = (_a = seriesConfig[seriesPath]) !== null && _a !== void 0 ? _a : [];
    return resolveArraySeriesItems(matchedSeriesConfig);
};
