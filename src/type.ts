export interface OptionConfig {
  entry: string;
  outdir?: string;
  outfile?: string;
  semi?: boolean;
  singleQuote?: boolean;
  tabWidth?: TabWidth;
  prefixPath?: string;
  componentPathResolver?: (path: string, options: OptionConfig) => string;
}

export  type  TabWidth = 2 | 4;