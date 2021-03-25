# 说明书

说明书是对目录或文件的相关描述和说明，以便开发者更快更容易地了解当前目录或文件的作用和用法

## 名称

env

## 含义

环境变量目录

## 简介

此目录为项目的环境变量目录，请勿改动！

## 作用

提供环境变量的存放地址和自动导入

## 场景

环境变量

## 举例

当使用 `yipack dev` 或者 `npm run dev` 命令时

> 执行的操作相当于 `yipack dev --NODE_ENV=development`，会自动使用 env 目录下的 development.env 环境变量文件

当使用 `yipack build` 或者 `npm run build` 命令时

> 执行的操作相当于 `yipack dev --NODE_ENV=production`，会自动使用 env 目录下的 production.env 环境变量文件

如果想增加一个环境变量环境和文件，请在 package.json 文件中，增加以下脚本

```javascript
{
    scripts: {
        test: 'yipack dev --NODE_ENV=test';
    }
}
```

这样，在开发环境中，就会使用 test.env 文件中的环境变量，适用于多环境测试
