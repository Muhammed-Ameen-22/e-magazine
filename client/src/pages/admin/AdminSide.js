import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const AdminSide = [
  // {
  //   title: 'Home',
  //   path: '/',
  //   icon: <AiIcons.AiFillHome />,
  //   cName: 'nav-text'
  // },
  {
    title: 'Users',
    path: '/Users',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Posts',
    path: '/Postview',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Contest',
    path: '/Contest',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  }
  // },
  // {
  //   title: 'Messages',
  //   path: '/messages',
  //   icon: <FaIcons.FaEnvelopeOpenText />,
  //   cName: 'nav-text'
  // },
  // {
  //   title: 'Support',
  //   path: '/support',
  //   icon: <IoIcons.IoMdHelpCircle />,
  //   cName: 'nav-text'
  // }
];