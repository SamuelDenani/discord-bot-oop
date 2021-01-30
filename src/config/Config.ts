import fs from 'fs';
import camelCase from 'lodash/camelCase';
import path from 'path';

import ConfigInterface, { ConfigValue } from './ConfigInterface';

export default class Config implements ConfigInterface { 
    public prefix!: string;
    public token!: string;

    private readonly CONFIG_PATH = path.join(process.cwd(), 'configs', 'configs.json');
    private readonly JSON_KEYS = ['prefix', 'token'];

    // I need to study more about this
    [index: string]: any;

    constructor () {
        this.initialize();
    }

    private initialize () {
        if (!fs.existsSync(this.CONFIG_PATH)) {
            this.initializeFromEnvitonmentVariables();
        } else {
            this.initializeFromDefaultConfig();
        }
    }

    private initializeFromDefaultConfig () {
        const defaultConfig = require(this.CONFIG_PATH);
        this.setFrom(defaultConfig);
    }
    
    private initializeFromEnvitonmentVariables () {
        Object.keys(process.env)
            .filter(envKey => this.JSON_KEYS.includes(camelCase(envKey)))
            .forEach(envKey => {
                let envValue = process.env[envKey]!;
                const configKey = camelCase(envKey);

                this.set(configKey, envValue);
            })
    }

    private set (field: string, value: string) {
        if (!this.JSON_KEYS.includes(field)) return undefined;

        let newValue: ConfigValue;

        newValue = value;
        this[field] = newValue;
    }

    private setFrom (data: ConfigInterface) {
        Object.keys(data).forEach(field => {
            this[field] = data[field];
        });
    }
}