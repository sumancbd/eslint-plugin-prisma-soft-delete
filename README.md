# Introduction
This eslint plugin is used to force developers to use `{ deleted: null }` or `{ deletedAt: null }` filter in where query.

# Motivation
Prisma does have easy support for implementing soft delete, but it is not as neat as other ORMs out there. You can follow [this guide](https://www.prisma.io/docs/concepts/components/prisma-client/middleware/soft-delete-middleware) to implement soft-delete using Prisma. The problem is you have to add `{ deleted: null }` or `{ deletedAt: null }` filter explicitly when querying for data. It is very easy to make mistakes for new teammates if it goes without review in big teams. Hence, this plugin.

# Installation
## npm
```shell
npm i -D eslint-plugin-prisma-soft-delete
```
## yarn
```shell
yarn add -D eslint-plugin-prisma-soft-delete
```

```javascript
// .eslintrc
module.exports = {
  plugins: [
    ...
    "prisma-soft-delete",
  ],
  rules: {
    ...
    'prisma-soft-delete/use-deleted-null': 'error',
    'prisma-soft-delete/use-find-first': 'error',
  },
}
```

# How to turn off rules from this plugin
```javascript
// .eslintrc
module.exports = {
  plugins: [
    ...
    "prisma-soft-delete",
  ],
  rules: {
    ...
    'prisma-soft-delete/use-deleted-null': 'off',
    'prisma-soft-delete/use-find-first': 'off',
  },
}
```

# Rules
## prisma-soft-delete/use-deleted-null
```javascript
// bad
const user = await this.prisma.user.findFirst({
    where: { id: 1 },
});

// good
const user = await this.prisma.user.findFirst({
    where: { deleted: null, id: 1 },
});

// good
const user = await this.prisma.user.findFirst({
    where: { deletedAt: null, id: 1 },
});
```

## prisma-soft-delete/use-find-first
```javascript
// bad
const user = await this.prisma.user.findUnique({
    where: { id: 1 },
});

// good
const user = await this.prisma.user.findFirst({
    where: { deleted: null, id: 1 },
});

// good
const user = await this.prisma.user.findFirstOrThrow({
    where: { deletedAt: null, id: 1 },
});
```

# From author
Feel free to create an issue on GitHub if you face any problems or want any enhancements to this plugin.