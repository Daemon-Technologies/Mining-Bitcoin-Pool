  import React from 'react';
import NoticeList from './NoticeList';


const NoticeIcon: React.FC<{}> & {
  Tab: typeof NoticeList;
} = (props) => {
  return (
    <></>
  );
};

NoticeIcon.defaultProps = {
  emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
};

NoticeIcon.Tab = NoticeList;

export default NoticeIcon;
