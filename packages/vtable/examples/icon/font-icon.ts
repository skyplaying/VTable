/* eslint-disable max-len */
import * as VTable from '../../src';
const ListTable = VTable.ListTable;
const CONTAINER_ID = 'vTable';
import { bindDebugTool } from '../../src/scenegraph/debug-tool';

export function createTable() {
  // register icon
  VTable.register.clearAll?.();
  VTable.register.icon('text-button', {
    type: 'text',
    content: 'click',
    name: 'text-button',
    positionType: VTable.TYPES.IconPosition.left,
    style: {
      fill: 'red'
    }
  });

  VTable.register.icon('text-button1', {
    type: 'text',
    content: 'click',
    name: 'text-button',
    positionType: VTable.TYPES.IconPosition.left,
    marginLeft: 10,
    style: {
      fill: 'yellow'
    }
  });

  const personsDataSource = [
    {
      progress: 100,
      id: 1,
      name: 'a'
    },
    {
      progress: 80,
      id: 2,
      name: 'b'
    },
    {
      progress: 1,
      id: 3,
      name: 'c'
    },
    {
      progress: 55,
      id: 4,
      name: 'd'
    },
    {
      progress: 28,
      id: 5,
      name: 'e'
    },
    {
      progress: 100,
      id: 11,
      name: 'a'
    },
    {
      progress: 80,
      id: 22,
      name: 'b'
    },
    {
      progress: 1,
      id: 33,
      name: 'c'
    },
    {
      progress: 55,
      id: 44,
      name: 'd'
    },
    {
      progress: 28,
      id: 55,
      name: 'e'
    },
    {
      progress: 100,
      id: 111,
      name: 'a'
    },
    {
      progress: 80,
      id: 222,
      name: 'b'
    },
    {
      progress: 1,
      id: 333,
      name: 'c'
    },
    {
      progress: 55,
      id: 444,
      name: 'd'
    },
    {
      progress: 28,
      id: 555,
      name: 'e'
    }
  ];
  const option: VTable.ListTableConstructorOptions = {
    container: document.getElementById(CONTAINER_ID),
    columns: [
      {
        field: 'progress',
        fieldFormat(rec) {
          return `已完成${rec.progress}%`;
        },
        title: 'progress',
        description: '这是一个标题的详细描述',
        width: 150,
        style: {
          autoWrapText: true
        },
        headerStyle: {
          autoWrapText: true
        }
      },
      {
        field: 'id',
        title: 'ID编号',
        sort: (v1, v2, order) => {
          if (order === 'desc') {
            return v1 === v2 ? 0 : v1 > v2 ? -1 : 1;
          }
          return v1 === v2 ? 0 : v1 > v2 ? 1 : -1;
        },
        width: 100
      },
      {
        field: 'id',
        fieldFormat(rec) {
          return `这是第${rec.id}号`;
        },
        title: 'ID说明',
        description: `这是一个ID详细描述\n这是一个ID详细描述
这是一个ID详细描述`,
        sort: (v1, v2, order) => {
          if (order === 'desc') {
            return v1 === v2 ? 0 : v1 > v2 ? -1 : 1;
          }
          return v1 === v2 ? 0 : v1 > v2 ? 1 : -1;
        },
        width: 150
      },
      {
        title: 'Name',
        headerStyle: {
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 13,
          fontFamily: 'sans-serif'
        },
        field: 'name',
        width: 150,
        style: {
          textAlign: 'center'
        }
      },
      {
        field: 'Action',
        title: 'Action',
        width: 150,
        icon: ['text-button', 'text-button1'],
        style: {
          textAlign: 'center'
        }
      }
    ],
    showFrozenIcon: true, //显示VTable内置冻结列图标
    widthMode: 'standard',
    frozenColCount: 0, //冻结列
    allowFrozenColCount: 8
  };

  const instance = new ListTable(option);

  instance.on('click_cell', args => {
    console.log('click_cell', args);
    const { col, row, targetIcon } = args;
    if (targetIcon) {
      const { left, top, width, height, bottom, right } = targetIcon.position;
      instance.showDropDownMenu(col, row, {
        content: [
          {
            type: 'title',
            text: '下拉菜单'
          },
          {
            text: '排序规则1',
            menuKey: 'sort1',
            icon: {
              svg: '<svg width="15" height="15" viewBox="0 0 15 15" fill="#1B1F23" xmlns="http://www.w3.org/2000/svg">\n    <path d="M4.03333 13.5667L3.60907 13.9909C3.84339 14.2252 4.22328 14.2252 4.4576 13.9909L4.03333 13.5667ZM7.0576 11.3909C7.29191 11.1566 7.29191 10.7767 7.0576 10.5424C6.82328 10.3081 6.44339 10.3081 6.20907 10.5424L7.0576 11.3909ZM1.8576 10.5424C1.62328 10.3081 1.24338 10.3081 1.00907 10.5424C0.774756 10.7767 0.774756 11.1566 1.00907 11.3909L1.8576 10.5424ZM4.63333 1C4.63333 0.668629 4.36471 0.4 4.03333 0.4C3.70196 0.4 3.43333 0.668629 3.43333 1H4.63333ZM8.8 3.43333C8.46863 3.43333 8.2 3.70196 8.2 4.03333C8.2 4.3647 8.46863 4.63333 8.8 4.63333V3.43333ZM14 4.63333C14.3314 4.63333 14.6 4.3647 14.6 4.03333C14.6 3.70196 14.3314 3.43333 14 3.43333V4.63333ZM8.8 6.9C8.46863 6.9 8.2 7.16863 8.2 7.5C8.2 7.83137 8.46863 8.1 8.8 8.1V6.9ZM12.2667 8.1C12.598 8.1 12.8667 7.83137 12.8667 7.5C12.8667 7.16863 12.598 6.9 12.2667 6.9V8.1ZM8.8 10.3667C8.46863 10.3667 8.2 10.6353 8.2 10.9667C8.2 11.298 8.46863 11.5667 8.8 11.5667V10.3667ZM10.5333 11.5667C10.8647 11.5667 11.1333 11.298 11.1333 10.9667C11.1333 10.6353 10.8647 10.3667 10.5333 10.3667V11.5667ZM4.4576 13.9909L7.0576 11.3909L6.20907 10.5424L3.60907 13.1424L4.4576 13.9909ZM4.4576 13.1424L1.8576 10.5424L1.00907 11.3909L3.60907 13.9909L4.4576 13.1424ZM3.43333 1V13.5667H4.63333V1H3.43333ZM8.8 4.63333H14V3.43333H8.8V4.63333ZM8.8 8.1H12.2667V6.9H8.8V8.1ZM8.8 11.5667H10.5333V10.3667H8.8V11.5667Z" fill="red"/>\n  </svg>'
            },
            children: [
              {
                text: '降序排序',
                menuKey: 'sort_desc_1',
                icon: {
                  svg: '<svg width="15" height="15" viewBox="0 0 15 15" fill="#1B1F23" xmlns="http://www.w3.org/2000/svg">\n    <path d="M4.03333 13.5667L3.60907 13.9909C3.84339 14.2252 4.22328 14.2252 4.4576 13.9909L4.03333 13.5667ZM7.0576 11.3909C7.29191 11.1566 7.29191 10.7767 7.0576 10.5424C6.82328 10.3081 6.44339 10.3081 6.20907 10.5424L7.0576 11.3909ZM1.8576 10.5424C1.62328 10.3081 1.24338 10.3081 1.00907 10.5424C0.774756 10.7767 0.774756 11.1566 1.00907 11.3909L1.8576 10.5424ZM4.63333 1C4.63333 0.668629 4.36471 0.4 4.03333 0.4C3.70196 0.4 3.43333 0.668629 3.43333 1H4.63333ZM8.8 3.43333C8.46863 3.43333 8.2 3.70196 8.2 4.03333C8.2 4.3647 8.46863 4.63333 8.8 4.63333V3.43333ZM14 4.63333C14.3314 4.63333 14.6 4.3647 14.6 4.03333C14.6 3.70196 14.3314 3.43333 14 3.43333V4.63333ZM8.8 6.9C8.46863 6.9 8.2 7.16863 8.2 7.5C8.2 7.83137 8.46863 8.1 8.8 8.1V6.9ZM12.2667 8.1C12.598 8.1 12.8667 7.83137 12.8667 7.5C12.8667 7.16863 12.598 6.9 12.2667 6.9V8.1ZM8.8 10.3667C8.46863 10.3667 8.2 10.6353 8.2 10.9667C8.2 11.298 8.46863 11.5667 8.8 11.5667V10.3667ZM10.5333 11.5667C10.8647 11.5667 11.1333 11.298 11.1333 10.9667C11.1333 10.6353 10.8647 10.3667 10.5333 10.3667V11.5667ZM4.4576 13.9909L7.0576 11.3909L6.20907 10.5424L3.60907 13.1424L4.4576 13.9909ZM4.4576 13.1424L1.8576 10.5424L1.00907 11.3909L3.60907 13.9909L4.4576 13.1424ZM3.43333 1V13.5667H4.63333V1H3.43333ZM8.8 4.63333H14V3.43333H8.8V4.63333ZM8.8 8.1H12.2667V6.9H8.8V8.1ZM8.8 11.5667H10.5333V10.3667H8.8V11.5667Z" fill="pink"/>\n  </svg>'
                }
              },
              {
                text: '升序排序',
                menuKey: 'sort_asc_1',
                icon: {
                  svg: '<svg width="15" height="15" viewBox="0 0 15 15" fill="#1B1F23" xmlns="http://www.w3.org/2000/svg">\n    <path d="M4.03332 1.43335L4.45758 1.00909C4.22327 0.774771 3.84337 0.774771 3.60906 1.00909L4.03332 1.43335ZM1.00906 3.60909C0.77474 3.8434 0.77474 4.2233 1.00906 4.45761C1.24337 4.69193 1.62327 4.69193 1.85758 4.45761L1.00906 3.60909ZM6.20905 4.45761C6.44337 4.69193 6.82327 4.69193 7.05758 4.45761C7.2919 4.2233 7.2919 3.8434 7.05758 3.60909L6.20905 4.45761ZM3.43332 14C3.43332 14.3314 3.70195 14.6 4.03332 14.6C4.36469 14.6 4.63332 14.3314 4.63332 14H3.43332ZM8.79999 3.43335C8.46862 3.43335 8.19999 3.70198 8.19999 4.03335C8.19999 4.36472 8.46862 4.63335 8.79999 4.63335V3.43335ZM14 4.63335C14.3314 4.63335 14.6 4.36472 14.6 4.03335C14.6 3.70198 14.3314 3.43335 14 3.43335V4.63335ZM8.79999 6.90002C8.46862 6.90002 8.19999 7.16865 8.19999 7.50002C8.19999 7.83139 8.46862 8.10002 8.79999 8.10002V6.90002ZM12.2667 8.10002C12.598 8.10002 12.8667 7.83139 12.8667 7.50002C12.8667 7.16865 12.598 6.90002 12.2667 6.90002V8.10002ZM8.79999 10.3667C8.46862 10.3667 8.19999 10.6353 8.19999 10.9667C8.19999 11.2981 8.46862 11.5667 8.79999 11.5667V10.3667ZM10.5333 11.5667C10.8647 11.5667 11.1333 11.2981 11.1333 10.9667C11.1333 10.6353 10.8647 10.3667 10.5333 10.3667V11.5667ZM3.60906 1.00909L1.00906 3.60909L1.85758 4.45761L4.45758 1.85761L3.60906 1.00909ZM3.60906 1.85761L6.20905 4.45761L7.05758 3.60909L4.45758 1.00909L3.60906 1.85761ZM3.43332 1.43335V14H4.63332V1.43335H3.43332ZM8.79999 4.63335H14V3.43335H8.79999V4.63335ZM8.79999 8.10002H12.2667V6.90002H8.79999V8.10002ZM8.79999 11.5667H10.5333V10.3667H8.79999V11.5667Z" fill="#1B1F23"/>\n  </svg>'
                }
              }
            ]
          },
          {
            text: '排序规则2',
            menuKey: 'sort2',
            icon: {
              svg: '<svg width="15" height="15" viewBox="0 0 15 15" fill="#1B1F23" xmlns="http://www.w3.org/2000/svg">\n    <path d="M4.03332 1.43335L4.45758 1.00909C4.22327 0.774771 3.84337 0.774771 3.60906 1.00909L4.03332 1.43335ZM1.00906 3.60909C0.77474 3.8434 0.77474 4.2233 1.00906 4.45761C1.24337 4.69193 1.62327 4.69193 1.85758 4.45761L1.00906 3.60909ZM6.20905 4.45761C6.44337 4.69193 6.82327 4.69193 7.05758 4.45761C7.2919 4.2233 7.2919 3.8434 7.05758 3.60909L6.20905 4.45761ZM3.43332 14C3.43332 14.3314 3.70195 14.6 4.03332 14.6C4.36469 14.6 4.63332 14.3314 4.63332 14H3.43332ZM8.79999 3.43335C8.46862 3.43335 8.19999 3.70198 8.19999 4.03335C8.19999 4.36472 8.46862 4.63335 8.79999 4.63335V3.43335ZM14 4.63335C14.3314 4.63335 14.6 4.36472 14.6 4.03335C14.6 3.70198 14.3314 3.43335 14 3.43335V4.63335ZM8.79999 6.90002C8.46862 6.90002 8.19999 7.16865 8.19999 7.50002C8.19999 7.83139 8.46862 8.10002 8.79999 8.10002V6.90002ZM12.2667 8.10002C12.598 8.10002 12.8667 7.83139 12.8667 7.50002C12.8667 7.16865 12.598 6.90002 12.2667 6.90002V8.10002ZM8.79999 10.3667C8.46862 10.3667 8.19999 10.6353 8.19999 10.9667C8.19999 11.2981 8.46862 11.5667 8.79999 11.5667V10.3667ZM10.5333 11.5667C10.8647 11.5667 11.1333 11.2981 11.1333 10.9667C11.1333 10.6353 10.8647 10.3667 10.5333 10.3667V11.5667ZM3.60906 1.00909L1.00906 3.60909L1.85758 4.45761L4.45758 1.85761L3.60906 1.00909ZM3.60906 1.85761L6.20905 4.45761L7.05758 3.60909L4.45758 1.00909L3.60906 1.85761ZM3.43332 1.43335V14H4.63332V1.43335H3.43332ZM8.79999 4.63335H14V3.43335H8.79999V4.63335ZM8.79999 8.10002H12.2667V6.90002H8.79999V8.10002ZM8.79999 11.5667H10.5333V10.3667H8.79999V11.5667Z" fill="#1B1F23"/>\n  </svg>'
            },
            children: [
              {
                text: '降序排序',
                menuKey: 'sort_desc_2',
                icon: {
                  svg: '<svg width="15" height="15" viewBox="0 0 15 15" fill="#1B1F23" xmlns="http://www.w3.org/2000/svg">\n    <path d="M4.03333 13.5667L3.60907 13.9909C3.84339 14.2252 4.22328 14.2252 4.4576 13.9909L4.03333 13.5667ZM7.0576 11.3909C7.29191 11.1566 7.29191 10.7767 7.0576 10.5424C6.82328 10.3081 6.44339 10.3081 6.20907 10.5424L7.0576 11.3909ZM1.8576 10.5424C1.62328 10.3081 1.24338 10.3081 1.00907 10.5424C0.774756 10.7767 0.774756 11.1566 1.00907 11.3909L1.8576 10.5424ZM4.63333 1C4.63333 0.668629 4.36471 0.4 4.03333 0.4C3.70196 0.4 3.43333 0.668629 3.43333 1H4.63333ZM8.8 3.43333C8.46863 3.43333 8.2 3.70196 8.2 4.03333C8.2 4.3647 8.46863 4.63333 8.8 4.63333V3.43333ZM14 4.63333C14.3314 4.63333 14.6 4.3647 14.6 4.03333C14.6 3.70196 14.3314 3.43333 14 3.43333V4.63333ZM8.8 6.9C8.46863 6.9 8.2 7.16863 8.2 7.5C8.2 7.83137 8.46863 8.1 8.8 8.1V6.9ZM12.2667 8.1C12.598 8.1 12.8667 7.83137 12.8667 7.5C12.8667 7.16863 12.598 6.9 12.2667 6.9V8.1ZM8.8 10.3667C8.46863 10.3667 8.2 10.6353 8.2 10.9667C8.2 11.298 8.46863 11.5667 8.8 11.5667V10.3667ZM10.5333 11.5667C10.8647 11.5667 11.1333 11.298 11.1333 10.9667C11.1333 10.6353 10.8647 10.3667 10.5333 10.3667V11.5667ZM4.4576 13.9909L7.0576 11.3909L6.20907 10.5424L3.60907 13.1424L4.4576 13.9909ZM4.4576 13.1424L1.8576 10.5424L1.00907 11.3909L3.60907 13.9909L4.4576 13.1424ZM3.43333 1V13.5667H4.63333V1H3.43333ZM8.8 4.63333H14V3.43333H8.8V4.63333ZM8.8 8.1H12.2667V6.9H8.8V8.1ZM8.8 11.5667H10.5333V10.3667H8.8V11.5667Z" fill="#1B1F23"/>\n  </svg>'
                }
              },
              {
                text: '升序排序',
                menuKey: 'sort_asc_2',
                icon: {
                  svg: '<svg width="15" height="15" viewBox="0 0 15 15" fill="#1B1F23" xmlns="http://www.w3.org/2000/svg">\n    <path d="M4.03332 1.43335L4.45758 1.00909C4.22327 0.774771 3.84337 0.774771 3.60906 1.00909L4.03332 1.43335ZM1.00906 3.60909C0.77474 3.8434 0.77474 4.2233 1.00906 4.45761C1.24337 4.69193 1.62327 4.69193 1.85758 4.45761L1.00906 3.60909ZM6.20905 4.45761C6.44337 4.69193 6.82327 4.69193 7.05758 4.45761C7.2919 4.2233 7.2919 3.8434 7.05758 3.60909L6.20905 4.45761ZM3.43332 14C3.43332 14.3314 3.70195 14.6 4.03332 14.6C4.36469 14.6 4.63332 14.3314 4.63332 14H3.43332ZM8.79999 3.43335C8.46862 3.43335 8.19999 3.70198 8.19999 4.03335C8.19999 4.36472 8.46862 4.63335 8.79999 4.63335V3.43335ZM14 4.63335C14.3314 4.63335 14.6 4.36472 14.6 4.03335C14.6 3.70198 14.3314 3.43335 14 3.43335V4.63335ZM8.79999 6.90002C8.46862 6.90002 8.19999 7.16865 8.19999 7.50002C8.19999 7.83139 8.46862 8.10002 8.79999 8.10002V6.90002ZM12.2667 8.10002C12.598 8.10002 12.8667 7.83139 12.8667 7.50002C12.8667 7.16865 12.598 6.90002 12.2667 6.90002V8.10002ZM8.79999 10.3667C8.46862 10.3667 8.19999 10.6353 8.19999 10.9667C8.19999 11.2981 8.46862 11.5667 8.79999 11.5667V10.3667ZM10.5333 11.5667C10.8647 11.5667 11.1333 11.2981 11.1333 10.9667C11.1333 10.6353 10.8647 10.3667 10.5333 10.3667V11.5667ZM3.60906 1.00909L1.00906 3.60909L1.85758 4.45761L4.45758 1.85761L3.60906 1.00909ZM3.60906 1.85761L6.20905 4.45761L7.05758 3.60909L4.45758 1.00909L3.60906 1.85761ZM3.43332 1.43335V14H4.63332V1.43335H3.43332ZM8.79999 4.63335H14V3.43335H8.79999V4.63335ZM8.79999 8.10002H12.2667V6.90002H8.79999V8.10002ZM8.79999 11.5667H10.5333V10.3667H8.79999V11.5667Z" fill="#1B1F23"/>\n  </svg>'
                }
              }
            ]
          },
          {
            type: 'split',
            menuKey: 'sort_split'
          },
          {
            text: '冻结列',
            menuKey: 'frozen_col',
            icon: {
              svg: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <path d="M3 2.5C2.17157 2.5 1.5 3.17157 1.5 4V12C1.5 12.8284 2.17157 13.5 3 13.5H13C13.8284 13.5 14.5 12.8284 14.5 12V4C14.5 3.17157 13.8284 2.5 13 2.5H3Z" stroke="#1B1F23" stroke-linecap="round" stroke-linejoin="round"/>\n    <path d="M7 3V13" stroke="#1B1F23" stroke-linecap="round" stroke-linejoin="round"/>\n    <path d="M2 6L7 3" stroke="#1B1F23" stroke-width="0.7" stroke-linecap="square"/>\n    <path d="M2 9L7 6" stroke="#1B1F23" stroke-width="0.7" stroke-linecap="square"/>\n    <path d="M2 12L7 9" stroke="#1B1F23" stroke-width="0.7" stroke-linecap="square"/>\n    <path d="M5 13L7 12" stroke="#1B1F23" stroke-width="0.7" stroke-linecap="square"/>\n  </svg>'
            }
          }
        ],
        referencePosition: {
          rect: {
            left,
            top,
            width,
            height,
            right,
            bottom
          }
        }
      });
    }
  });

  //设置表格数据
  instance.setRecords(personsDataSource, {
    field: 'id',
    order: 'desc'
  });
  // instance.setRecords(personsDataSource);

  bindDebugTool(instance.scenegraph.stage as any, {
    customGrapicKeys: ['role', '_updateTag']
  });

  // 只为了方便控制太调试用，不要拷贝
  window.tableInstance = instance;
}
