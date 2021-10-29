declare module 'naming-style' {
 export type NamingStyle = 'hyphen' | 'pascal' | 'camel' | 'constant' | 'snake' | 'underscore' | 'setence';

 export function style(text: string): NamingStyle;
 export function hyphen(text: string): string;
 export function pascal(text: string): string;
 export function camel(text: string): string;
 export function constant(text: string): string;
 export function snake(text: string): string;
 export function underscore(text: string): string;
 export function setence(text: string): string;
}
