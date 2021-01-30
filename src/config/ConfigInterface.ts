export type ConfigValue = boolean | number | string | string[];

export default interface ConfigInterface {
    [key: string]: Nullable<ConfigValue>
    
    token: string;
    prefix?: string;
}