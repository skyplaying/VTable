import type { SimpleHeaderLayoutMap } from '../../layout';
import type { PivotHeaderLayoutMap } from '../../layout/pivot-header-layout';
import { HierarchyState } from '../../ts-types';
import type { BaseTableAPI } from '../../ts-types/base-table';

export function getHierarchyOffset(col: number, row: number, table: BaseTableAPI): number {
  // 处理树形展开
  let cellHierarchyIndent = 0;
  const layoutMap = table.internalProps.layoutMap;
  //判断是否为表头
  if (layoutMap.isHeader(col, row)) {
    const hd = layoutMap.getHeader(col, row);
    if (hd?.hierarchyLevel) {
      cellHierarchyIndent = (hd.hierarchyLevel ?? 0) * ((layoutMap as PivotHeaderLayoutMap).rowHierarchyIndent ?? 0);
    }
  } else {
    // 基本表格表身body单元格 如果是树形展开 需要考虑缩进值
    // const cellHierarchyState = table.getHierarchyState(col, row);
    const define = table.getBodyColumnDefine(col, row);
    if (define?.tree) {
      const indexArr = table.dataSource.getIndexKey(table.getRecordShowIndexByCell(col, row));
      cellHierarchyIndent =
        Array.isArray(indexArr) && table.getHierarchyState(col, row) !== HierarchyState.none
          ? (indexArr.length - 1) * ((layoutMap as SimpleHeaderLayoutMap).hierarchyIndent ?? 0)
          : 0;
    }
  }

  return cellHierarchyIndent;
}
