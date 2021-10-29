export type NamingStyle = 'pascal' | 'hyphen';

export type TabWidth = 2 | 4;

export type OptionConfig = {
	/**
	 * 搜索的文件路径,XXX\/**\/*.{XX,XX,XX}格式
	 */
	globs: string | string[];
	/**
	 * 忽略的路径
	 */
	ignore?: string[];

	/**
	 * 输出地址,可包含文件名称
	 * 默认值: ./index.d.ts
	 */
	output?: string;

	/**
	 * 组件命名规则,支持帕斯卡和连字符两种规则
	 * 默认帕斯卡规则
	 */
	namingStyle?: NamingStyle;

	/**
	 * 生成 组件引用路径的前缀路径
	 */
	prefixPath?: string;
	/**
	 *  忽略生成的后缀。
	 *  例如可以忽略生成 ts,tsx这些后缀
	 */
	ignoreExt?: string[];

	/**
	 * 默认值：false
	 */
	semi?: boolean;
	/**
	 * 默认值：false
	 */
	endOfLine?: boolean;
	/**
	 * 默认值： true
	 */
	singleQuote?: boolean;

	/**
	 * 默认值：4
	 */
	tabWidth?: TabWidth;

	componentResolver?: (path: string, options: OptionConfig) => { name: string; path: string };
};
