import useDeletedNull from './rules/use-deleted-null';
import useFindFirst from "./rules/use-find-first";

module.exports = {
    rules: {
      'use-deleted-null': useDeletedNull,
      'use-find-first': useFindFirst,
    },
};